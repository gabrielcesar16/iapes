const userService = require("../services/userService")

exports.login = async (req, res) => {
    try{
        const result = await userService.login(req.body)
        res.json(result)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}
