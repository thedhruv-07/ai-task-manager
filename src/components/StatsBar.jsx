import { useTasks } from "../context/TaskContext";

function StatsBar() {
    const {
        totalTasks,
        completedCount,
        activeCount,
        completionRate,
        clearAllTasks,
        clearCompletedTasks,
    } = useTasks();

    if (totalTasks === 0) return null;

    return (
        <div className="mb-4 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"> 

                {/* stats */}
                <div className="text-sm dark:text-gray-300">
                    <span className="font-semibold">{totalTasks}</span> tasks •{" "}
                    <span className="text-green-600 font-semibold">
                        {completedCount} done
                    </span>{" "}
                    • {completionRate}% complete
                </div>

                {/* actions */}
                <div className="flex gap-2">
                    <button
                        onClick={clearCompletedTasks}
                        className="text-xs px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/40"
                    >
                        Clear completed
                    </button>

                    <button
                        onClick={() => {
                            if (confirm("Clear ALL tasks?")) clearAllTasks();
                        }}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40"
                    >
                        Clear all
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatsBar;