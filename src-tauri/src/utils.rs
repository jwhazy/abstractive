use std::{
    fs::File,
    io::Read,
    path::{Path, PathBuf},
};

use serde_json::Value;

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

#[tauri::command]
pub fn add_client(id: String, name: String, directory: String, version: String) {
    let config_path = path().join("config.json");

    let client = serde_json::json!({
        "id": id,
        "name": name,
        "directory": directory,
        "version": version,
        "mods": []
    });

    let json = serde_json::json!({"active": id, "clients": [&client]});

    if !config_path.exists() {
        File::create(&config_path).unwrap();
        std::fs::write(config_path, serde_json::to_string_pretty(&json).unwrap()).unwrap();
    } else {
        let mut clients = read_config();

        clients["clients"].as_array_mut().unwrap().push(client);
        std::fs::write(config_path, serde_json::to_string_pretty(&clients).unwrap()).unwrap();
    }
}

pub fn read_config() -> Value {
    // Unsure if this is the easiest solution, but it works.
    let mut file = File::open(path().join("config.json")).unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();

    serde_json::from_str(&contents).unwrap()
}

#[tauri::command]
pub fn set_active(id: String) -> bool {
    let config_path = path().join("config.json");

    if !config_path.exists() {
        false
    } else {
        let mut config = read_config();
        config["active"] = serde_json::json!(id);

        std::fs::write(config_path, serde_json::to_string_pretty(&config).unwrap()).unwrap();
        true
    }
}

#[tauri::command]
pub fn get_config() -> String {
    serde_json::to_string(&read_config()).unwrap()
}
