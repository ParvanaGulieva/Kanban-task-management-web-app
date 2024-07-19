import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./UI/Board";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DetailedTask from "./Modals/DetailedTask";
import AddNewTask from "./Modals/AddNewTask";
import { BoardProvider } from "./context/AddNewBoardContext";
import { ColumnProvider } from "./context/AddNewColumnContext";
import { TaskProvider } from "./context/AddNewTaskContext";

function App() {
  const [theme, setTheme] = useState(true);
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [showDetailedTask, setShowDetailedTask] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <BrowserRouter>
      <BoardProvider>
        <ColumnProvider>
          <TaskProvider>
            <div className={theme ? `` : `dark`}>
              <Header
                setShowAddNewTask={setShowAddNewTask}
                setShowDelete={setShowDelete}
                showDelete={showDelete}
              />
              <div className="main-section">
                <Sidebar toggleTheme={toggleTheme} />
                <Routes>
                  <Route
                    path="/board/:boardId"
                    element={
                      <Board setShowDetailedTask={setShowDetailedTask} />
                    }
                  />
                </Routes>
              </div>
              {showAddNewTask && (
                <AddNewTask setShowAddNewTask={setShowAddNewTask} />
              )}
              {showDetailedTask && (
                <DetailedTask setShowDetailedTask={setShowDetailedTask} />
              )}
            </div>
          </TaskProvider>
        </ColumnProvider>
      </BoardProvider>
    </BrowserRouter>
  );
}

export default App;

// columns limit
// ve columns nameler eyni olsa error
// ilkin olaraq localhost:3000 columnlari gostermir
// columns grid
// theme change
// drag drop
