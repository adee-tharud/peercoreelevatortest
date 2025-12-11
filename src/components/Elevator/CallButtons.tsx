import type { Floor } from "../../types/elevator.types";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

interface CallButtonsProps {
  floor: Floor;
  currentFloor: Floor;
  queue: Floor[];
  onRequestFloor: (floor: Floor) => void;
  maxFloor: Floor;
  minFloor: Floor;
}

export const CallButtons: React.FC<CallButtonsProps> = ({
  floor,
  currentFloor,
  queue,
  onRequestFloor,
  maxFloor,
  minFloor,
}) => {
  const isUpActive = queue.includes(floor) && floor > currentFloor;
  const isDownActive = queue.includes(floor) && floor < currentFloor;

  return (
    <div className="flex flex-col gap-1">
      {floor < maxFloor && (
        <button
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
            ${
              isUpActive
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          onClick={() => onRequestFloor(floor)}
          aria-label={`Call elevator up from floor ${floor}`}
          aria-pressed={isUpActive}
        >
          <span className="text-lg"><ArrowBigUp/></span>
        </button>
      )}
      {floor > minFloor && (
        <button
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
            ${
              isDownActive
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          onClick={() => onRequestFloor(floor)}
          aria-label={`Call elevator down from floor ${floor}`}
          aria-pressed={isDownActive}
        >
          <span className="text-lg"><ArrowBigDown/></span>
        </button>
      )}
    </div>
  );
};
