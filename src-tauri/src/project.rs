use serde::{Deserialize, Serialize};
use std::path::{PathBuf};
use std::fs;

#[derive(Serialize, Deserialize)]
pub struct AirwayProject {
    name: String
}

pub fn create(project: AirwayProject, path: String) -> Result<(), String> {
    let mut project_path = PathBuf::from(&path);
    // Create the folder
    fs::create_dir_all(path).expect("Could not create project directory");
    // Build path to airway.json
    project_path.extend(["airway.json"].iter());
    // Dump the airway.json in it
    let airway_str = serde_json::to_string(&project).expect("Could not serialize project file");
    fs::write(project_path.to_str().expect("Could not write project file"), airway_str);
    Ok(())
}


pub fn load(path: String) -> Result<AirwayProject, String> {
    // Build the project path
    let mut airway_path = PathBuf::from(&path);
    airway_path.extend(["airway.json"].iter());
    // If the file is not found, error out
    if !airway_path.exists() {
        return Err("Directory or airway.json not found".into());
    }
    // Read the project file
    let airway_project_str = fs::read_to_string(airway_path.to_str().expect("Failed to load project file")).expect("Failed to load project");
    let airway_project: AirwayProject = serde_json::from_str(&airway_project_str).expect("Failed to parse airway.json");
    // Return the fruits of our labour
    Ok(airway_project)
}

/*
pub fn save(wb_settings: WorkbenchSettings) -> Result<()> {
    // Build the config path
    let mut conf_dir = home::home_dir().expect("Could not determine home directory");
    conf_dir.extend([".config", "uam-workbench"].iter());
    // Check if path/file exists
    if !conf_dir.exists() {
        // Ensure the directory exists
        fs::create_dir_all(conf_dir.to_str().expect("Could not create settings directory"));
    }
    // Add the settings file
    conf_dir.extend(["settings.json"].iter());
    // Serialize and save
    let wb_settings_str = serde_json::to_string(&wb_settings).expect("Could not serialize settings");
    fs::write(conf_dir.to_str().expect("Could not write settings file"), wb_settings_str);
    Ok(())
}
*/