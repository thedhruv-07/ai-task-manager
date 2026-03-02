import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;