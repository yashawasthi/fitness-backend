const mongoose =require("mongoose");
const entrySchema=new mongoose.Schema(
    {
        data:{
            type:Date,
            required:true
        },
        weight:{
            type:Number,
            required:true
        }
    }
);

const entry=mongoose.model("Entry",entrySchema);

module.exports = entry;