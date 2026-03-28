const userService = require("../services/userService")
const bcrypt = require("bcrypt")

exports.login = async (req, res) => {
    try{
        const data = await userService.login(req.body)
        res.json(data)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

exports.register = async (req, res) => {
    try{
        const data = await userService.register(req.body)
        res.status(201).json(data)
    } catch (err) {
        console.error("REGISTER ERROR:",err)
        res.status(400).json({
            error: err.message
        })
    }
    console.log("HEADERS", req.headers)
    console.log("BODY:", req.body)
}

exports.getProfile = async (req, res) => {
    try{
        const user = await userService.getProfile(req.userId)
        res.json(user)
    } catch (err){
        res.status(404).json({
            error: err.message
        })
    }
}