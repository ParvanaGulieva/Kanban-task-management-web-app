import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./UI/Board";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DetailedTask from "./Modals/DetailedTask";
import AddNewTask from "./Modals/AddNewTask";
import AddNewBoard from "./Modals/AddNewBoard";
import Delete from "./Modals/Delete";
import { BoardProvider } from "context/AddNewBoardContext";
import { ColumnProvider } from "context/AddNewColumnContext";

function App() {
  const [theme, setTheme] = useState(true);
  const [showAddNewTask, setShowAddNewTask] = useState(false);
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
    <BoardProvider>
      <ColumnProvider>
        <div className={theme ? `` : `dark`}>
          <Header
            setShowAddNewTask={setShowAddNewTask}
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
          {showAddNewTask && (
            <AddNewTask setShowAddNewTask={setShowAddNewTask} />
          )}
          {showDetailedTask && (
            <DetailedTask setShowDetailedTask={setShowDetailedTask} />
          )}
        </div>
      </ColumnProvider>
    </BoardProvider>
  );
}

export default App;
