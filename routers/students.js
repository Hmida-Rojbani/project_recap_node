const express = require('express');
const Joi = require('joi');
const _ =require('lodash');
const router = express.Router();
const {
    Student,
    student_body_validator,
    student_body_validator_update,
    id_validator
} = require('../models/student')
//get All students
router.get('', async (req, res) => {
    var students = await Student.find(); // select * from Student
    res.send(students);
});

//get All students sorted by age
router.get('/sorted/age', async (req, res) => {
    var students = await Student.find().sort('age'); // select * from Student
    res.send(students);
});

//get student by Id
router.get('/id/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].message);
    var student = await Student.findById(req.params.id); // select * from Student
    if (!student)
        return res.status(404).send('Student with this Id is missing');
    res.send(student);
});

//post new student
router.post('', async (req, res) => {
    var res_validation = Joi.validate(req.body, student_body_validator);
    if (res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].message);
    var student = new Student({
        name: req.body.name,
        age: req.body.age,
        class: {
            name: req.body.class.name,
                max_number: req.body.class.max_number
        }
    });
    let savedStudent = await student.save();
    res.send(savedStudent);
});

//update student by Id
router.put('/id/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].message);
    var res_validation = Joi.validate(req.body, student_body_validator_update);
    if (res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].message);
    var student = {
        name: req.body.name,
        age: req.body.age,
        class: {
            name: req.body.class.name,
            max_number: req.body.class.max_number
        }
    };

    var old_student = await Student.findById(req.params.id); // select * from Student
    student = _.merge(old_student,student);
    old_student = await Student.findByIdAndUpdate(req.params.id, student); // select * from Student
    if (!old_student)
        return res.status(404).send('Student with this Id is missing');
    res.send(old_student);
});


//delete student by Id
router.delete('/id/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].message);
    var student = await Student.findByIdAndRemove(req.params.id); // select * from Student
    if (!student)
        return res.status(404).send('Student with this Id is missing');
    res.send(student);
});

module.exports = router;