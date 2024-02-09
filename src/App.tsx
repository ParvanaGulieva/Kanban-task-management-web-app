import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./UI/Board";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DetailedTask from "./Modals/DetailedTask";
import AddNewTask from "./Modals/AddNewTask";
import AddNewBoard from "./Modals/AddNewBoard";
import Delete from "./Modals/Delete";

function App() {
  const [theme, setTheme] = useState(true);
  const [addNewTask, setAddNewTask] = useState(false);
  const [showDetailedTask, setShowDetailedTask] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [boards, setBoards] = useState([
    "Platform Launch",
    "Marketing Plan",
    "Roadmap",
  ]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const handleAddNewBoard = (boardName: string) => {
    setBoards([...boards, boardName]);
  };

  return (
    <div className={theme ? `` : `dark`}>
      <Header
        setAddNewTask={setAddNewTask}
        setShowDelete={setShowDelete}
        showDelete={showDelete}
      />
      <div className="main-section">
        <Sidebar
          toggleTheme={toggleTheme}
          handleAddNewBoard={handleAddNewBoard}
          boards={boards}
        />
        <Board setShowDetailedTask={setShowDetailedTask} />
      </div>
      {addNewTask && <AddNewTask setAddNewTask={setAddNewTask} />}
      {showDetailedTask && (
        <DetailedTask setShowDetailedTask={setShowDetailedTask} />
      )}
    </div>
  );
}

export default App;
