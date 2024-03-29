import { Exercise } from './Exercise';

interface BasicInfo {
  exercise: Exercise,
  weight?: number
  weightAssist?: number
  barWeight?: number
}

export interface WorkoutSet extends BasicInfo {
  reps: number;
}
export interface WorkoutInterval extends BasicInfo {
  duration: number;
  speed?: number
  distance?: number
  incline?: number
  verticalRise?: number
  calories?: number
}
export type WorkoutSequence = (WorkoutSet & WorkoutInterval)[];

export type WorkoutSequenceList = WorkoutSequence[];

export interface Workout {
  _id?: string,
  user?: string
  datetime: {
    start?: number;
    end?: number;
  }
  sequenceList: WorkoutSequenceList
}

