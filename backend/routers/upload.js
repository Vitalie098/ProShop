const express = require("express")
const multer = require("multer")
const moment = require("moment")
const {protect, admin} = require("../middleware/auth");
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({storage,fileFilter})

router.post("/", protect, admin, upload.single("image"), (req, res) => {
   // res.send(`/${req.file.path}`)
    res.send(`/${req.file.path.replace('\\', '/')}`);
})



module.exports = router

