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
    .invoke_handler(tauri::generate_handler![get_settings])
    .invoke_handler(tauri::generate_handler![create_project])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_settings() -> settings::WorkbenchSettings {
  return settings::load().expect("Could not load settings upon JS request").into();
}

#[tauri::command]
fn create_project(project: project::AirwayProject, projectPath: String) -> bool {
  project::create(project, projectPath).expect("Could not load settings upon JS request");
  return true;
}