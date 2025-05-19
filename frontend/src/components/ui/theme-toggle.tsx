"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`p-2 rounded-full transition-colors ${className} ${
        theme === "dark" 
          ? "bg-gray-800 text-yellow-300 hover:bg-gray-700" 
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
