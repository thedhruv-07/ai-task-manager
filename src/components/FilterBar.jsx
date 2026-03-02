import { useTasks } from "../context/TaskContext";

function FilterBar() {
  const { filter, setFilter } = useTasks();

 const btn = (type) =>
  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
    filter === type
      ? "bg-black text-white shadow-md"
      : "bg-gray-200/70 dark:bg-gray-700/70 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
  }`;

  return (
    <div className="flex gap-2 justify-center mb-4">
      <button className={btn("all")} onClick={() => setFilter("all")}>
        All
      </button>
      <button className={btn("active")} onClick={() => setFilter("active")}>
        Active
      </button>
      <button
        className={btn("completed")}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterBar;