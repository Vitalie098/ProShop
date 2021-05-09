const Order = require( "../models/orders")

module.exports.createOrder = async (req,res) => {
    try{

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body

        const order = new Order({
           user: req.user._id,
           orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createOrder = await order.save()

        res.status(201).json(createOrder)
    } catch (e) {
        console.log(e)
    }
}

module.exports.getOrderByid = async (req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404).json({message: "Order not found"})
    }
}

module.exports.updateOrderToPaid = async (req,res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404).json({message: "Order not found"})
    }
}

module.exports.getMyOrders = async (req,res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
}

module.exports.getAllOrders = async (req,res) => {
    const orders = await Order.find({}).populate("user", "id name")
    res.json(orders)
}

module.exports.updateOrderToDelivered = async (req,res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404).json({message: "Order not found" })
    }
}