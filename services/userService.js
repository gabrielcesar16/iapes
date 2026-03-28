const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async ({ email, password}) => {

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    if (!result) {
        throw new Error("Usuário não encontrado")
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        throw new Error("Senha inválida")
    }
    
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_in }
    )

    return { token }
}