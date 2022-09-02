use std::{
    fs::File,
    path::{Path, PathBuf},
};

pub fn path() -> PathBuf {
    PathBuf::from(
        tauri::api::path::config_dir()
            .unwrap()
            .to_str()
            .unwrap()
            .to_owned()
            + "/dev.jacksta.abstractive",
    )
}

#[tauri::command]
pub fn exists(path: String) -> bool {
    let path = PathBuf::from(path);

    Path::exists(&path)
}

#[tauri::command]
pub fn setup() -> bool {
    let config_path = path();

    config_path.join("config.json").exists()
}
