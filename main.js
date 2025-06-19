const express = require('express');
require('dotenv').config();
const port = 3000;
const router = express.Router();
const about = require("./routes/about");
const projects = require("./routes/projects");
const dashboard = require("./routes/dashboard");
const contacts = require("./routes/contacts");
const socials = require("./routes/socials");
// const login = require("./routes/login");
const user = require("./routes/user");
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly} = require("./middleware/auth");

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI);
mongoose.connect("mongodb://localhost:27017/projectsData");
const Homedat = require("./models/homeSc");
const {getUser} = require("./service/auth");

const { name } = require('ejs');

const app = express();



app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(cookieParser());
app.use("/about", about);
app.use("/projects", projects);
app.use("/dashboard",restrictToLoggedinUserOnly, dashboard);
app.use("/contacts", contacts);
app.use("/socials", socials);
app.use("/user", user);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/login", login);

app.get('/', async (req, res) => {
    const val = await Homedat.findOne();
    res.render("index", {home: "/", aboutme: "/about", dashboard: "/dashboard", projects: "/projects", contacts: "/contacts", socials: "/socials", login: "/login",
        //data
        pimg: val.profileImg,
        desc: val.desc,
        name: val.name,
    });
})

app.get("/signup", (req,res) => {
    res.render("signup");
})

app.get('/login', (req, res) => {
    res.render("login")
})

async function isUserLoggedIn(req) {
    const userUid = req.cookies?.uid;
    if (!userUid) return false;

    const user = await getUser(userUid);
    return !!user;
}

app.get('/getSkills', async(req,res) => {
    let text = await Homedat.findOne();
    let val = await(String(text.flashWords)).split(",");
    res.json(val);
})

app.get('/getState', async(req, res) => {
    let val = await isUserLoggedIn(req);
    return res.json(val);
})

app.get("/generate_def", async (req, res) => {
    let r = await Homedat.create({
        profileImg: "av.jpeg",
        name: "Tapabrato Maity",
        desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum in nisi porro. Ad commodi optio
                    accusantium consequuntur numquam eum, totam voluptatibus quam cum. Fugit accusantium ipsa eius
                    reprehenderit. Veniam, repellendus! Laboriosam assumenda fuga laudantium quibusdam similique aut
                    harum! Iure repellendus reprehenderit perferendis illum commodi accusantium optio saepe iusto, quia
                    voluptatum, ad omnis cumque quasi quo consectetur hic necessitatibus id nulla laudantium veniam rem.
                    Perferendis est necessitatibus minima sunt magnam, harum ex itaque reprehenderit asperiores. Nihil
                    impedit minus dolores? Eveniet exercitationem reprehenderit corrupti earum fugiat quasi tempora?
                    Assumenda dolorum possimus illum quaerat veniam consequatur aspernatur ut omnis quibusdam a, id
                    beatae.`,
        flashWords: "HELLO WORLD, CODING, WEB DEVELOPMENT, DBMS, DESIGNING, _ _ _ _ _ _ _, C/C++, PYTHON, JAVASCRIPT, KOTLIN"
        })
        console.log(r);
    return res.redirect("/");
})

app.get("/edit", restrictToLoggedinUserOnly,async (req, res) =>{
    let prev = await Homedat.findOne();
    res.render("editHome", {pname: prev.name, pimg: prev.profileImg, pdesc: prev.desc, pfwords: prev.flashWords});
})

app.post("/editf", restrictToLoggedinUserOnly, async (req, res) => {
    const { profileName, image, desc, flashWords } = req.body;
    const result = await Homedat.updateOne({}, {$set: {name: profileName, image: image, desc: desc, flashWords: flashWords}});
        if(result.modifiedCount === 0)
            console.log("Error");
        res.redirect("/");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});