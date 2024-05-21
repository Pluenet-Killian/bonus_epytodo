const getUsersTask = 'SELECT * FROM todo where user_id = (?)'
const getUserById = 'SELECT * FROM user where id = (?)'
const getUserByIdOrEmail = 'SELECT * FROM user where id = (?) OR email = (?)'
const updateUserData = 'UPDATE user SET email = (?), password = (?), name = (?), firstname = (?) WHERE id = (?)'
const updateTodoData = 'UPDATE todo SET title = (?), description = (?), user_id = (?), due_time = (?), status = (?) WHERE id = (?)'
const deleteTodo = 'DELETE FROM todo where user_id = (?)'
const deleteUser = 'DELETE FROM user where id = (?)'

module.exports  = {
    getUsersTask,
    getUserByIdOrEmail,
    getUserById,
    updateUserData,
    updateTodoData,
    deleteTodo,
    deleteUser
}
