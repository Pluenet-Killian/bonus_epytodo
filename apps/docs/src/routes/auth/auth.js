const express = require('express')
const router = express.Router()
const pool = require('../../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

router.post('/register', async (req, res) => {
    const name = req?.body?.name;
    const firstname = req?.body?.firstname;
    const email = req?.body?.email;
    const password = req?.body?.password;
    if (!name) {
        return res.status(400).send({msg: "Bad parameter"})
    }
    if (!firstname) {
        return res.status(400).send({msg: "Bad parameter"})
    }
    if (!email) {
        return res.status(400).send({msg: "Bad parameter"})
    }
    if (!password) {
        return res.status(400).send({msg: "Bad parameter"})
    }
    const sqlGetUser = 'SELECT * from user where email = ?'
    const [user] = await pool.query(sqlGetUser, [email])
    if (user.length > 0) return res.status(409).send({msg: "Account already exists"})
    const sql = 'INSERT INTO user (name, firstname, email, password) VALUES (?, ?, ?, ?)'
    const hash_password = await bcrypt.hash(password, 10)
    await pool.query(sql, [name, firstname, email, hash_password])
    const [newUser] = await pool.query(sqlGetUser, [email])
    if (newUser.length === 0) return res.status(500).send({msg: "Internal server error"})
    const token = await jwt.sign({email: email, firstName: firstname, name: name, id: newUser.id}, secret)
    if (!token) {
        return res.status(401).send({msg: 'No token, authorization denied'});
    }
    res.status(201).send({token: token})
})

router.post('/login', async(req, res) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    if (!email) {
        return res.status(400).send({msg: "Bad parameter"})
    }
    if (!password) {
        return res.status(400).send({msg: "Bad parameter"})
    }
    const sql = 'SELECT * from user where email = ?'
    const [user] = await pool.query(sql, [email])
    if (user.length === 0) return res.status(401).send({msg: "Invalid Credentials"})
    const payloadUser = user[0]
    const token = await jwt.sign({email: payloadUser.email, firstName: payloadUser.firstName, name: payloadUser.name, id: payloadUser.id}, secret)
    if (!user)
        return res.status(401).send({msg: "Invalid Credentials"})
    const userPassword = user[0].password
    const passwordEntered = await bcrypt.compare(password, userPassword)
    if (!passwordEntered)
        return res.status(401).send({msg: "Invalid Credentials"})
    res.status(200).send({token: token})
})


module.exports = router
