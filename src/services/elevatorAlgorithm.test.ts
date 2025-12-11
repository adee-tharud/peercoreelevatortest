import { describe, it, expect } from 'vitest';
import { ElevatorAlgorithm } from './elevatorAlgorithm';
import type { Floor } from '../types/elevator.types';

describe('ElevatorAlgorithm', () => {
    describe('reorderQueue', () => {
        it('should prioritize higher floors in ascending order when moving up', () => {
            const queue: Floor[] = [5, 2, 4, 1];
            const currentFloor: Floor = 3;
            // Expect floors > 3 (4, 5) sorted asc, then floors < 3 (2, 1) sorted desc
            // So: [4, 5, 2, 1]
            const result = ElevatorAlgorithm.reorderQueue(queue, currentFloor, 'up');
            expect(result).toEqual([4, 5, 2, 1]);
        });

        it('should prioritize lower floors in descending order when moving down', () => {
            const queue: Floor[] = [5, 2, 4, 1];
            const currentFloor: Floor = 3;
            // Expect floors < 3 (2, 1) sorted desc, then floors > 3 (4, 5) sorted asc
            // So: [2, 1, 4, 5]
            const result = ElevatorAlgorithm.reorderQueue(queue, currentFloor, 'down');
            expect(result).toEqual([2, 1, 4, 5]);
        });

        it('should return the original queue if direction is null', () => {
            const queue: Floor[] = [2, 5, 1];
            const currentFloor: Floor = 3;
            const result = ElevatorAlgorithm.reorderQueue(queue, currentFloor, null);
            expect(result).toEqual(queue);
        });
    });

    describe('shouldReverseDirection', () => {
        it('should return true if moving up and no higher floors in queue', () => {
            const queue: Floor[] = [1, 2];
            const currentFloor: Floor = 3;
            const result = ElevatorAlgorithm.shouldReverseDirection(queue, currentFloor, 'up');
            expect(result).toBe(true);
        });

        it('should return false if moving up and there are higher floors', () => {
            const queue: Floor[] = [1, 5];
            const currentFloor: Floor = 3;
            const result = ElevatorAlgorithm.shouldReverseDirection(queue, currentFloor, 'up');
            expect(result).toBe(false);
        });

        it('should return true if moving down and no lower floors in queue', () => {
            const queue: Floor[] = [4, 5];
            const currentFloor: Floor = 3;
            const result = ElevatorAlgorithm.shouldReverseDirection(queue, currentFloor, 'down');
            expect(result).toBe(true);
        });

        it('should return false if moving down and there are lower floors', () => {
            const queue: Floor[] = [1, 5];
            const currentFloor: Floor = 3;
            const result = ElevatorAlgorithm.shouldReverseDirection(queue, currentFloor, 'down');
            expect(result).toBe(false);
        });

        it('should return false if direction is null', () => {
            const queue: Floor[] = [1, 5];
            const currentFloor: Floor = 3;
            const result = ElevatorAlgorithm.shouldReverseDirection(queue, currentFloor, null);
            expect(result).toBe(false);
        });
    });

    describe('calculateNextDirection', () => {
        it('should return null if queue is empty', () => {
            const result = ElevatorAlgorithm.calculateNextDirection([], 0);
            expect(result).toBeNull();
        });

        it('should return "up" if next floor is higher', () => {
            const result = ElevatorAlgorithm.calculateNextDirection([5], 2);
            expect(result).toBe('up');
        });

        it('should return "down" if next floor is lower', () => {
            const result = ElevatorAlgorithm.calculateNextDirection([1], 2);
            expect(result).toBe('down');
        });
    });

    describe('isValidFloor', () => {
        it('should return true for valid floors', () => {
            expect(ElevatorAlgorithm.isValidFloor(0, 0, 5)).toBe(true);
            expect(ElevatorAlgorithm.isValidFloor(5, 0, 5)).toBe(true);
            expect(ElevatorAlgorithm.isValidFloor(3, 0, 5)).toBe(true);
        });

        it('should return false for invalid floors', () => {
            expect(ElevatorAlgorithm.isValidFloor(-1, 0, 5)).toBe(false);
            expect(ElevatorAlgorithm.isValidFloor(6, 0, 5)).toBe(false);
        });
    });
});
