import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

function TaskList() {
  const { tasks, reorderTasks } = useTasks();
  const [activeTask, setActiveTask] = useState(null);

  if (tasks.length === 0) {
    return (
      <p className="text-center py-10 text-gray-400 dark:text-gray-500">
        ✨ No tasks yet. Add your first smart task.
      </p>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        const task = tasks.find((t) => t.id === event.active.id);
        setActiveTask(task);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
          const oldIndex = tasks.findIndex((t) => t.id === active.id);
          const newIndex = tasks.findIndex((t) => t.id === over.id);
          const newTasks = arrayMove(tasks, oldIndex, newIndex);
          reorderTasks(newTasks);
        }

        setActiveTask(null);
      }}
      onDragCancel={() => setActiveTask(null)}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>

      {/* ⭐ Floating preview that follows cursor */}
      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
        style={{ pointerEvents: "none" }}
      >
        {activeTask ? (
          <div className="w-[420px] max-w-[90vw] bg-white/95 dark:bg-gray-800/95 backdrop-blur p-3.5 rounded-xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 scale-105">
            {activeTask.text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default TaskList;