import { useState } from 'react'
import './css/Todo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import TodoItems from './TodoItems';

let count = 0;

const Todo = () => {

  const [todos,setTodos] = useState([]);
  const inputRef = useRef(null);

    const completedTodos = todos.filter(todo => todo.display === "line-through");
    const uncompletedTodos = todos.filter(todo => todo.display === "");

  const add = () => {
    setTodos([...todos,{no: count++, text: inputRef.current.value, display:""}]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count",count);
  }

  //creating local storage
  useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  },[])


  useEffect(()=>{ 
    setTimeout(() => {
    console.log(todos);
    const sortedTodos = [...todos].sort((a, b) => a.display.localeCompare(b.display));
    localStorage.setItem("todos",JSON.stringify(sortedTodos));
  }, 100);
},[todos]);

  const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    add(); 
    event.preventDefault(); 
  }
};

// hard reset 
const reset = () => {
     if (window.confirm("Are you sure you want to delete all tasks?")) {
    setTodos([]); 
    localStorage.removeItem("todos"); 
    count = 0; 
    localStorage.setItem("todos_count", count); 
  }
  }

  return (
    <div className='todo'>
      <div className='todo-header'> <p> TODO APP </p>
      <button onClick={reset} className='reset-btn'>Reset</button>
      </div>
      
      <div className='todo-add'> 
        <input ref={inputRef} type="text" placeholder='Add your task' className="todo-input" onKeyDown={handleKeyDown}/>
        <div onClick={()=>{add()}} className='todo-add-btn'>+</div>
      </div>

      <div className='todo-list'>
        <h2>Tasks</h2>
        {uncompletedTodos.map((item,index)=>{
          return <TodoItems key={index} no={item.no} setTodos={setTodos} display={item.display} text={item.text}/>
        })}
        {completedTodos.length > 0 && ( 
          <>
            <h2>Completed</h2>
            {completedTodos.map((item,index)=>{
              return <TodoItems key={index} no={item.no} setTodos={setTodos} display={item.display} text={item.text}/>
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default Todo
