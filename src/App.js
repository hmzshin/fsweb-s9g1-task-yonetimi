import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    toast.success("Görev başarıyla eklendi");
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
    toast.success("Yeni kişi başarıyla eklendi");
  }

  function handleComplete(id) {
    const copyTasks = [...tasks];
    copyTasks.map((task) => {
      if (task.id === id) {
        task.status = "yapıldı";
      }
    });
    setTasks(copyTasks);
    toast.success("Görev tamamlandı");
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
        style={{}}
        position="bottom-center"
        theme="colored"
        autoClose={500}
        transition={Zoom}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
