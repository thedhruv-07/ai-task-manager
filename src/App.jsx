import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import StatsBar from "./components/StatsBar";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-gray-900 dark:via-gray-900 dark:to-black px-3 sm:px-4 py-4 transition-colors duration-300">
      
      <div className="max-w-xl mx-auto w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            AI Task Manager
          </h1>
          <ThemeToggle />
        </div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl">
          <TaskInput />
          <SearchBar />
          <FilterBar />
          <StatsBar />
          <TaskList />
        </div>

      </div>
    </div>
  );
}

export default App;