const express = require('express')
const router = express.Router()
const pool = require('../../config/db')
const todoQuery = require('./todos.query')
const userQuery = require("../user/user.query");

router.get('/todos',  async (req, res) => {
    const user = req.user;
    const sql = todoQuery.getTodos;
    try {
        const [todos] = await pool.query(sql);
        res.send(todos);
    } catch (err) {
        res.status(500).send('Internal server error')
    }
})

router.post('/todos', async (req, res) => {
    const userToken = req.user;
    const {title, description, due_time, user_id, status} = req.body;
    if (!title || !description || !due_time || !user_id || !status || (status !== "todo" && status !== "done" && status !== "in progress" && status !== "not started")) {
        res.status(400).send({msg: "Bad parameter"})
        return;
    }
    try {
        const getUserSql = userQuery.getUserById
        const [user] = await pool.query(getUserSql, [user_id])
        if (user.length === 0) return res.status(404).send({msg: "Not found"})
        const [result] = await pool.query(todoQuery.createTodo, [title, description, due_time, user[0].id, status]);
        const getTodoById = todoQuery.getTodoById
        const [getNewTodo] = await pool.query(getTodoById, [result.insertId])
        res.status(201).send(getNewTodo[0])
    } catch (err) {
        res.status(500).send("Internal server error")
        console.error("Error : ", err);
    }
})

router.get('/todos/:id', async (req, res) => {
    const todoId = req.params.id
    const sql = todoQuery.getTodoById;
    try {
        const [todo] = await pool.query(sql, [todoId]);
        if (todo.length === 0) return res.status(404).send({msg: "Not found"})
        res.send(todo[0])
    } catch (err) {
        console.log("err", err)
        res.status(500).send('Internal server error')
    }
})

router.put('/todos/:id', async (req, res) => {
    const todoId = req.params.id
    const sql = todoQuery.getTodoById;
    const {title: titleB, description: descriptionB, due_time: due_timeB, user_id: user_idB, status: statusB} = req.body
    if (!titleB || !descriptionB || !due_timeB || !user_idB || !statusB || (statusB !== "todo" && statusB !== "done" && statusB !== "in progress" && statusB !== "not started")) {
        res.status(400).send({msg: "Bad parameter"})
        return;
    }
    try {
        const [todo] = await pool.query(sql, [todoId]);
        if (todo.length === 0) return res.status(404).send({msg: "Not found"})
        const {id} = todo[0]
        const updateSql = userQuery.updateTodoData;
        await pool.query(updateSql, [titleB, descriptionB, user_idB, due_timeB, statusB, id.toString()])
        res.send(req.body)
    } catch (err) {
        res.status(500).send('Internal server error')
    }
})

router.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id
    const getTodo = todoQuery.getTodoById
    try {
        const [todo] = await pool.query(getTodo, [todoId])
        if (todo.length === 0) return res.status(404).send({msg: "Not found"})
        const deleteTodoSql = todoQuery.deleteTodo;
        await pool.query(deleteTodoSql, [todoId])
        res.send({msg: `Successfully deleted record number: ${todoId}`});
    } catch (err) {
        res.status(500).send('Internal server error')
    }
})

module.exports = router

