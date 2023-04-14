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

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted for Notifications");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (Notification.permission === "granted" && todoList.length > 0) {
      const intervalId = setInterval(() => {
        new Notification(`You have ${todoList.length} todos to do!`);
      }, 1 * 60 * 1000); // 30 minutes in milliseconds

      return () => clearInterval(intervalId);
    }
  }, [todoList]);

  useEffect(() => {
    requestNotificationPermission()
  },[])

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
            <CloseButton
              onClick={() => completeTask(todo.taskName)}
              variant="white"
            />
          </div>
        ))}
      </div>
      {/* <Button onClick={requestNotificationPermission}>
        Request Notification Permission
      </Button> */}
    </>
  );
}

export default App;
