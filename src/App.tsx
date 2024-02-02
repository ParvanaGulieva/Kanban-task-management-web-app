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

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={theme}>
      <Header />
      <div className="main-section">
        <Sidebar toggleTheme={toggleTheme} />
        <Board />
      </div>
    </div>
  );
}

export default App;
