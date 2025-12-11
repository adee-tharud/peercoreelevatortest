import type { ElevatorConfig, Floor } from "../types/elevator.types";

export const ELEVATOR_CONFIG: ElevatorConfig = {
  FLOORS: [0, 1, 2, 3, 4, 5] as const,
  MIN_FLOOR: 0 as Floor,
  MAX_FLOOR: 5 as Floor,
  MOVE_INTERVAL_MS: 1500,
  STOP_DURATION_SECONDS: 1,
} as const;

export const ELEVATOR_STYLES = {
  status: {
    idle: 'bg-slate-600',
    moving: 'bg-emerald-500 shadow-lg shadow-emerald-500/50',
    stopping: 'bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse',
  },
  button: {
    default: 'bg-slate-700 text-slate-400 hover:bg-slate-600',
    active: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50',
    queued: 'bg-amber-500 text-white shadow-lg shadow-amber-500/50',
  },
} as const;