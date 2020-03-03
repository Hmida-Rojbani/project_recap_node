const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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

// Id validator

const id_validator = {
    id : Joi.objectId().required()
}

module.exports.Student = Student;
module.exports.student_body_validator = student_body_validator;
module.exports.id_validator = id_validator;