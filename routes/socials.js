const express = require('express');
const router = express.Router();

// router.set("view engine", "ejs");

router.get('/', (req,res) => {
    res.render("socials.ejs", {home: "/", aboutme: "/about", dashboard: "/dashboard", projects: "/projects", contacts: "/contacts", socials: "/socials"});
})

module.exports = router;