'use client'

import React, { useState } from 'react';

export default function Page() {
  const [todos, setTodos] = useState({
    title: '',
    description: '',
    status: 'not started',
    user_id: '',
    due_time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodos({
      ...todos,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todos);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlUyamVhbiIsIm5hbWUiOiJKZWFuIiwiaWQiOjEsImlhdCI6MTcxNjI5NDYyNH0.jfFawN10zN8Gxwjjed-t1KoxnH7UvGMhwaIA-MczXf4';
    const response = await fetch('http://localhost:3002/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(todos)
    });
    const data = await response.json();
    console.log(data);
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" name="status" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}>
            <option value="not started">Not started</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">User ID</label>
          <input type="number" id="user" name="user_id" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input type="date" id="dueDate" name="due_time" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}/>
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Submit</button>
        </div>
      </form>
    </div>
  );
}
