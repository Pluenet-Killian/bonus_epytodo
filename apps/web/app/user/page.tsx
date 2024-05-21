import React from 'react'

export default async function user() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlUyamVhbiIsIm5hbWUiOiJKZWFuIiwiaWQiOjEsImlhdCI6MTcxNjI5NDYyNH0.jfFawN10zN8Gxwjjed-t1KoxnH7UvGMhwaIA-MczXf4';
  const { id, email, firstname, name, created_at } = await fetch('http://localhost:3002/user/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">User Page</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Email</h2>
            <p className="text-gray-600 ml-5">{email}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">First Name</h2>
            <p className="text-gray-600 ml-5">{firstname}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Name</h2>
            <p className="text-gray-600 ml-5">{name}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Created At</h2>
            <p className="text-gray-600 ml-5">{created_at}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">ID</h2>
            <p className="text-gray-600 ml-5">{id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
