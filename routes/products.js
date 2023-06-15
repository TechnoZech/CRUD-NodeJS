const express = require('express');
const router = express.Router();
const productModel = require('../models/productsModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ //ok !important
    cloud_name: 'dev3u2cj1', 
    api_key: '365828834931251', 
    api_secret: '3LeJhDwLy7y6pddUFDiPEuWGk' 
});

router.get('/', (req, res)=>{
    res.send("server is ready!");
})

// <------- Display form ------->
router.get('/products/new', (req, res)=>{
    res.render('new.ejs');
})

// <------- Display all Products ------->
router.get('/products', async(req, res)=>{
    try{
         let productDetails = await productModel.find();
        res.render('products.ejs', {productDetails});
    }catch(err){
        console.log(err);
    }
})

// <------- Save form details to DB of Products ------->
router.post('/products', async(req, res)=>{
    const file = req.files.photo;
    try{
        await cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
            console.log(result);
            console.log("file uploaded");
            let productData = new productModel({
                productName : req.body.productName,
                quantity: req.body.quantity,
                sellerName: req.body.sellerName,
                price: req.body.price,
                photo: result.url,
            });

            productData.save();
        })
        console.log("Data saved to DB");
        res.redirect('/products');
    }catch(err){
        console.log(err);
    }
})

// <------- Edit form Display ------->
router.get('/product/edit/:id', async(req, res)=>{
    try{
        const product = await productModel.findById(req.params.id);
        res.render('edit.ejs', {product});
    }catch(err){
        console.log(err);
    }
})

// <------- Edit form Data Updated to DB ------->
router.patch('/product/:id', async(req, res)=>{
    try{
        const updatedData = {
            productName : req.body.productName,
            quantity: req.body.quantity,
            sellerName: req.body.sellerName,
            price: req.body.price,
        };

        await productModel.findByIdAndUpdate(req.params.id, updatedData);
        res.redirect('/products');
    }catch(err){
        console.log(err);
    }
})

// <------- Delete selected product ------->
router.get("/product/delete/:id", async(req, res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    }catch(err){
        console.log(err);
    }
})
module.exports = router;