const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello node api");
});
app.get("/blog", (req, res) => {
    res.send("hello blog");
});

app.post("/product", async (req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        // alert(error.message);
        res.status(500).json(error.message);
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error.message);

    };
});

app.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);


        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message);

    };
});

app.put("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: 'cannot find any product with this id' })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message);

    };
});
app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'cannot find any product with this id' })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message);

    };
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
    console.log("listening to port 3000");
});

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://sajajalil:saja12345@cluster0.lklb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("connected to mango db");
    }).catch((error) => {
        console.log(error);
    });




