const mongoose = require('mongoose');

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

module.exports.Student = Student;