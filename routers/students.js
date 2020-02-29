const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Student } = require('../models/student')
//get All student
router.get('',async (req,res)=>{
    var students = await Student.find(); // select * from Student
    res.send(students);
});
// student validator
const student_body_validator = {
    name : Joi.string().min(3).max(20).required(),
    age: Joi.number().positive(),
    class : {
        name : Joi.string().min(3).max(10).required(),
        max_number :  Joi.number().positive()
    }
}
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