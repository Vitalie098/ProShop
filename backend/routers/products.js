const express = require("express")
const router = express.Router()
const controller = require("../controllers/products")
const {admin} = require("../middleware/auth");
const {protect} = require("../middleware/auth");

router.route("/")
    .get(controller.getAll)
    .post(protect, admin, controller.createProduct)

router.get("/top", controller.getTopProducts)
router
    .route("/:id")
    .get(controller.getById)
    .delete(protect, admin, controller.deleteProductById)
    .put(protect, admin, controller.updateProduct)

router.post("/:id/reviews", protect, controller.createReviews)

module.exports = router