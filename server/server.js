import express from "express";
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from "body-parser";

const app = express();
app.use(express.static("../public/index.html",{credentials: 'omit'}))
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

const Product = mongoose.model("product", 
{  
       productid: Number,
       category: String,
       price: Number,
       name: String,
       instock: Boolean     
}
    );
// var products = new Product({productid: 4, category: 'Music', price: 459, name: 'Clarinet', instock:true});
// products.save((err)=>{
//     if(err)
//         console.log("Saving failed", err)
// })
const urlDb = "mongodb+srv://user1:yXeCWvWM4APgoHI4@assignment13-product.a2mkjdm.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(urlDb,{ useNewUrlParser: true,  useUnifiedTopology: true } , (err)=>{
    console.log("Connecting to mongoDB database", err);
})


// Sending the saved documents in the mongoose 
app.get('/product/get/', (req, res) => {
    Product.find(
        {}, function(err, products) {
        var productHolder = {};

        products.forEach((product)=>{
            productHolder[product._id] = product;
        });

    res.send(productHolder);  
  });
});

app.post('/product/create', async (req, res) => {
    try {
            var product = new Product(req.body);
            var savedProduct = await product.save();
            res.sendStatus(200);

    } catch (error) {
        console.log(error);
    }   
});

app.put('/product/update/:id', async (req, res) => {
    try {
            console.log(req.body);
            var updatedProduct = await Product.findOneAndUpdate(
                {_id: mongoose.mongo.ObjectId(req.params.id)},
                {$set: req.body},
                { useFindAndModify: false}
                );
            res.sendStatus(200);

    } catch (error) {
        console.log(error);
    }   
});

app.delete('/product/delete/:id', async (req, res) => {
    try {
            var deletedProduct = await Product.findOneAndDelete(
                {productid: req.params.id }
                );
            res.sendStatus(200);

    } catch (error) {
        console.log(error);
    }   
});

var Port = 5000;
app.listen(Port, (err="") => console.log(`Server Running on Port: http://localhost:${Port}`, err))


