import { useState } from 'react'
import './App.css'
import TodoList  from "./components/Todolist";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <h2>...there.</h2>
      <p>I'm Matt.</p>
      <p>And I'm learning yet another thing.</p>
      <TodoList />
    </>
  )
}

export default App
