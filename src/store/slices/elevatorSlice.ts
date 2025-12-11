import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ElevatorState, Floor } from "../../types/elevator.types";
import { ELEVATOR_CONFIG } from "../../constants/elevator.constants";
import { ElevatorAlgorithm } from "../../services/elevatorAlgorithm";

const initialState: ElevatorState = {
  currentFloor: 0 as Floor,
  direction: null,
  queue: [],
  moving: false,
  status: 'idle',
  stopTimer: null,
};

const elevatorSlice = createSlice({
  name: 'elevator',
  initialState,
  reducers: {
    /**
     * Adds a floor request to the queue
     */
    addRequest(state, action: PayloadAction<Floor>) {
      const floor = action.payload;

      // Validate floor
      if (
        !ElevatorAlgorithm.isValidFloor(
          floor,
          ELEVATOR_CONFIG.MIN_FLOOR,
          ELEVATOR_CONFIG.MAX_FLOOR
        )
      ) {
        return;
      }

      // Ignore if already in queue or current floor
      if (state.queue.includes(floor) || floor === state.currentFloor) {
        return;
      }

      state.queue.push(floor);

      // Set initial direction if idle
      if (!state.direction) {
        state.direction = floor > state.currentFloor ? 'up' : 'down';
      }

      // Reorder queue based on current direction
      state.queue = ElevatorAlgorithm.reorderQueue(
        state.queue,
        state.currentFloor,
        state.direction
      );
    },

    /**
     * Moves elevator one step (called by interval)
     */
    step(state) {
      // Handle stopping state
      if (state.status === 'stop') {
        if (state.stopTimer && state.stopTimer > 0) {
          state.stopTimer -= 1;
          return;
        }

        // Stop finished
        state.status = 'moving';
        state.stopTimer = null;

        // Recalculate direction after stop
        if (state.queue.length === 0) {
          state.direction = null;
          state.moving = false;
          state.status = 'idle';
          return;
        }

        state.direction = ElevatorAlgorithm.calculateNextDirection(
          state.queue,
          state.currentFloor
        );
      }

      // If no direction or empty queue, go idle
      if (!state.direction || state.queue.length === 0) {
        state.moving = false;
        state.direction = null;
        state.status = 'idle';
        return;
      }

      state.moving = true;
      state.status = 'moving';

      // Check if should reverse direction
      if (
        ElevatorAlgorithm.shouldReverseDirection(
          state.queue,
          state.currentFloor,
          state.direction
        )
      ) {
        state.direction = state.direction === 'up' ? 'down' : 'up';
      }

      // Move elevator
      if (state.direction === 'up') {
        if (state.currentFloor < ELEVATOR_CONFIG.MAX_FLOOR) {
          state.currentFloor = (state.currentFloor + 1) as Floor;
        }
      } else if (state.direction === 'down') {
        if (state.currentFloor > ELEVATOR_CONFIG.MIN_FLOOR) {
          state.currentFloor = (state.currentFloor - 1) as Floor;
        }
      }

      // Check if current floor is a stop
      if (state.queue.includes(state.currentFloor)) {
        state.queue = state.queue.filter(f => f !== state.currentFloor);
        state.status = 'stop';
        state.stopTimer = ELEVATOR_CONFIG.STOP_DURATION_SECONDS;
        state.moving = false;
        return;
      }

      // Check if queue is empty after moving
      if (state.queue.length === 0) {
        state.direction = null;
        state.moving = false;
        state.status = 'idle';
      }
    },

    /**
     * Resets elevator to initial state
     */
    reset() {
      return initialState;
    },
  },
});

export const { addRequest, step, reset } = elevatorSlice.actions;
export default elevatorSlice.reducer;