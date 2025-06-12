//Paras Kumar - 23BCA019

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./Models/Student.js')

const app = express();
app.use(bodyParser.json());

//Connection with MongoDB
mongoose.connect('mongodb://localhost:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Connected to MongoDB")).catch(err => console.error(err));

//Displays on http://localhost:3000
app.get("/", (req, res) => {res.send("Server on Port 3000 is running")});

//Creation API
app.post("/students", async (req, res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (err){
        res.status(400).send(err);
    }
});

//Retrieve API
app.get("/students", async (req, res) => {
    try{
        const student = await Student.find();
        res.send(student);
    } catch (err){
        res.status(500).send(err);
    }
});

//Retrieve by ID API
app.get("/students/:id", async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).send("Document Not found");
        res.send(student);
    } catch (err){
        res.status(500).send(err);
    }
});

//Updation API
app.put("/students/:id", async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!student) return res.status(404).send("Document Not found");
        res.send(student);
    } catch (err){
        res.status(400).send(err);
    }
});

//Deletion API
app.delete("/students/:id", async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) return res.status(404).send("Document Not found");
        res.send({message: "Document Deleted"});
    } catch (err){
        res.status(500).send(err);
    }
});

//Initialization of Server
app.listen(3000, () => console.log('Server is running - Port 3000'));