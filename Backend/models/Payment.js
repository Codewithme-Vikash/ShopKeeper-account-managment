const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    customer : { type : mongoose.Schema.Types.ObjectId , ref : "Customer"  ,  required : true },

    amount : { type  : Number },

    note : { type : String },

},{
    timestamps : true,
});


module.exports = mongoose.model("Payment" , paymentSchema  );