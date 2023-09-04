import { useState } from 'react'
import './App.css'
import { users } from "./data/users";
import { TodoList } from "./components/Todolist";

function App() {
  const [ user, setUser ] =useState(users[0].username);

  return (
    <>
      <h1>Hello</h1>
      <h2>...there.</h2>
      <p>I'm {user}</p>
      <p>And I'm learning yet another thing.</p>
      <TodoList />
    </>
  )
}

export default App
