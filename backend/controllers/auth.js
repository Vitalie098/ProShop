const User = require("../models/users")
const generateToken = require("../utils/generateTokens")

module.exports.login = async function (req, res) {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json({message: 'Invalid email or password' })
    }
}

module.exports.register = async function(req, res) {

    const {name, email, password} = req.body
    const candidate = await User.findOne({email})

    if(candidate) {
        res.status(400).json({message: "User already exists"})
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400).json({message: "Invalid user data" })
    }
}


module.exports.getUserProfile = async function (req, res) {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(404).json({message: "User not found" })
    }
}

module.exports.updateUserProfile = async function(req, res) {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(user._id)

        })
    } else {
        res.status(404).json({message: "User not found" })
    }

}

module.exports.getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

module.exports.removeUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await User.remove(user)
        res.json({message: "User removed"})
    }else {
        res.status(404).json({message: "User not found"})
    }
}

module.exports.editUserProfile = async function(req, res) {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    } else {
        res.status(404).json({message: "User not found"})
    }

}

module.exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: 'User not found'})
    }
}