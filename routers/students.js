const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Student, student_body_validator } = require('../models/student')
//get All student
router.get('',async (req,res)=>{
    var students = await Student.find(); // select * from Student
    res.send(students);
});

//post new student
router.post('',async (req,res)=>{
    var res_validation = Joi.validate(req.body,student_body_validator);
    if(res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].message);
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