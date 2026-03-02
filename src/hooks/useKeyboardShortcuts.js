import { useEffect } from "react";

export default function useKeyboardShortcuts({
  onFocusInput,
  onFocusSearch,
  onAISuggest,
}) {
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName.toLowerCase();

      // ❗ don't trigger inside inputs
      if (tag === "input" || tag === "textarea") return;

      // N → focus add task
      if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        onFocusInput?.();
      }

      // / → focus search
      if (e.key === "/") {
        e.preventDefault();
        onFocusSearch?.();
      }

      // Ctrl/Cmd + Enter → AI
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onAISuggest?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFocusInput, onFocusSearch, onAISuggest]);
}