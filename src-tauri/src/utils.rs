use std::{
    fs::File,
    io::Read,
    path::{Path, PathBuf},
};

use tauri::api::http::{header, ClientBuilder, HttpRequestBuilder};

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
    path().join("config.json").exists()
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

    if !config_path.exists() {
        File::create(&config_path).unwrap();
        let json = serde_json::json!({"active": id, "clients": {id: client}});
        std::fs::write(config_path, serde_json::to_string_pretty(&json).unwrap()).unwrap();
    } else {
        let mut clients = read_config();

        clients["clients"]
            .as_object_mut()
            .unwrap()
            .insert(id, client);
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

#[tauri::command]
pub async fn install_mod(mod_id: String, client_id: String) -> bool {
    let config_path = path().join("config.json");
    let mut config = read_config();

    let client = ClientBuilder::new().build().unwrap();

    let response = client.send(
        HttpRequestBuilder::new("GET", "https://abstractive.jacksta.workers.dev/v1/mods").unwrap(),
    );

    let response = response.await.unwrap().read().await.unwrap();

    let json: Value = serde_json::from_str(&response.data.to_string()).unwrap();

    // check if exists
    if !json["mods"][&mod_id].is_null() {
        return false;
    }

    let mod_json = json
        .as_array()
        .unwrap()
        .iter()
        .find(|mod_json| mod_json["id"] == mod_id)
        .unwrap();

    let local_mod_json = serde_json::json!({
        "id": mod_json["id"],
        "version": mod_json["version"],
        "files": mod_json["file"],
    });

    config["clients"][client_id]["mods"]
        .as_array_mut()
        .unwrap()
        .push(local_mod_json);

    std::fs::write(config_path, serde_json::to_string_pretty(&config).unwrap()).unwrap();

    true
}

#[tauri::command]
pub async fn uninstall_mod(mod_id: String, client_id: String) -> bool {
    let config_path = path().join("config.json");
    let mut config = read_config();

    config["clients"][&client_id]["mods"]
        .as_array_mut()
        .unwrap();

    let mod_index = config["clients"][&client_id]["mods"]
        .as_array()
        .unwrap()
        .iter()
        .position(|mod_json| mod_json["id"] == mod_id)
        .unwrap();

    config["clients"][&client_id]["mods"]
        .as_array_mut()
        .unwrap()
        .remove(mod_index);

    std::fs::write(config_path, serde_json::to_string_pretty(&config).unwrap()).unwrap();

    true
}

#[tauri::command]
pub async fn get_mods() -> String {
    let client = ClientBuilder::new().build().unwrap();

    let response = client.send(
        HttpRequestBuilder::new("GET", "https://abstractive.jacksta.workers.dev/v1/mods").unwrap(),
    );

    let response = response.await.unwrap().read().await.unwrap();

    response.data.to_string()
}
