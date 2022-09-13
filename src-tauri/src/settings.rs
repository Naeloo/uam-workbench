use serde::{Deserialize, Serialize};
use serde_json::Result;
use std::path::Path;
use std::fs;
use std::net::SocketAddr;
use std::error::Error;
use home;

#[derive(Serialize, Deserialize)]
pub struct WorkbenchSettingsPaths {
    openscad: String
}

#[derive(Serialize, Deserialize)]
pub struct WorkbenchSettings {
    paths: WorkbenchSettingsPaths
}

fn default_settings() -> WorkbenchSettings {
    let paths = WorkbenchSettingsPaths {
        openscad: "".to_owned()
    };
    let wb_settings = WorkbenchSettings {
        paths: paths
    };
    return wb_settings;
}

pub fn load() -> Result<WorkbenchSettings> {
    // Build the configuration path
    let mut conf_dir = home::home_dir().expect("Could not determine home directory");
    conf_dir.extend([".config", "uam-workbench", "settings.json"].iter());
    // If the file is not found, save a default config
    if !conf_dir.exists() {
        save(default_settings());
    }
    // Read the config file
    let wb_settings_str = fs::read_to_string(conf_dir.to_str().expect("Failed to load configuration")).expect("Failed to load configuration");
    let wb_settings: WorkbenchSettings = serde_json::from_str(&wb_settings_str).expect("Failed to parse configuration");
    // Return the fruits of our labour
    return Ok(wb_settings);
}

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

pub fn update() -> Result<()> {
    Ok(())
}