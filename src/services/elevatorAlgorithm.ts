import type { Direction, Floor } from "../types/elevator.types";

export class ElevatorAlgorithm {
  
   // Reorders queue based on current direction (SCAN algorithm)
   
  static reorderQueue(
    queue: Floor[],
    currentFloor: Floor,
    direction: Direction
  ): Floor[] {
    if (direction === 'up') {
      return [
        ...queue.filter(f => f > currentFloor).sort((a, b) => a - b),
        ...queue.filter(f => f < currentFloor).sort((a, b) => b - a),
      ];
    }

    if (direction === 'down') {
      return [
        ...queue.filter(f => f < currentFloor).sort((a, b) => b - a),
        ...queue.filter(f => f > currentFloor).sort((a, b) => a - b),
      ];
    }

    return queue;
  }

  
  //  Checks if elevator should reverse direction
   
  static shouldReverseDirection(
    queue: Floor[],
    currentFloor: Floor,
    direction: Direction
  ): boolean {
    if (!direction) return false;

    const hasFloorsInDirection =
      direction === 'up'
        ? queue.some(f => f > currentFloor)
        : queue.some(f => f < currentFloor);

    return !hasFloorsInDirection;
  }

  
   // Calculates next direction based on queue
   
  static calculateNextDirection(
    queue: Floor[],
    currentFloor: Floor
  ): Direction {
    if (queue.length === 0) return null;

    const nextFloor = queue[0];
    return nextFloor > currentFloor ? 'up' : 'down';
  }

  
   // Validates if floor is within bounds
   
  static isValidFloor(floor: number, minFloor: Floor, maxFloor: Floor): boolean {
    return floor >= minFloor && floor <= maxFloor;
  }
}