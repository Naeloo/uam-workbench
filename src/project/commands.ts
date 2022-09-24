import { invoke } from "@tauri-apps/api";
import { AirwayProject } from ".";

export async function createProject(project: AirwayProject, projectPath: string) {
    invoke('create_project', { project, projectPath });
}