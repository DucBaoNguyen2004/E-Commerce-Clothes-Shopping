const port = 4000
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { type } = require('os');
const { log, error } = require('console');
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://ducbaodb:ducbao2004@cluster0.6c9c544.mongodb.net/e-commerce")

app.get('/', (req, res) => {
    res.send("Express is running");
})

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })
app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({})
    let id
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1
    }
    else {
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    console.log(product)
    await product.save()
    console.log("Saved")
    res.json({
        success: true,
        name: req.body.name
    })
})

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})

app.get("/getallproducts", async (req, res) => {
    let products = await Product.find({})
    console.log("All Products Fetched")
    res.send(products)
})

const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', {
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, erros: "Existing Account Found With Same Email Address" })
    }
    let cart = {}
    for (let index = 0; index < 300; index++) {
        cart[index] = 0
    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save()
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom')
    res.json({ success: true, token })
})

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom")
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, erros: "Wrong Password" })
        }
    }
    else {
        res.json({ success: false, erros: "Wrong EmailID" })
    }
})

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("NewCollection Fetched")
    res.send(newcollection)
})

app.get('/popular', async (req, res) => {
    let products = await Product.find({ category: "women" })
    let popular_inwomen = products.slice(0, 4)
    console.log("Popular In Women Fetched")
    res.send(popular_inwomen)
})

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ erros: 'Please authenticate using valid token ' })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({ erros: 'Please authenticate using valid token' })
        }
    }
}

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    let UserData = await Users.findOne({ _id: req.user.id })
    UserData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: UserData.cartData })
    console.log("Added");
})

app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let UserData = await Users.findOne({ _id: req.user.id })
    if (UserData.cartData[req.body.itemId])
        UserData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: UserData.cartData })
    console.log("Removed");
})

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData)

})

app.post('/placeorder', fetchUser, async (req, res) => {
    try {
        const { products, amount, address } = req.body;
        const order = new Order({
            userId: req.user.id,
            products: products,
            amount: amount,
            address: address,
        });
        await order.save();

        // Return orderId so frontend can display it in the transfer content (e.g., "DH" + order.id)
        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, error: "Failed to place order" });
    }
});

// SePay Webhook
app.post('/api/sepay/webhook', async (req, res) => {
    try {
        // Verify SePay API Key (Optional but recommended)
        // const sepayApiKey = req.header('Authorization');
        // if (sepayApiKey !== 'YOUR_SEPAY_API_KEY') {
        //     return res.status(401).json({ success: false, error: "Unauthorized" });
        // }

        const data = req.body;

        // SePay sends transaction details. We need to parse 'content' to find the order ID.
        // Assuming the transfer content contains the order ID, e.g., "DH656a..."
        // You might need to adjust this logic based on how you generate the transfer content on the frontend.

        const transactionContent = data.content; // e.g., "DH 656a..."

        // Simple regex to find the order ID (assuming it's the 24-char Mongo ID or a custom ID)
        // For this example, let's assume the content *contains* the order ID.

        // In a real app, you might use a shorter numeric ID or a specific prefix.
        // Let's try to find the order by matching the amount and maybe a custom code if used.

        // Strategy: Look for an Order with 'Pending' status and matching amount. 
        // Ideally, put the Order ID in the transfer content.

        // Let's assume the user puts the Order ID in the transfer content.
        // We will search for an order where the ID is present in the content.

        // NOTE: This is a simplified matching. 
        // For better accuracy, generate a unique short code for each order (e.g. #1234) and ask user to enter it.

        console.log("Received SePay Webhook:", data);

        // Example: Update order based on content
        // This part depends heavily on what the user types in the bank transfer description.
        // A better way is to generate a unique code like "SEPAY123" and save it in the order.

        res.json({ success: true });

    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ success: false });
    }
});

app.listen(port, (error) => {
    if (!error) console.log("Server is Successfully Running,and App is listening on port " + port)
    else console.log("Error occurred, server can't start", error);
})