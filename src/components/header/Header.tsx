import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <header style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
    <h1>Task Manager</h1>
    <nav className="flex space-x-4">
        <Link href="/" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Task List
        </Link>
        <Link href="/tasks/new" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create New Task
        </Link>
      </nav>
  </header>
  
  )
}

export default Header;
