#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use librumqttd::{Broker, Config};
use std::thread;

mod settings;
mod project;

fn main() {
  /*let config: Config = confy::load_path("config/rumqttd.conf").unwrap();
  let mut broker = Broker::new(config);

  let mut tx = broker.link("localclient").unwrap();
  thread::spawn(move || {
      broker.start().unwrap();
  });*/

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_settings, create_project, load_project])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_settings() -> settings::WorkbenchSettings {
  settings::load().expect("Could not load settings upon JS request").into()
}

#[tauri::command]
fn create_project(project: project::AirwayProject, projectPath: String) -> Result<(), String> {
  project::create(project, projectPath)
}
#[tauri::command]
fn load_project(project_path: String) -> Result<project::AirwayProject, String> {
  project::load(project_path)
}
