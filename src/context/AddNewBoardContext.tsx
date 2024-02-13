import React, { createContext, useState, useContext, ReactNode } from "react";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardContextType {
  boards: string[];
  addBoard: (boardName: string) => void;
}

type BoardProviderProps = {
  children: ReactNode;
};

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState(["To do", "Doing"]);
  const [boards, setBoards] = useState([
    "Platform Lunch",
    "Marketing Plan",
    "Roadmap",
  ]);

  const addBoard = (boardName: string) => {
    setBoards([...boards, boardName]);
    console.log(boards);
  };

  return (
    <BoardContext.Provider value={{ boards, addBoard, columns, setColumns }}>
      {children}
    </BoardContext.Provider>
  );
};
export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};

export default BoardContext;
