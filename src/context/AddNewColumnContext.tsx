import React, { createContext, useContext, ReactNode } from "react";
import { useBoardContext } from "./AddNewBoardContext";

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

interface ColumnContextType {
  addColumn: (boardId: number, columns: string) => void;
}

type ColumnProviderProps = {
  children: ReactNode;
};

export const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {
  const { setBoards } = useBoardContext();

  const addColumn = (boardId: number, columnName: string) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: [
                ...board.columns,
                { id: Date.now(), name: columnName, tasks: [] },
              ],
            }
          : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return updatedBoards;
    });
  };

  return (
    <ColumnContext.Provider
      value={{
        addColumn,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumnContext = () => {
  const context = useContext(ColumnContext);
  if (!context) {
    throw new Error("useColumnContext must be used within a ColumnProvider");
  }
  return context;
};

export default ColumnContext;
