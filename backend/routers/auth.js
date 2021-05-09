const express = require("express")
const controller = require("../controllers/auth")
const router = express.Router()
const {protect, admin} = require("../middleware/auth")

router.get("/",protect, admin, controller.getAllUsers)
router.post("/login", controller.login )
router.post("/register", controller.register )
router.route("/profile")
    .get(protect, controller.getUserProfile)
    .put(protect, controller.updateUserProfile)
router
    .route("/:id")
    .delete(protect, admin, controller.removeUser)
    .put(protect, admin, controller.editUserProfile)
    .get(protect, admin, controller.getUserById)

module.exports = router