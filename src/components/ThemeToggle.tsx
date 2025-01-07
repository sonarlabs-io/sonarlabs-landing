"use client";

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`
        p-2 
        ${theme === 'dark' 
          ? 'text-gray-400 hover:text-white' 
          : 'text-gray-600 hover:text-black'
        }
      `}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="ml-2">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </Button>
  );
}