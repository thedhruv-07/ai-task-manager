import { createContext, useContext, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  // ✅ Load from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ Debounced search (performance)
  const debouncedSearch = useDebounce(search, 400);

  // ✅ Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const clearAllTasks = () => {
    setTasks([]);
  };

  const clearCompletedTasks = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // =============================
  // CRUD OPERATIONS
  // =============================

  const addTask = (text, priority = "medium", dueDate = null) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      priority,
      dueDate, // ⭐ now defined correctly
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ Drag & drop reorder
  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const updateTask = (id, newText) => {
  setTasks((prev) =>
    prev.map((t) =>
      t.id === id ? { ...t, text: newText } : t
    )
  );
};

  // =============================
  // FILTER + SEARCH LOGIC
  // =============================

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const matchesSearch = task.text
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalTasks - completedCount;
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        toggleTask,
        deleteTask,
        reorderTasks,
        filter,
        setFilter,
        search,
        setSearch,
        clearAllTasks,
        clearCompletedTasks,
        totalTasks,
        completedCount,
        activeCount,
        completionRate,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};