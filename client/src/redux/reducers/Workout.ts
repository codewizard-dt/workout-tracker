import { WORKOUT } from "redux/actions"
import { Reducer } from "redux";
import { Workout, WorkoutSequence } from '../../../../models/Workout';
import { Exercise } from '../../api/ExerciseDB';
import _ from 'lodash'

interface WorkoutsState {
  current: Workout,
  sequence: WorkoutSequence
  exercise: Exercise | null
  history: Workout[]
  isSearching: boolean
  saveEventSuccess: boolean
}
const initial: WorkoutsState = {
  current: {
    datetime: {},
    sequenceList: []
  },
  isSearching: false,
  exercise: null,
  sequence: [],
  history: [],
  saveEventSuccess: false
}

const WorkoutReducer: Reducer<WorkoutsState> = (state = initial, { type, payload = {} }) => {
  const { current, sequence, isSearching, history } = state;
  const { datetime, sequenceList } = current;
  switch (type) {
    case WORKOUT.FETCH_HISTORY:
      return { ...state, history: payload }
    case WORKOUT.SET_START:
      return { ...state, current: { ...current, datetime: { ...datetime, start: payload } } }
    case WORKOUT.SET_END:
      return { ...state, current: { ...current, datetime: { ...datetime, end: payload } } }
    case WORKOUT.CLEAR_START:
      return { ...state, current: { ...current, datetime: { ...datetime, start: undefined } } }
    case WORKOUT.CLEAR_END:
      return { ...state, current: { ...current, datetime: { ...datetime, end: undefined } } }
    case WORKOUT.SELECT_EXERCISE:
      return { ...state, exercise: payload, isSearching: false }
    case WORKOUT.TOGGLE_EXERCISE_SEARCH:
      return { ...state, isSearching: !isSearching }
    case WORKOUT.ADD_TO_SEQUENCE:
      return { ...state, sequence: [...sequence, payload] }
    case WORKOUT.ADD_SEQUENCE_TO_WORKOUT:
      return {
        ...state,
        sequence: [],
        current: {
          ...current,
          sequenceList: [...sequenceList, payload],
        },
        exercise: null
      }
    case WORKOUT.SELECT_WORKOUT:
      return {
        ...state, current: payload
      }
    case WORKOUT.DELETE_WORKOUT:
      return { ...state, history: [...history].filter(workout => workout._id !== payload) };
    case WORKOUT.SAVE_WORKOUT:
      const newHistory = [...history];
      let i = _.findIndex(newHistory, (workout) => workout._id === payload._id);
      if (i > -1) newHistory.splice(i, 1, payload);
      else newHistory.push(payload);
      return { ...state, history: newHistory, saveEventSuccess: true };
    case WORKOUT.RESET_SAVE_EVENT:
      return { ...state, saveEventSuccess: false }
    default:
      return state;
  }
}

export default WorkoutReducer;