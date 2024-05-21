const express = require('express')
const router = express.Router()
const pool = require('../../config/db')
const userQuery = require('./user.query')
const todoQuery = require("../todos/todos.query");
const bcrypt = require("bcryptjs");

router.get('/user',  async (req, res) => {
    const user = req.user;
    const sql = userQuery.getUserByIdOrEmail;
    try {
        const [users] = await pool.query(sql, [user.email, user.email]);
        res.send(users[0]);
    } catch (err) {
        res.status(500).send('Internal server error')
    }
})

router.get('/user/todos',  async (req, res) => {
    const user = req.user;
    if (!user) return res.status(404).send({msg: "Not found"})
    const sql1 = userQuery.getUserByIdOrEmail;
    const sql = userQuery.getUsersTask;
    try {
        const [users] = await pool.query(sql1, [user.id, user.id]);
        if (users.length === 0) return res.status(404).send({msg: "Not found"})
        const [tasks] = await pool.query(sql, [users[0].id]);
        res.send(tasks);
    } catch (err) {
        console.log("err", err)
        res.status(500).send('Internal server error')
    }
})

router.get('/users/:id',  async (req, res) => {
    const userIdOrEmail = req.params.id
    if (!userIdOrEmail) res.status(400).send({msg: "Bad parameter"})
    const sql = userQuery.getUserByIdOrEmail;
    try {
        const [users] = await pool.query(sql, [userIdOrEmail, userIdOrEmail]);
        if (users.length === 0) return res.status(404).send({msg: "Not found"})
        res.send(users[0]);
    } catch (err) {
        res.status(500).send('Internal server error')
    }
})

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id
    const sql = userQuery.getUserById;

    try {
        const {email: emailB, password: passwordB, name: nameB, firstname: firstnameB} = req.body
        if (!emailB || !passwordB || !nameB || !firstnameB) return res.status(400).send({msg: "Bad parameter"})
        const userData = {email: undefined, password: undefined, name: undefined, firstName: undefined};
        const [user] = await pool.query(sql, [userId]);
        if (user.length === 0)
            return res.status(404).send({msg: "Not found"})
        const {id, email, password, name, firstname} = user[0]
        if (emailB === undefined)
            userData.email = email
        else
            userData.email = emailB
        if (passwordB === undefined)
            userData.password = password
        else {
            const hash_password = await bcrypt.hash(passwordB, 10)
            userData.password = hash_password
        }
        if (nameB === undefined)
            userData.name = name
        else
            userData.name = nameB
        if (firstnameB === undefined)
            userData.firstName = firstname
        else
            userData.firstName = firstnameB
        const updateSql = userQuery.updateUserData
        await pool.query(updateSql, [userData.email, userData.password, userData.name, userData.firstName, id])
        const [userUp] = await pool.query(sql, [userId]);
        res.send(userUp[0]);
    } catch (err) {
        res.status(500).send('Internal server error')
        console.error('Database error: ', err);
    }
})

router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
    const getUser = userQuery.getUserById
    try {
        const [user] = await pool.query(getUser, [userId])
        if (user.length === 0) return res.status(404).send({msg: "Not found"})
        const deleteTodoSql = userQuery.deleteTodo;
        await pool.query(deleteTodoSql, [userId])
        const deleteUserSql = userQuery.deleteUser;
        await pool.query(deleteUserSql, [userId])
        res.send({msg: `Successfully deleted record number: ${userId}`});
    } catch (err) {
        console.log("err", err)
        res.status(500).send('Internal server error')
    }
})


module.exports = router
