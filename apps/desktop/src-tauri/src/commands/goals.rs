use tauri::State;

use crate::{
    error::CommandError,
    models::{DailyGoal, DailyGoalInput},
    store::WorktraceStore,
};

#[tauri::command]
pub fn list_daily_goals(store: State<'_, WorktraceStore>) -> Result<Vec<DailyGoal>, CommandError> {
    store.list_daily_goals().map_err(Into::into)
}

#[tauri::command]
pub fn create_daily_goal(
    store: State<'_, WorktraceStore>,
    input: DailyGoalInput,
) -> Result<DailyGoal, CommandError> {
    store.upsert_daily_goal(input).map_err(Into::into)
}

#[tauri::command]
pub fn delete_daily_goal(
    store: State<'_, WorktraceStore>,
    id: String,
) -> Result<(), CommandError> {
    store.delete_daily_goal(&id).map_err(Into::into)
}
