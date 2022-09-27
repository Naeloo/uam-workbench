import { invoke } from "@tauri-apps/api";
import { AirwayProject } from ".";

export async function createProject(project: AirwayProject, projectPath: string) {
    const createdProject = await invoke<AirwayProject>('create_project', { project, projectPath });
    return createdProject;
}

export async function loadProject(projectPath: string) {
    const project = await invoke<AirwayProject>('load_project', { projectPath: projectPath });
    return project;
}