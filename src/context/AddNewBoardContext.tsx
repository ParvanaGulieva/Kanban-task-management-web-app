import React, { createContext, useState, useContext, ReactNode } from "react";

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: string;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

interface Board {
  id: number;
  name: string;
  columns: Column[];
}

interface BoardContextType {
  boards: Board[];
  addBoard: (boardName: string, columns: string[]) => void;
  updateBoard: (boardId: number, boardName: string, columns: string[]) => void;
  deleteBoard: (boardId: number) => void;
  updateColumn: (boardId: number, columnId: number, columnName: string) => void;
  deleteColumn: (boardId: number, columnId: number) => void;

  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  // formik: FormikProps<FormikValues>;
  showNewBoardModal: boolean;
  setShowNewBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditBoard: boolean;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

type BoardProviderProps = { children: ReactNode };

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const initialBoards: Board[] = JSON.parse(
    localStorage.getItem("boards") ||
      JSON.stringify([
        {
          id: 1,
          name: "Platform Lunch",
          columns: [
            {
              id: 1,
              name: "To do",
              tasks: [],
            },
            {
              id: 2,
              name: "Doing",
              tasks: [],
            },
            {
              id: 3,
              name: "Done",
              tasks: [],
            },
          ],
        },
        {
          id: 2,
          name: "Marketing Plan",
          columns: [
            {
              id: 1,
              name: "To do",
              tasks: [],
            },
            {
              id: 2,
              name: "Doing",
              tasks: [],
            },
            {
              id: 3,
              name: "Done",
              tasks: [],
            },
          ],
        },
        {
          id: 3,
          name: "Roadmap",
          columns: [
            {
              id: 1,
              name: "To do",
              tasks: [],
            },
            {
              id: 2,
              name: "Doing",
              tasks: [],
            },
            {
              id: 3,
              name: "Done",
              tasks: [],
            },
          ],
        },
      ])
  );

  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [activeTab, setActiveTab] = useState(0);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);

  const updateLocalStorage = (updatedBoards: Board[]) => {
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const addBoard = (boardName: string, columns: string[]) => {
    const newBoardId = Date.now();
    const newColumns = columns.map((columnName) => ({
      id: Date.now() + Math.random(),
      name: columnName,
      tasks: [],
    }));

    const newBoard: Board = {
      id: newBoardId,
      name: boardName,
      columns: newColumns,
    };

    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards, newBoard];
      updateLocalStorage(updatedBoards);
      return updatedBoards;
    });
  };

  const deleteBoard = (boardId: number) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.filter((board) => board.id !== boardId);
      updateLocalStorage(updatedBoards);
      return updatedBoards;
    });
  };

  const updateBoard = (
    boardId: number,
    boardName: string,
    columns: string[]
  ) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              name: boardName,
              columns: columns.map((columnName, index) => ({
                ...board.columns[index],
                name: columnName,
                id: Date.now() + Math.random(),
                tasks: [],
              })),
            }
          : board
      );
      updateLocalStorage(updatedBoards);
      return updatedBoards;
    });
  };

  const updateColumn = (
    boardId: number,
    columnId: number,
    columnName: string
  ) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? { ...column, name: columnName }
                  : column
              ),
            }
          : board
      );
      updateLocalStorage(updatedBoards);
      return updatedBoards;
    });
  };

  const deleteColumn = (boardId: number, columnId: number) => {
    setBoards((prevBoards) => {
      const updatedBoards = prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.filter((column) => column.id !== columnId),
            }
          : board
      );
      updateLocalStorage(updatedBoards);
      return updatedBoards;
    });
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        updateBoard,
        deleteBoard,
        updateColumn,
        deleteColumn,
        activeTab,
        setActiveTab,
        setShowNewBoardModal,
        showNewBoardModal,
        setShowEditBoard,
        showEditBoard,
        setBoards,
      }}
    >
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
