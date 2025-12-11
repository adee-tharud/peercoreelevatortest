import { useElevator } from "../../hooks/useElevator";
import { ElevatorFloor } from "./ElevatorFloor";
import { ControlPanel } from "./ControlPanel";

export const Elevator: React.FC = () => {
  const {
    currentFloor,
    direction,
    queue,
    moving,
    status,
    floors,
    requestFloor,
    resetElevator,
  } = useElevator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Elevator Simulator
          </h1>
          <p className="text-slate-400">
            Click floor buttons to call the elevator
          </p>
        </div>

        <div className="flex gap-8 items-start justify-center flex-wrap lg:flex-nowrap">
          {/* Elevator Shaft */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <div className="flex flex-col-reverse gap-3">
              {floors.map(floor => (
                <ElevatorFloor
                  key={floor}
                  floor={floor}
                  currentFloor={currentFloor}
                  queue={queue}
                  onRequestFloor={requestFloor}
                  status={status}
                  moving={moving}
                />
              ))}
            </div>
          </div>

          {/* Control Panel */}
          <ControlPanel
            floors={floors}
            currentFloor={currentFloor}
            queue={queue}
            direction={direction}
            status={status}
            moving={moving}
            onRequestFloor={requestFloor}
            onReset={resetElevator}
          />
        </div>
      </div>
    </div>
  );
};