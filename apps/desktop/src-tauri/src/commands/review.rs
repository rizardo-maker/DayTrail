use tauri::State;

use crate::{
    error::CommandError,
    models::{ReviewSessionInput, WorkSessionSummary},
    store::WorktraceStore,
};

#[tauri::command]
pub fn review_session(
    store: State<'_, WorktraceStore>,
    input: ReviewSessionInput,
) -> Result<WorkSessionSummary, CommandError> {
    store.review_session(input).map_err(Into::into)
}

#[tauri::command]
pub fn list_sessions_for_review(
    store: State<'_, WorktraceStore>,
    from_date: Option<String>,
    to_date: Option<String>,
) -> Result<Vec<WorkSessionSummary>, CommandError> {
    store
        .list_sessions_for_review(from_date.as_deref(), to_date.as_deref())
        .map_err(Into::into)
}

#[tauri::command]
pub fn export_timesheet_markdown(
    store: State<'_, WorktraceStore>,
    from_date: Option<String>,
    to_date: Option<String>,
) -> Result<String, CommandError> {
    store
        .export_timesheet_markdown(from_date.as_deref(), to_date.as_deref())
        .map_err(Into::into)
}
