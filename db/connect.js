const mongoose = require('mongoose');
const dbConnect = require('debug')('app:db')

module.exports = async function connectDB(path){
    try{
        await mongoose.connect(path, { useNewUrlParser: true, useUnifiedTopology: true });
        dbConnect('MongoDB is UP.')
    }catch(err) {
        dbConnect('MongoDB is Down. Error :',err.message);
    }
}


