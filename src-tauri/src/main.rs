#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use log::info;
use std::{fs, path::Path};
use tauri::Manager;
use tauri_plugin_log::{fern::colors::ColoredLevelConfig, LogTarget, LoggerBuilder};
use window_shadows::set_shadow;

mod utils;

fn main() {
    let targets = [LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview];
    let colors = ColoredLevelConfig::default();

    if !Path::exists(&utils::path()) {
        fs::create_dir(&utils::path()).expect("Create directory failed.");
    }

    tauri::Builder::default()
        .plugin(
            LoggerBuilder::new()
                .with_colors(colors)
                .targets(targets)
                .build(),
        )
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .setup(|app| {
            info!("Abstractive v0.0.0-dev starting...");

            let window = app.get_window("main").unwrap();
            window.hide().unwrap();
            set_shadow(&window, true).unwrap();

            Ok(())
        })
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
            utils::logout,
            utils::close_splashscreen
        ])
        .run(tauri::generate_context!())
        .expect("error while running abstractive");
}
