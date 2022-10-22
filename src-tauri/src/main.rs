#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{fs, path::Path};

mod utils;

fn main() {
    if !Path::exists(&utils::path()) {
        fs::create_dir(&utils::path()).expect("Create directory failed.");
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            utils::setup,
            utils::exists,
            utils::add_client,
            utils::get_config,
            utils::set_active,
            utils::get_mods,
            utils::install_mod,
            utils::uninstall_mod,
            utils::login,
            utils::verify,
            utils::logout
        ])
        .run(tauri::generate_context!())
        .expect("error while running abstractive");
}
