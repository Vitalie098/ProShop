const express = require("express")
const productsRouter = require("./routers/products")
const authRouter = require("./routers/auth")
const orderRouter = require("./routers/orders")
const dotenv = require("dotenv")
const uploadRouter = require("./routers/upload");
const mongoose = require("mongoose")
const path = require("path")
const {notFound, errorHandler} = require("./middleware/errorMidleware");
const app = express()

dotenv.config()

mongoose.connect(process.env.MONGOOSE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(express.json())
app.use("/api/product", productsRouter)
app.use("/api/user", authRouter )
app.use("/api/orders", orderRouter )
app.use('/api/upload', uploadRouter)
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const folder = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use('/uploads', express.static(path.join(folder, '/uploads')))
app.use(notFound)
app.use(errorHandler)

module.exports = app



