import { store } from "../store";
import { step } from "../store/slices/elevatorSlice";
import { ELEVATOR_CONFIG } from "../constants/elevator.constants";

let timerId: number | null = null;

function shouldRun(): boolean {
  const state = store.getState();
  // Only run stepping when there's an active direction (up/down)
  return !!state.elevator.direction;
}

function tick() {
  
  if (shouldRun()) {
    store.dispatch(step());
  }
}

export function startElevatorController(): void {
  if (timerId != null) return; // already started
  
  timerId = window.setInterval(tick, ELEVATOR_CONFIG.MOVE_INTERVAL_MS);
}

export function stopElevatorController(): void {
  if (timerId == null) return;
  clearInterval(timerId);
  timerId = null;
}