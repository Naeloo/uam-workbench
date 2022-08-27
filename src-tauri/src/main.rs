#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use librumqttd::{Broker, Config};
use std::thread;

fn main() {
  let config: Config = confy::load_path("config/rumqttd.conf").unwrap();
  let mut broker = Broker::new(config);

  let mut tx = broker.link("localclient").unwrap();
  thread::spawn(move || {
      broker.start().unwrap();
  });

  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
