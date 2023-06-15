const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require("./routes/products");
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

const URI = 'mongodb+srv://admin:admin@products.tm9hsep.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(URI)
  .then(() => console.log('DB Connected!'));


app.use(fileUpload({
  useTempFiles:true
}))
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(productRoutes);

app.listen('3000', ()=>{
    console.log("server is up and running");
})