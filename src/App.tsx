import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import CloseButton from "react-bootstrap/esm/CloseButton";
import Navbar from "./components/Navbar";
interface ITask {
  taskName: string;
}

function App() {
  const [task, setTask] = useState<string>("");
  // const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    }
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList((prevList) =>
      prevList.filter((task) => task.taskName !== taskNameToDelete)
    );
  };

  const addTask = (): void => {
    const newTask = { taskName: task };
    setTodoList([...todoList, newTask]);
    setTask("");
  };

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todoList));
    } catch (err) {
      console.error(err);
    }
  }, [todoList]);

  return (
    <>
      <Navbar />
      <div className="todo-form p-2 d-flex flex-column justify-content-center align-items-center">
        <Form className="d-flex w-75">
          <Form.Control
            className="w-100 m-2"
            required
            type="text"
            placeholder="Write Task Here ..."
            name="task"
            autoComplete="false"
            value={task}
            onChange={handleChange}
          />

          {/* <Form.Control className='w-75 m-2' required
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
             /> */}
        </Form>
        <Button
          className="w-75"
          variant="dark"
          disabled={!task}
          onClick={addTask}
        >
          Add Task
        </Button>
      </div>
      <div className="todos w-95 p-2 d-flex flex-column justify-content-center align-items-center gap-2">
        {todoList?.map((todo) => (
          <div
            className="todo border rounded w-95 text-white bg-secondary"
            key={Math.random()}
          >
            <h1>{todo.taskName}</h1>
            {/* <button className='position-absolute t-2 r-2' >X</button> */}
            <CloseButton
              onClick={() => completeTask(todo.taskName)}
              variant="white"
              
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
