import React from 'react'
import {Link} from 'react-router-dom'
export default function CountCard({ title, count, path }) {
  return (
    <Link to={path} className='cursor-pointer'>
    <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <p className="text-3xl font-bold text-indigo-600">{count}</p>
  </div>
    </Link>
  )
}
