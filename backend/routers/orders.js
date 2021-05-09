const express = require("express")
const router = express.Router()
const controller = require("../controllers/orders")
const {protect, admin} = require("../middleware/auth")

router
    .route("/")
    .post( protect, controller.createOrder )
    .get( protect, admin, controller.getAllOrders)
router.route("/myorders").get( protect, controller.getMyOrders )
router.route("/:id").get( protect, controller.getOrderByid )
router.route("/:id/pay").put( protect, controller.updateOrderToPaid )
router.route("/:id/deliver").put( protect, admin, controller.updateOrderToDelivered )

module.exports = router