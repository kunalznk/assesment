import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { COLUMN_NAMES } from "./constants";
import { tasks } from "./tasks";
import reactDragula from "react-dragula";
import axios from "axios";

const MovableItem = ({
  title
}) => {

    return (
    <div className="movable-item">
      {title}
    </div>
  );
};

const Column = ({ children, className, title, listRef }) => {
  return (
    <div
      className={className}
      ref={listRef}
    >
      <p>{title}</p>
      {children}    
    </div>
  );
};

const AddTask = ({ title, setTaskList1, setTaskList2 }) => {
  const [data , setData ] = useState("")
 
  const handleAddData = async () => {
    try {
     const { data: respData , status} =  await axios.post("http://localhost:9000/notes", {
      list: title,
      data: {
        title: data
      }
    })
    if(status === 200) {
      await fetchTasks(setTaskList1, setTaskList2)
      setData("");
    }
    } catch (error) {
      console.log(error)
      return; 
    }
    
  }
  return <div className="add-task">
    <div className="p-2">
    <label>{title}</label>
    <input placeholder="Add task" value={data} onChange={(e) => setData(e.target.value)}/>
    </div>
    <button onClick={async() => await handleAddData()}>
      <p style={{margin:"5px"}}>Add</p>
    </button>
</div>
}

const fetchTasks = async (setTaskList1, setTaskList2) => {
  const { data }  = await axios.get("http://localhost:9000/notes");
  setTaskList1(data["taskList1"]);
  setTaskList2(data["taskList2"])
}
const App = () => {
  
  const [taskList1 ,  setTaskList1 ]= useState([])

  const [taskList2, setTaskList2] = useState([])

  const list1 = useRef();
  const list2 = useRef();


  useEffect(() => {
    reactDragula(
      [list1.current, list2.current],
      {
        removeOnSpill:true
      }
    )
  }, [])

  return (
    <div className="container">
        <Column title={"LIST 1"} className="column do-it-column" listRef={list1}>
        <AddTask title={"taskList1"} setTaskList1={setTaskList1} setTaskList2={setTaskList2}/>
            {
              taskList1.map((task) => <MovableItem key={task.id} title={task.name} />)
            }
        </Column>
        <Column title={"LIST 2"} className="column do-it-column" listRef={list2}>
        <AddTask title={"taskList2"} setTaskList1={setTaskList1} setTaskList2={setTaskList2}/>
            {
              taskList2.map((task) => <MovableItem key={task.id} title={task.name} />)
            }
        </Column>
    </div>
  );
};

export default App;
