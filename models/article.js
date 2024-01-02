const mongoose=require("mongoose")

const ArticlesSchema=new mongoose.Schema({
    title: {
        type: String,
        required:[true,'Title Is Required! '],
        min:[6,'Prdouct Title is too Short! ']
    },
    url:String,
    data:String,
})
const products=mongoose.model("Articles",ArticlesSchema)
module.exports=products