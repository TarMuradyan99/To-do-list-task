
import './App.css';
import {useRef,useState} from 'react'
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import List from './components/List/List';
import Text from './components/Text/Text';
import Card from './Ui/Card/Card';
import Wrapper from './Ui/Wrapper/Wrapper';
import Listitem from './components/Listitem/Listitem';
import classes from './Ui/Global.module.css'
import { IoClose } from "react-icons/io5"


  const App  = () => {
    const [toDoList, setToDoList] = useState([
      {text: `Researching, designing, implementing software programs.`, id: 1, done: false},
      {text: `Testing and evaluating new programs`, id: 2, done: false},
      {text: `Identifying areas for modification in existing programs.`, id: 3, done: false},
      {text: `Writing and implementing efficient code.`, id: 4, done: false},
    ]);
    const [nextTaskId, setNextTaskId] = useState(toDoList[toDoList.length - 1]?.id + 1);
    const [notCompletedTask, setNotCompletedTask] = useState(false);
    const taskRef = useRef("");
    const [inputClass, setInputClass] = useState(`${classes.input}`);
    const [inputPlaceholder, setInputPlaceholder] = useState(`Write Here`);
    const [deleteMainDivClass, setDeleteMainDivClass] = useState(`${classes.main}`);
    const [deleteDivClass, setDeleteDivClass] = useState(`${classes['delete_div']}`);
    const [deletedId, setDeletedId] = useState(``)

    const filterCompletedTasks = (el) => {
      if(notCompletedTask) {
          return el.done === false
      } else {
        return true
      }
    }

    const addNewTask = () => {
        if(taskRef.current.value) {
          const object = {
            text: taskRef.current.value,
            id: nextTaskId,
            done: false
          }
          setToDoList(toDoList.concat(object));
          setNextTaskId(nextTaskId + 1)
          taskRef.current.value = ``
          setInputClass(`${classes.input}`)
          setInputPlaceholder('Write here')
        } else {
          setInputClass(`${classes['wrong_title']}`)
          setInputPlaceholder('Cant add empty task title')
        }
    }

    const deleteTask = (id) => {
      setDeleteMainDivClass(`${classes.main} ${classes['main_view']}`);
      setDeleteDivClass(`${classes['delete_div']} ${classes['remove']}`)
        setDeletedId(id)
    }

    const deleteCreatedTask = () => {
            const filteredList = toDoList.filter(el => el.id !== deletedId);
            setToDoList(filteredList)
            setDeletedId(``);
            setDeleteMainDivClass(`${classes.main}`);
            setDeleteDivClass(`${classes['delete_div']}`)
    }

    const saveTask = () => {
        setDeletedId(``);
        setDeleteMainDivClass(`${classes.main}`)
        setDeleteDivClass(`${classes['delete_div']}`)
    }

    const completedTask = (id) => {
      let modifiedList = [...toDoList];
      modifiedList.map(el => el.id === id ? el.done = !el.done : null);
      setToDoList(modifiedList)
    }

    return(
      <Wrapper>
        <Card className={deleteDivClass}>
              <Text>Are you sure you want to delete?</Text>
              <Card>
                <Button className={classes['accept_deleted_tasks']} onClick={deleteCreatedTask}>Yes</Button>
                <Button className={classes['accept_deleted_tasks']} onClick={saveTask}>No</Button>
              </Card>
        </Card>
        <Card className={deleteMainDivClass}> 
        
        </Card>
         <Card className={classes['hide_completed']}>
          <Input onClick={() => setNotCompletedTask(!notCompletedTask)} className={classes['checkbox']} type="checkbox" />
          <Text className={classes.text}>Hide Completed</Text>
        </Card>
        <Card className={classes['add-your_task']}>
        <Input placeholder={inputPlaceholder} type="text" className={inputClass} myRef={taskRef} />
        <Button onClick={addNewTask} className={classes['add_task']}>Add</Button>
        </Card>
       
        <List className={classes['task_box']}>
            {toDoList.filter(el => filterCompletedTasks(el)).map(el => {
              return(
                <Card className={classes['my_tasks']}>
              <Listitem className={classes['list_item']} key={el.id}>
                <Input defaultChecked={el.done} onClick={() => completedTask(el.id)} className={classes['complete']} type="checkbox" /> {el.text}
                 <IoClose onClick={() => deleteTask(el.id)} className={classes.delete} /></Listitem>
              </Card>)
            })}
        </List>
        
      </Wrapper>
    )
}
 

export default App;
