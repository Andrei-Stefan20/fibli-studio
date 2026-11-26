use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RuntimeInfo {
    core_version: &'static str,
    os: &'static str,
}

#[tauri::command]
pub fn get_runtime_info() -> RuntimeInfo {
    RuntimeInfo {
        core_version: fibli_core::version(),
        os: std::env::consts::OS,
    }
}
