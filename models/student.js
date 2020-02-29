const mongoose = require('mongoose');
const Joi = require('joi');

const classe_schema = new mongoose.Schema({
    name : {type :String, required : true},
    max_number: Number
});
const student_schema = new mongoose.Schema({
    name : {type :String, required : true},
    age: Number,
    date_inscription : { type:Date , default: Date.now()},
    class: classe_schema
});

const Student = mongoose.model('Student', student_schema);

// student validator
const student_body_validator = {
    name : Joi.string().min(3).max(20).required(),
    age: Joi.number().positive(),
    class : {
        name : Joi.string().min(3).max(10).required(),
        max_number :  Joi.number().positive()
    }
}

module.exports.Student = Student;
module.exports.student_body_validator = student_body_validator;