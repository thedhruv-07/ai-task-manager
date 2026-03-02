import { useState, useRef, forwardRef, useImperativeHandle, useCallback } from "react";
import { useTasks } from "../context/TaskContext";

const TaskInput = forwardRef((props, ref) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const { addTask } = useTasks();
  const inputRef = useRef(null);

  // ✅ MANUAL ADD
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || trimmed.length < 2) return;

    addTask(trimmed, priority, dueDate || null);

    // reset fields
    setText("");
    setDueDate("");

    // keep fast typing UX
    inputRef.current?.focus();
  };

  // ✅ AI SUGGEST (memo safe)
  const handleAISuggest = useCallback(async () => {
    try {
      setLoadingAI(true);

      const res = await fetch("/api/ai-suggest");

      if (!res.ok) throw new Error("API not ready");

      const data = await res.json();

      if (data?.suggestion) {
        addTask(data.suggestion, priority, dueDate || null);
      } else {
        throw new Error("No suggestion");
      }
    } catch (err) {
      console.warn("Using local AI fallback");

      const localIdeas = [
        "Review today's goals",
        "Plan tomorrow tasks",
        "Clean your workspace",
        "Check important emails",
        "Practice coding problems",
        "Go for quick workout",
      ];

      const random =
        localIdeas[Math.floor(Math.random() * localIdeas.length)];

      addTask(random, priority, dueDate || null);
    } finally {
      setLoadingAI(false);
      inputRef.current?.focus();
    }
  }, [addTask, priority, dueDate]);

  // ✅ expose methods for keyboard shortcuts
  useImperativeHandle(
    ref,
    () => ({
      focusInput: () => inputRef.current?.focus(),
      triggerAI: () => handleAISuggest(),
    }),
    [handleAISuggest]
  );

  return (
    <form onSubmit={handleSubmit}className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-5">
      {/* TEXT INPUT */}
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task and press Enter…"
        className="flex-1 w-full sm:min-w-[220px] px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-black/20 dark:text-white transition"
      />

      {/* CONTROLS */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 dark:text-white"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 dark:text-white"
        />

        {/* ADD */}
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-black text-white font-medium hover:bg-black/90 active:scale-95 transition"
        >
          Add
        </button>

        {/* AI */}
        <button
          type="button"
          onClick={handleAISuggest}
          disabled={loadingAI}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 active:scale-95 transition disabled:opacity-50"
        >
          {loadingAI ? "…" : "✨ AI"}
        </button>
      </div>
    </form>
  );
});

export default TaskInput;