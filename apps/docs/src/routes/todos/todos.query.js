const getTodos = 'SELECT * FROM todo'
const getTodoById = 'SELECT * FROM todo where id = (?)'
const createTodo = 'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)'
const updateTodoData = 'UPDATE todo SET title = (?), description = (?), user_id = (?), due_time = (?), status = (?) WHERE id = (?)'
const deleteTodo = 'DELETE FROM todo where id = (?)'
const deleteUserId = 'DELETE FROM user where user_id = (?)'
module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    deleteTodo
}
