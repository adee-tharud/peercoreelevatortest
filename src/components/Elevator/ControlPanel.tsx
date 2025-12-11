import type { Floor } from "../../types/elevator.types";
import { ELEVATOR_STYLES } from "../../constants/elevator.constants";
import { StatusDisplay } from "./StatusDisplay";

interface ControlPanelProps {
  floors: readonly Floor[];
  currentFloor: Floor;
  queue: Floor[];
  direction: string | null;
  status: string;
  moving: boolean;
  onRequestFloor: (floor: Floor) => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  floors,
  currentFloor,
  queue,
  direction,
  status,
  moving,
  onRequestFloor,
  onReset,
}) => {
  const getButtonStyle = (floor: Floor): string => {
    if (currentFloor === floor) return ELEVATOR_STYLES.button.active;
    if (queue.includes(floor)) return ELEVATOR_STYLES.button.queued;
    return ELEVATOR_STYLES.button.default;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-2xl w-64">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Control Panel</h2>
        <button
          onClick={onReset}
          className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
          aria-label="Reset elevator"
        >
          Reset
        </button>
      </div>

      {/* Status Display */}
      <StatusDisplay
        currentFloor={currentFloor}
        direction={direction as any}
        status={status as any}
        moving={moving}
      />

      {/* Floor buttons */}
      <div className="space-y-2">
        <p className="text-slate-400 text-sm mb-3">Select Floor</p>
        {[...floors].reverse().map(floor => (
          <button
            key={floor}
            className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${getButtonStyle(
              floor
            )}`}
            onClick={() => onRequestFloor(floor)}
            aria-label={`Request floor ${floor}`}
            aria-pressed={currentFloor === floor || queue.includes(floor)}
          >
            Floor {floor}
          </button>
        ))}
      </div>

      {/* Queue Display */}
      {queue.length > 0 && (
        <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm mb-2">Next Stops</p>
          <div className="flex gap-2 flex-wrap">
            {queue.map((floor, index) => (
              <span
                key={`${floor}-${index}`}
                className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-mono"
              >
                {floor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
