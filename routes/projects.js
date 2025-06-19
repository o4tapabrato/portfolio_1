const express = require('express');
const {getUser} = require("../service/auth");
const {restrictToLoggedinUserOnly} = require("../middleware/auth")


let prev = "mongodb://localhost:27017/projectsData"
const mongoose = require('mongoose');
const Project = require("../models/projectsSc");
mongoose.connect("mongodb://localhost:27017/projectsData");
// mongoose.createConnection("mongodb+srv://o4tapabrato:123@cluster0.evgjabh.mongodb.net/test");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));


async function isUserLoggedIn(req) {
    const userUid = req.cookies?.uid;
    if (!userUid) return false;

    const user = await getUser(userUid);
    return !!user;
}

const getrandom = (arr)=>{
    let r = Math.floor(Math.random()*(arr.length -1));
    return arr[r];
}

router.get('/', (req,res) => {
    res.render("projects.ejs", {home: "/", aboutme: "/about", dashboard: "/dashboard", projects: "/projects", contacts: "/contacts", socials: "/socials"});
})

router.get('/retrieve', async(req,res) => {
    let val = await isUserLoggedIn(req);
    let arr = await Project.find().sort({ priority: 1 }).allowDiskUse(true);
    console.log("Data fetched successfully");
    console.log(val);
    res.json({data: arr, state: val});
    
})


router.get('/generate_dummy', async(req,res) => {
    await Project.deleteMany({});
    let nameArr = ['Exotic Summer', 'Alien penis', 'Zombie brain', 'Black Day', 'D-Day'];
    let imgArr = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTamRZSG_wcYeODX2knyTohmST0GtunAltMRg&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxiK9SVbvwUREojJvg4F9OEkkzz5bR0NawA&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NMc1hhZvu7mCSoFi3VRG4GrDyuPZ_oU51w&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmMQo-iLRBRe8wc6gH_YxblE0uIxfYQRj_0Q&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRit9CY713brhD__roLSisq7H8s4zgZSY3bLQ&s","https://64.media.tumblr.com/19dc4d3d2c74ee990303a8be67d529fb/643724f620cce70a-09/s640x960/cf4c227f6797de7c63767036e2e21baaae28d945.png"];
    let priorityArr = [1,2,3,4,5,6];
    let descp = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptates error dolor libero iste sed. Fugit dolorem alias cupiditate quos harum. Earum modi fugit quam ipsa dicta nisi";

    for(let i = 0; i<8; i++){
        // await Project.deleteMany({});
        let r = await Project.create({
            image: getrandom(imgArr),
            priority: getrandom(priorityArr),
            name: getrandom(nameArr),
            desc: descp
        })
    }
res.send("Done");
})

router.get('/getState', (req, res) => {
    let val = isUserLoggedIn(req);
    return res.json(val);
})

router.get("/delete/:slug",restrictToLoggedinUserOnly, async (req, res) => {
   let projectName = req.params.slug;
   try{
            await Project.deleteOne({name: projectName});
            console.log("deleted successfully");
        }
        catch(err){
            console.log("Error deleting Project");
        }
});

router.get("/edit/:slug", async (req, res) => {
    let projectName = req.params.slug;
    let prev = await Project.findOne({name: projectName});
    if (!prev) {
        return res.status(404).send(`⚠️ Project "${projectName}" not found`);
      }
    res.render('editProj',{pname: `${projectName}`, pimg: prev.image, pdesc: prev.desc, pprio: prev.priority});
})

router.post("/editf", async (req,res) => {
    const {oldName, projectName, image, desc, prio} = req.body;
    console.log(`Received data: ${oldName}, ${projectName}, ${image}, ${desc}, ${prio}`);

    const result = await Project.updateOne({name: oldName}, {$set: {name: projectName, image: image, desc: desc, priority: prio}})
    if(result.modifiedCount === 0)
        console.log("Error");
    res.redirect("/projects");
})

router.get("/add", restrictToLoggedinUserOnly, async(req, res)=>{
    res.render("addproject");
})

router.post("/addf", restrictToLoggedinUserOnly, async(req, res)=>{
    const {name, image, desc, priority} = req.body;
    console.log(`Received data: ${name}, ${image}, ${desc}, ${priority}`);
    let r = await Project.create({
        image: image,
        priority: priority,
        name: name,
        desc: desc
    });
    console.log("Successfully added");
    res.redirect("/projects");
})

module.exports = router;