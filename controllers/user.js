const {v4: uuidv4} = require('uuid')
const User = require('../models/user');
const {setUser, getUser} = require("../service/auth")

async function handleUserSignup(req, res){
    console.log("This is signup");
    const {username, password} = req.body;
    console.log(username);
    console.log(password);
    await User.create({
        username: username,
        password: password
    })
    return res.redirect("/dashboard");
}

async function handleUserLogin(req, res) {
    const {username, password} = req.body;
    const user = await User.findOne({username, password});
    console.log(user);
    if(!user){
        console.log("Found not Data");
        return res.render("login",{error: "Invalid Username or password"});
        
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect("/dashboard");   
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}