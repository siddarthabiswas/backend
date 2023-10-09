// const express = require('express')
// var cors = require('cors')
// var bodyParser = require('body-parser')
// const app = express()
// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// const mongoose = require('mongoose');

// const schema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
// });




// const dbCunnect = async () => {
//     await mongoose.connect('mongodb+srv://juilary:zOUbn7gxDjr2qaIV@cluster0.vdfwpbk.mongodb.net/juilaris?retryWrites=true&w=majority');
//     console.log('db cunnect')
// }

// const productmodel = mongoose.model('products', schema);





// app.get('/', (req, res) => {
//     const allCard = productmodel.find()
//     console.log(allCard)
//     res.send()
// })





// app.listen((7000), async () => {
//     await dbCunnect();
//     console.log('Local host run 7000')
// })




const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// Start
const mongoose = require('mongoose');

// Db cunnect
const dbcunnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://juilary:zOUbn7gxDjr2qaIV@cluster0.vdfwpbk.mongodb.net/juilaris?retryWrites=true&w=majority`);
        console.log('Db is connect')
    } catch (error) {
        console.log(error.message)
    }
}
// user Schema
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discountPercentage: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    date: { type: Date, default: Date.now },
});

const saveproduct = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discountPercentage: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    date: { type: Date, default: Date.now },
});

// user model
const userModel = mongoose.model('products', userSchema);

const saveProduct = mongoose.model('buyproduct', saveproduct);

// data set

app.post('/postData', async (req, res) => {
    const userDetles = req.body;
    try {
        const newUser = new userModel({
            title: userDetles.title,
            description: userDetles.description,
            price: userDetles.price,
            discountPercentage: userDetles.discountPercentage,
            rating: userDetles.rating,
            stock: userDetles.stock,
            brand: userDetles.brand,
            category: userDetles.category,
            thumbnail: userDetles.thumbnail,
        })
        const save = await newUser.save();
        if (save) {
            res.status(200).send(save)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
});

// buy product

app.post('/buyproduct', async (req, res) => {
    const userDetles = req.body;
    try {
        const newUser = new saveProduct({
            title: userDetles.title,
            description: userDetles.description,
            price: userDetles.price,
            discountPercentage: userDetles.discountPercentage,
            rating: userDetles.rating,
            stock: userDetles.stock,
            brand: userDetles.brand,
            category: userDetles.category,
            thumbnail: userDetles.thumbnail,
        })
        const save = await newUser.save();
        if (save) {
            res.status(200).send(save)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
});

// Data gate
app.get('/', async (req, res) => {
    try {
        const allUser = await userModel.find({});
        if (allUser) {
            res.status(200).send(allUser)
        } else {
            res.status(404).send("Data not found")
        }
    } catch (error) {
        res.status(502).send(error.message)
    }
})

// get all buy data

app.get('/buyproduct', async (req, res) => {
    try {
        const allUser = await saveProduct.find({});
        if (allUser) {
            res.status(200).send(allUser)
        } else {
            res.status(404).send("Data not found")
        }
    } catch (error) {
        res.status(502).send(error.message)
    }
})

// delet

app.delete('/delet/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete({ _id: id })
    } catch (error) {
        res.status(502).send(error.message)
    }
})

// find by id
app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const findsingleuser = await userModel.findOne({ _id: id })
        if (findsingleuser) {
            res.status(200).send(findsingleuser)
        } else {
            res.status(404).send("Single product not found")
        }
    } catch (error) {
        res.status(502).send(error.message);
    }
})



// upded
app.patch('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updetDeta = req.body;
        await userModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                seller_name: updetDeta.seller_name,
                seller_img: updetDeta.seller_img,
                seller_email: updetDeta.seller_email,
                seller_rating: updetDeta.seller_rating,
                toy_name: updetDeta.toy_name,
                toy_img: updetDeta.toy_img,
                toy_price: updetDeta.toy_price,
                available_quantity: updetDeta.available_quantity,
                toy_rating: updetDeta.toy_rating,
                toy_description: updetDeta.toy_description,
            }
        });
    } catch (error) {
        res.status(502).send(error.message);
    }
})








app.listen(8000, async () => {
    await dbcunnect();
    console.log(`https://localhost run 8000`)
})







