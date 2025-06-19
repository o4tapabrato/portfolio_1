const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    image: String,
    priority: Number,
    name: String,
    desc: String
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;