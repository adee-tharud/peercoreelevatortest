import type { Floor, Direction, ElevatorStatus} from "../../types/elevator.types";

interface StatusDisplayProps {
  currentFloor: Floor;
  direction: Direction;
  status: ElevatorStatus;
  moving: boolean;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  currentFloor,
  direction,
  status,
  moving,
}) => {
  const getDirectionDisplay = (): string => {
    if (direction === 'up') return '↑ UP';
    if (direction === 'down') return '↓ DOWN';
    return '—';
  };

  const getStatusStyle = (): string => {
    if (status === 'stop') return 'bg-amber-500/20 text-amber-400';
    if (moving) return 'bg-emerald-500/20 text-emerald-400';
    return 'bg-slate-700 text-slate-400';
  };

  const getStatusText = (): string => {
    if (status === 'stop') return 'STOPPING';
    if (moving) return 'MOVING';
    return 'IDLE';
  };

  return (
    <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm">Current Floor</span>
        <span className="text-2xl font-bold text-white">{currentFloor}</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm">Direction</span>
        <span className="text-white font-mono">{getDirectionDisplay()}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">Status</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusStyle()}`}>
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};