import React, { useState } from "react";
import Board from "./UI/Board";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DetailedTask from "./Modals/DetailedTask";
import AddNewTask from "./Modals/AddNewTask";
import AddNewBoard from "./Modals/AddNewBoard";
import Delete from "./Modals/Delete";

function App() {
  const [theme, setTheme] = useState("");
  const [addNewTask, setAddNewTask] = useState(false);
  const [addNewBoard, setAddNewBoard] = useState(false);
  const [showDetailedTask, setShowDetailedTask] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={theme}>
      <Header setAddNewTask={setAddNewTask} />
      <div className="main-section">
        <Sidebar toggleTheme={toggleTheme} />
        <Board
          setAddNewBoard={setAddNewBoard}
          setShowDetailedTask={setShowDetailedTask}
        />
      </div>
      {addNewTask && <AddNewTask setAddNewTask={setAddNewTask} />}
      {addNewBoard && <AddNewBoard setAddNewBoard={setAddNewBoard} />}
      {showDetailedTask && (
        <DetailedTask setShowDetailedTask={setShowDetailedTask} />
      )}
    </div>
  );
}

export default App;
