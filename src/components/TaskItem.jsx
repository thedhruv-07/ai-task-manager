import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef, useEffect } from "react";

function TaskItem({ task }) {
  // ✅ include updateTask (YOU MISSED THIS)
  const { toggleTask, deleteTask, updateTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  // ✅ autofocus edit
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // ✅ date helpers
  const isOverdue = (date) => {
    if (!date) return false;
    const today = new Date().toISOString().split("T")[0];
    return date < today;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date().toISOString().split("T")[0];
    return date === today;
  };

  // ✅ dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    activationConstraint: {
      distance: 6, // smoother feel
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // ✅ edit save
  const handleEditSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    updateTask(task.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEditSave();
    if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: isDragging ? 0.4 : 1,
        scale: isDragging ? 1.02 : 1,
      }}
      exit={{ opacity: 0, x: 40 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
        mass: 0.6,
      }}
      className="flex items-start sm:items-center justify-between gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-3 sm:p-3.5 rounded-xl shadow-sm hover:shadow-md border border-gray-200/50 dark:border-gray-700/50 transition will-change-transform"
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* ✅ DRAG HANDLE */}
        <button
          {...attributes}
          {...listeners}
          disabled={isEditing} // ⭐ prevents drag while editing
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-transform active:scale-90"
        >
          ⋮⋮
        </button>

        {/* TEXT + META */}
        <div className="flex flex-col flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEditSave}
              onKeyDown={handleKeyDown}
              className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white outline-none"
            />
          ) : (
            <span
              onDoubleClick={() => setIsEditing(true)}
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer truncate dark:text-white ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
          )}

          {/* PRIORITY BADGE */}
          <span
            className={`text-xs font-medium mt-1 w-fit px-2 py-0.5 rounded-full ${
              task.priority === "high"
                ? "bg-red-100 text-red-600 dark:bg-red-900/40"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40"
                : "bg-green-100 text-green-600 dark:bg-green-900/40"
            }`}
          >
            {task.priority}
          </span>

          {/* ✅ DUE DATE */}
          {task.dueDate && (
            <span
              className={`text-[11px] mt-1 font-medium ${
                isOverdue(task.dueDate)
                  ? "text-red-500"
                  : isToday(task.dueDate)
                  ? "text-orange-500"
                  : "text-gray-400"
              }`}
            >
              📅 {task.dueDate}
            </span>
          )}
        </div>
      </div>

      {/* DELETE */}
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-600 font-medium ml-3"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default TaskItem;