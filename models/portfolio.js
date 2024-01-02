const mongoose=require("mongoose")

const PortfoliosSchema=new mongoose.Schema({
    title: {
        type: String,
        required:[true,'Title Is Required! '],
        min:[6,'Prdouct Title is too Short! ']
    },
    url:String,
    data:String,
})
const products=mongoose.model("Portfolios",PortfoliosSchema)
module.exports=products