const mongoose=require("mongoose")
const products=require("../models/portfolio")


let getProducts=async(req,res)=>{
    try {
        const articles=await products.find();
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }
}

let getProduct=async(req,res)=>{
    try {
        const id=req.params.id;
        const article=await products.findOne({_id:id});
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).send({message:"Invalid Product ID"})
        }
        if(article==null)
        {
           return res.status(404).send({message:"No product against this id"})
        }

        res.status(200).send(article);
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }
}

let deleteProduct=async(req,res)=>{
    try {
        const id=req.params.id;
        const article=await products.deleteOne({_id:id});
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).send({message:"Invalid Product ID"})
        }
        if(article.deletedCount==0)
        {
           return res.status(404).send({message:"No product against this id"})
        }

        res.status(200).send(article);
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }
}

let createProduct=async(req,res)=>{
    try {
    const article=new products(req.body);
    const {title}=article
    const productExist=await products.findOne({title:title});
    if(productExist!==null)
    {
        res.status(500).send({message:"Product Title Already Exists!"});
    }
    const response=await article.save();
        res.status(200).send({response,message:"Product Saved Succesfully"});
    } catch (error) {
        res.status(500).send({error:error.toString()});
    }
}

module.exports={getProduct,getProducts,createProduct,deleteProduct}