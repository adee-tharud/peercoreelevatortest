import type { Floor, ElevatorStatus } from "../../types/elevator.types";
import { ELEVATOR_STYLES } from "../../constants/elevator.constants";

interface ElevatorCarProps {
  floor: Floor;
  currentFloor: Floor;
  status: ElevatorStatus;
  moving: boolean;
}

export const ElevatorCar: React.FC<ElevatorCarProps> = ({
  floor,
  currentFloor,
  status,
  moving,
}) => {
  if (currentFloor !== floor) return null;

  const getCarStyle = (): string => {
    if (status === 'stop') return ELEVATOR_STYLES.status.stopping;
    if (moving) return ELEVATOR_STYLES.status.moving;
    return ELEVATOR_STYLES.status.idle;
  };

  return (
    <div
      className={`absolute inset-2 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 ${getCarStyle()}`}
      role="status"
      aria-live="polite"
      aria-label={`Elevator is at floor ${floor}, ${status}`}
    >
      <span className="text-white">{floor}</span>
    </div>
  );
};