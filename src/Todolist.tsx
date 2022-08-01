import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string) => void
   changeFilter: (value: FilterValuesType) => void
   addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
   const [title, setTitle] = useState<string>('')

   const onClickAddTask = () => {
      props.addTask(title)
      setTitle('')
   }

   const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
   // const onClickSetFilterAll = () => props.changeFilter("all")
   // const onClickSetFilterActive = () => props.changeFilter("active")
   // const onClickSetFilterCompleted = () => props.changeFilter("completed")

   const onClickSetFilterCreate = (filter: FilterValuesType) => () => props.changeFilter(filter)
   // const onClickSetFilterCreate = (filter: FilterValueType) => {
   //    return () => props.changeFilter(filter)
   // }

   return <div>
      <h3>{props.title}</h3>
      <div>
         <input
            value={title}
            onChange={onChangeSetTitle}
            onKeyDown={onKeyDownAddTask}
         />
         <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
         {
            props.tasks.map(t => <li key={t.id}>
               <input type="checkbox" checked={t.isDone}/>
               <span>{t.title}</span>
               <button onClick={() => {
                  props.removeTask(t.id)
               }}>x
               </button>
            </li>)
         }
      </ul>
      <div>
         <button onClick={onClickSetFilterCreate('all')}>
            All
         </button>
         <button onClick={onClickSetFilterCreate('active')}>
            Active
         </button>
         <button onClick={onClickSetFilterCreate('completed')}>
            Completed
         </button>
      </div>
   </div>
}
