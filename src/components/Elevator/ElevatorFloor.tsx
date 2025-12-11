import { memo } from "react";
import type { Floor } from "../../types/elevator.types";
import { ElevatorCar } from "./ElevatorCar";
import { CallButtons } from "./CallButtons";
import { ELEVATOR_CONFIG } from "../../constants/elevator.constants";

interface ElevatorFloorProps {
  floor: Floor;
  currentFloor: Floor;
  queue: Floor[];
  onRequestFloor: (floor: Floor) => void;
  status: string;
  moving: boolean;
}

export const ElevatorFloor = memo<ElevatorFloorProps>(
  ({ floor, currentFloor, queue, onRequestFloor, status, moving }) => {
    const isInQueue = queue.includes(floor);

    return (
      <div
        className="flex items-center gap-4 relative"
        data-testid={`floor-${floor}`}
      >
        {/* Floor number label */}
        <div className="w-12 text-right">
          <span className="text-slate-400 font-mono text-sm">F{floor}</span>
        </div>

        {/* Call buttons */}
        <CallButtons
          floor={floor}
          currentFloor={currentFloor}
          queue={queue}
          onRequestFloor={onRequestFloor}
          maxFloor={ELEVATOR_CONFIG.MAX_FLOOR}
          minFloor={ELEVATOR_CONFIG.MIN_FLOOR}
        />

        {/* Elevator shaft track */}
        <div className="relative w-24 h-20 bg-slate-900 rounded-lg border-2 border-slate-700 overflow-hidden">
          {/* Track lines */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-slate-700/50" />

          {/* Elevator car */}
          <ElevatorCar
            floor={floor}
            currentFloor={currentFloor}
            status={status as any}
            moving={moving}
          />
        </div>

        {/* Queue indicator */}
        <div className="w-8">
          {isInQueue && (
            <div
              className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/50"
              aria-label={`Floor ${floor} is in queue`}
            />
          )}
        </div>
      </div>
    );
  }
);

ElevatorFloor.displayName = 'ElevatorFloor';
