const Products = require( "../models/products")

module.exports.getAll = async (req,res) => {
    try{
        const pageSize = 12
        const page = Number(req.query.pageNumber) || 1

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        } : {}

        const count = await Products.countDocuments({...keyword})
        const products = await Products.find({...keyword})
            .limit(pageSize)
            .skip(pageSize * (page - 1))

        res.json({products, page, pages: Math.ceil(count / pageSize)})
    } catch (e) {
        res.status(404).json({message: "Products not found"})
    }
}

module.exports.getById = async (req,res) => {
    try {
        const product = await Products.findById(req.params.id)
        res.json(product)
    }catch (e) {
        res.status(404).json({message: "Product not found"})
    }
}

module.exports.deleteProductById = async (req,res) => {
    try {
        const product = await Products.findById(req.params.id)

        if(product) {
            await Products.remove(product)
            res.json({message: "Product deleted"})

        } else {
            res.status(404).json({message: "Product not found"})
        }
    }catch (e) {
        res.status(500).json({message: e})
    }
}

module.exports.createProduct = async (req,res) => {

    const product = new Products({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)
}

module.exports.updateProduct = async (req,res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Products.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updateProduct = await product.save()
        res.json(updateProduct)
    } else {
        res.status(404).json({message: "Product not found"})
    }

}

module.exports.createReviews = async (req,res) => {
    const { rating, comment } = req.body

    const product = await Products.findById(req.params.id)

    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400).json({message: "Product already reviewed"})
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((total, item) => item.rating + total, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })

    } else {
        res.status(404).json({message: "Product not found" })
    }
}

module.exports.getTopProducts = async (req,res) => {
    const products = await Products.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
}