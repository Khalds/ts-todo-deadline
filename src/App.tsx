import React, {FC, useState, ChangeEvent} from 'react';
import { ITask } from './interface'
import './App.css'
import TodoTask from './components/TodoTask';

const  App: FC = () => {

  const [task, setTask] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
    if(event.target.name === 'task'){
      setTask(event.target.value)
    }else{
      setDeadline(Number(event.target.value))
    }
  }

  const addTask =():void =>{
    if(task !== ''){
       const newTask = { taskName: task, deadline: deadline}
    setTodoList([...todoList, newTask])
    setTask('')
    setDeadline(0)
    }
   
  }

  const completeTask = (taskNameToDelete: string):void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))

  }

  return (
    <div className='App'>
      <div className='header'>
        <div className='inputContainer'>
          <input type="text" placeholder='Task...' name='task' onChange={handleChange} value={task}/>
          <input type="number" min='0' placeholder='Deadline (in days)...' name='deadline' onChange={handleChange} value={deadline}/>
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {
          todoList.map((task: ITask, key: number) =>{
            return <TodoTask key={key} task={task} completeTask={completeTask}/>
          })
        }
      </div>
    </div>
  );
}

export default App;