import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { addRequest, step, reset } from "../store/slices/elevatorSlice";
import { ELEVATOR_CONFIG } from "../constants/elevator.constants";
import type { Floor } from "../types/elevator.types";

export const useElevator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const elevator = useSelector((state: RootState) => state.elevator);

  // Auto-step elevator based on direction
  useEffect(() => {
    if (!elevator.direction) return;

    const timer = setInterval(() => {
      dispatch(step());
    }, ELEVATOR_CONFIG.MOVE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [elevator.direction, dispatch]);

  const requestFloor = useCallback(
    (floor: Floor) => {
      dispatch(addRequest(floor));
    },
    [dispatch]
  );

  const resetElevator = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    ...elevator,
    requestFloor,
    resetElevator,
    floors: ELEVATOR_CONFIG.FLOORS,
  };
};