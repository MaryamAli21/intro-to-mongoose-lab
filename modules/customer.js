
// --------schema & model------------
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});
