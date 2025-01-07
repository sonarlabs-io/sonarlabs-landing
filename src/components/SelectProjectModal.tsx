"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeStyles } from '@/styles/components';
import { Plus } from 'lucide-react';
import { CreateProjectModal } from './CreateProjectModal';
import type { Project } from '@/types/project';

interface SelectProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (projectId: string, projectName?: string) => void;
  onCreateNew: () => void;
}

export function SelectProjectModal({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onCreateNew,
}: SelectProjectModalProps) {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [tempProjectName, setTempProjectName] = React.useState<string>("");
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);

  const handleCreateProject = (name: string) => {
    setTempProjectName(name);
    setSelectedProjectId('temp-new');
    setIsCreateModalOpen(false);
  };

  const handleSubmit = () => {
    if (selectedProjectId === 'temp-new' && tempProjectName) {
      onSelectProject(selectedProjectId, tempProjectName);
    } else if (selectedProjectId) {
      onSelectProject(selectedProjectId);
    }
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`${themeStyles.modal.container} w-[calc(100%-2rem)] sm:w-full max-h-[calc(100vh-2rem)] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={themeStyles.modal.title}>
              Add to Project
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Select 
              value={selectedProjectId} 
              onValueChange={setSelectedProjectId}
            >
              <SelectTrigger className="w-full min-h-[44px]">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent className="max-h-[40vh]">
                {tempProjectName && (
                  <SelectItem 
                    value="temp-new"
                    className="min-h-[44px] flex items-center"
                  >
                    {tempProjectName}
                  </SelectItem>
                )}
                {projects.map((project) => (
                  <SelectItem 
                    key={project.id} 
                    value={project.id}
                    className="min-h-[44px] flex items-center"
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full min-h-[44px]"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={onClose}
              className={`${themeStyles.modal.cancelButton} w-full sm:w-auto min-h-[44px]`}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedProjectId}
              className={`${themeStyles.modal.submitButton} w-full sm:w-auto min-h-[44px]`}
            >
              Add to Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
}