const express=require("express")
const {getProduct,getProducts,createProduct,deleteProduct}=require("../controllers/portfolio")
const router=express.Router()

router.get("/",getProducts);

router.get("/:id",getProduct)

router.delete("/:id",deleteProduct)

router.post("/",createProduct)

module.exports=router;
