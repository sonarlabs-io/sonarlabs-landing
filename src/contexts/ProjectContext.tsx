// contexts/ProjectContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Project, ProjectArtist } from '@/types/project';
import type { ArtistDetails } from '@/types/artist';
import { 
  getUserProjects,
  createProject as createProjectAPI,
  updateProjectName as updateProjectNameAPI,
  deleteProject as deleteProjectAPI,
  addArtistToProject as addArtistToProjectAPI,
  removeArtistFromProject as removeArtistFromProjectAPI
} from '@/utils/api';

interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  createProject: (name: string, artist?: ArtistDetails) => Promise<Project>;
  addArtistToProject: (projectId: string, artist: ArtistDetails) => Promise<void>;
  removeArtistFromProject: (projectId: string, artistId: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProjectName: (projectId: string, newName: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  const createProject = useCallback(async (name: string, artist?: ArtistDetails) => {
    try {
      const newProject = await createProjectAPI({ name });
      
      const typedProject: Project = {
        ...newProject,
        id: newProject.id,
        name: newProject.name,
        description: newProject.description || null,
        user_id: newProject.user_id as string,
        artists: [],
        created_at: newProject.created_at,
        updated_at: newProject.updated_at
      };

      if (artist) {
        await addArtistToProjectAPI(typedProject.id, artist);
        const projectArtist: ProjectArtist = {
          id: crypto.randomUUID(),
          project_id: typedProject.id,
          artist_id: artist.id,
          artist_name: artist.name,
          artist_details: artist,
          added_at: new Date().toISOString()
        };
        typedProject.artists = [projectArtist];
      }

      setProjects(prev => [...prev, typedProject]);
      return typedProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  }, []);

  const addArtistToProject = useCallback(async (projectId: string, artist: ArtistDetails) => {
    try {
      await addArtistToProjectAPI(projectId, artist);
      
      setProjects(prev => prev.map(project => {
        if (project.id === projectId && !project.artists.some(a => a.artist_id === artist.id)) {
          const projectArtist: ProjectArtist = {
            id: crypto.randomUUID(),
            project_id: projectId,
            artist_id: artist.id,
            artist_name: artist.name,
            artist_details: artist,
            added_at: new Date().toISOString()
          };

          return {
            ...project,
            artists: [...project.artists, projectArtist]
          };
        }
        return project;
      }));
    } catch (error) {
      console.error('Failed to add artist to project:', error);
      throw error;
    }
  }, []);

  const removeArtistFromProject = useCallback(async (projectId: string, artistId: string) => {
    try {
      await removeArtistFromProjectAPI(projectId, artistId);
      
      setProjects(prev => prev.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            artists: project.artists.filter(artist => artist.artist_id !== artistId)
          };
        }
        return project;
      }));
    } catch (error) {
      console.error('Failed to remove artist from project:', error);
      throw error;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await deleteProjectAPI(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }, []);

  const updateProjectName = useCallback(async (projectId: string, newName: string) => {
    try {
      await updateProjectNameAPI(projectId, newName);
      
      setProjects(prev => prev.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            name: newName
          };
        }
        return project;
      }));
    } catch (error) {
      console.error('Failed to update project name:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const userProjects = await getUserProjects();
        const typedProjects: Project[] = userProjects.map(project => ({
          ...project,
          id: project.id,
          name: project.name,
          description: project.description || null,
          user_id: project.user_id,
          artists: project.artists || [],
          created_at: project.created_at,
          updated_at: project.updated_at
        }));
        setProjects(typedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };
    loadProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      setProjects,
      createProject,
      addArtistToProject,
      removeArtistFromProject,
      deleteProject,
      updateProjectName
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within a ProjectProvider');
  return context;
};