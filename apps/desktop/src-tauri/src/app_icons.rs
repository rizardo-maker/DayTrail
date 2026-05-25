/// App icon extraction for macOS.
///
/// Given an app's display name we locate its `.app` bundle, pull the primary
/// `.icns` resource, convert it to a 64×64 PNG with `sips`, and cache the
/// result in the OS temp directory so subsequent calls are instant.
///
/// Returns a `data:image/png;base64,...` URL suitable for use in an <img> src
/// attribute directly from the WebView without needing the Tauri asset protocol.
use std::{
    collections::HashMap,
    path::{Path, PathBuf},
    process::Command,
    sync::{Mutex, OnceLock},
};

use base64::{engine::general_purpose::STANDARD as BASE64, Engine as _};

// ── In-memory cache: app_name → data URL (or empty string = extraction failed) ──

static ICON_CACHE: OnceLock<Mutex<HashMap<String, String>>> = OnceLock::new();

fn icon_cache() -> &'static Mutex<HashMap<String, String>> {
    ICON_CACHE.get_or_init(|| Mutex::new(HashMap::new()))
}

/// Canonical `.app` bundle folder names for apps whose `localizedName` / process
/// name differs from their bundle file name.
fn canonical_bundle_folder(app_name: &str) -> &str {
    match app_name {
        "Visual Studio Code" | "Code" => "Visual Studio Code",
        "VS Code Insiders" | "Code - Insiders" => "Visual Studio Code - Insiders",
        "Cursor" => "Cursor",
        "Google Chrome" => "Google Chrome",
        "Brave Browser" => "Brave Browser",
        "Microsoft Edge" => "Microsoft Edge",
        "zoom.us" | "Zoom" => "zoom.us",
        "iTerm2" => "iTerm2",
        other => other,
    }
}

/// Search common macOS app installation locations for `<bundle_folder>.app`.
#[cfg(target_os = "macos")]
fn find_app_bundle(app_name: &str) -> Option<PathBuf> {
    let folder = canonical_bundle_folder(app_name);
    let filename = format!("{}.app", folder);

    let search_dirs: Vec<PathBuf> = [
        Some(PathBuf::from("/Applications")),
        Some(PathBuf::from("/System/Applications")),
        Some(PathBuf::from("/System/Applications/Utilities")),
        dirs::home_dir().map(|h| h.join("Applications")),
    ]
    .into_iter()
    .flatten()
    .collect();

    for dir in &search_dirs {
        let candidate = dir.join(&filename);
        if candidate.exists() {
            return Some(candidate);
        }
    }

    // Spotlight fallback — handles non-standard install locations.
    let output = Command::new("mdfind")
        .args([
            &format!("kMDItemContentType == 'com.apple.application-bundle' && kMDItemFSName == '{}'", filename),
        ])
        .output()
        .ok()?;

    String::from_utf8_lossy(&output.stdout)
        .lines()
        .find(|line| !line.trim().is_empty())
        .map(PathBuf::from)
}

/// Read `CFBundleIconFile` from `<bundle>/Contents/Info.plist` and return the
/// full path to the `.icns` file.
#[cfg(target_os = "macos")]
fn icns_path_in_bundle(bundle: &Path) -> Option<PathBuf> {
    let plist = bundle.join("Contents/Info.plist");
    if !plist.exists() {
        return None;
    }

    // `defaults read <plist> CFBundleIconFile` is the simplest way to read one key.
    let output = Command::new("defaults")
        .arg("read")
        .arg(&plist)
        .arg("CFBundleIconFile")
        .output()
        .ok()?;

    if !output.status.success() {
        return None;
    }

    let mut icon_name = String::from_utf8_lossy(&output.stdout).trim().to_string();
    if icon_name.is_empty() {
        return None;
    }
    if !icon_name.ends_with(".icns") {
        icon_name.push_str(".icns");
    }

    let path = bundle.join("Contents/Resources").join(&icon_name);
    path.exists().then_some(path)
}

/// Convert an `.icns` file to a 64×64 PNG at `out_path` using `sips`.
#[cfg(target_os = "macos")]
fn icns_to_png(icns: &Path, out_path: &Path) -> bool {
    Command::new("sips")
        .args([
            "-s",
            "format",
            "png",
            &icns.to_string_lossy(),
            "--out",
            &out_path.to_string_lossy(),
            "--resampleHeightWidth",
            "64",
            "64",
        ])
        .output()
        .map(|o| o.status.success())
        .unwrap_or(false)
}

/// Return a `data:image/png;base64,...` URL for the given app, or `None` if the
/// icon cannot be extracted.
#[cfg(target_os = "macos")]
pub fn app_icon_data_url(app_name: &str) -> Option<String> {
    {
        let cache = icon_cache().lock().ok()?;
        if let Some(cached) = cache.get(app_name) {
            return if cached.is_empty() { None } else { Some(cached.clone()) };
        }
    }

    let result = extract_icon(app_name);

    // Store result (empty string = failed, so we don't retry every call).
    if let Ok(mut cache) = icon_cache().lock() {
        cache.insert(app_name.to_string(), result.clone().unwrap_or_default());
    }

    result
}

#[cfg(target_os = "macos")]
fn extract_icon(app_name: &str) -> Option<String> {
    let bundle = find_app_bundle(app_name)?;
    let icns = icns_path_in_bundle(&bundle)?;

    // Write PNG to a temp file.
    let safe_name: String = app_name
        .chars()
        .map(|c| if c.is_alphanumeric() || c == '-' { c } else { '_' })
        .collect();
    let out_path = std::env::temp_dir().join(format!("daytrail_icon_{}.png", safe_name));

    if !out_path.exists() && !icns_to_png(&icns, &out_path) {
        return None;
    }

    let bytes = std::fs::read(&out_path).ok()?;
    let encoded = BASE64.encode(&bytes);
    Some(format!("data:image/png;base64,{}", encoded))
}

#[cfg(not(target_os = "macos"))]
pub fn app_icon_data_url(_app_name: &str) -> Option<String> {
    None
}
