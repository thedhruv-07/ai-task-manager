import { useTasks } from "../context/TaskContext";
import { forwardRef, useImperativeHandle, useRef, useCallback } from "react";

const SearchBar = forwardRef((props, ref) => {
  const { search, setSearch } = useTasks();
  const inputRef = useRef(null);

  // ✅ clear search helper (nice UX)
  const clearSearch = useCallback(() => {
    setSearch("");
    inputRef.current?.focus();
  }, [setSearch]);

  // ✅ expose to keyboard shortcuts
  useImperativeHandle(
    ref,
    () => ({
      focusSearch: () => inputRef.current?.focus(),
      clearSearch,
    }),
    [clearSearch]
  );

  return (
    <input
      ref={inputRef} // ⭐ IMPORTANT — you missed this
      type="text"
      placeholder="Search tasks… (Press /)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        // ⭐ pro UX: Esc clears search
        if (e.key === "Escape") {
          clearSearch();
        }
      }}
      className="w-full min-w-[220px] px-4 py-2.5 mb-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-black/20 dark:text-white transition"
    />
  );
});

export default SearchBar;