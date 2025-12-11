export type Floor = 0 | 1 | 2 | 3 | 4 | 5;
export type Direction = 'up' | 'down' | null;
export type ElevatorStatus = 'idle' | 'moving' | 'stop';

export interface ElevatorState {
  currentFloor: Floor;
  direction: Direction;
  queue: Floor[];
  moving: boolean;
  status: ElevatorStatus;
  stopTimer: number | null;
}

export interface ElevatorConfig {
  readonly FLOORS: readonly Floor[];
  readonly MIN_FLOOR: Floor;
  readonly MAX_FLOOR: Floor;
  readonly MOVE_INTERVAL_MS: number;
  readonly STOP_DURATION_SECONDS: number;
}
