'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlUyamVhbiIsIm5hbWUiOiJKZWFuIiwiaWQiOjEsImlhdCI6MTcxNjI5NDYyNH0.jfFawN10zN8Gxwjjed-t1KoxnH7UvGMhwaIA-MczXf4';

    async function fetchData() {
        const response = await fetch('http://localhost:3002/user/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        });
        const data = await response.json();
        setTodos(data);
      }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
          {todos.length === 0 ? (
          <p className="text-center text-gray-600">No todos found</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="p-2 border rounded-lg">
                <h2 className="text-lg font-medium text-gray-700">{todo.title}</h2>
                <p className="text-gray-600">{todo.description}</p>
              </li>
            ))}
          </ul>
        )}
        <button className="w-full bg-blue-500 mt-5 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={() => router.push('/todos')}>
          Add a todo
        </button>
      </div>
    </div>
  );
}
