import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    toast.success(
      "Yeni Görev : " +
        "'" +
        yeniTask.title +
        "'" +
        " başarılı bir şekilde eklendi"
    );
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
    toast.success(yeniKisi + ", ekibe katıldı.");
  }

  function handleComplete(id) {
    const copyTasks = [...tasks];
    let title = "";
    copyTasks.map((task) => {
      if (task.id === id) {
        task.status = "yapıldı";
        title = task.title;
      }
    });
    setTasks(copyTasks);
    toast.success("Tebrikler!, " + title + " görevini tamaladın");
  }

  return (
    <>
      <div className="app">
        <div className="formColumn">
          <div className="form-container">
            <h2>Yeni Task</h2>
            {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
            <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
          </div>

          <div className="form-container">
            <h2>Yeni Kişi</h2>
            <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h2 className="column-title">Yapılacaklar</h2>
            <div className="column-list">
              {tasks
                .filter((t) => t.status === "yapılacak")
                .map((t) => (
                  <Task key={t.id} taskObj={t} onComplete={handleComplete} />
                ))}
            </div>
          </div>
          <div className="column">
            <h2 className="column-title">Tamamlananlar</h2>
            <div className="column-list">
              {tasks
                .filter((t) => t.status === "yapıldı")
                .map((t) => (
                  <Task key={t.id} taskObj={t} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={2000}
        transition={Slide}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
