const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    profileImg: String,
    name: String,
    desc: String,
    flashWords: String
});
const Home = mongoose.model('Home', homeSchema);
module.exports = Home;