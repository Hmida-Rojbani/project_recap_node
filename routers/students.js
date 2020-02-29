const express = require('express');
const router = express.Router();
const { Student } = require('../models/student')
//get All student
router.get('',async (req,res)=>{
    var students = await Student.find(); // select * from Student
    res.send(students);
});

//post new student
router.post('',async (req,res)=>{
    var student = new Student({
        name: req.body.name,
        age: req.body.age,
        class : {
            name : req.body.class.name,
            max_number : req.body.class.max_number
        }
    });
    let savedStudent = await student.save();
    res.send(savedStudent);
});

module.exports = router;