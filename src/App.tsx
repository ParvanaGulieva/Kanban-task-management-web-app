import React from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <div className="main-layout">
      <Sidebar />
      <Header />
      <Board />
    </div>
  );
}

export default App;
