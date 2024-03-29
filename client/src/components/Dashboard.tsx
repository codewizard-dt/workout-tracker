import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../redux/store'
import { Card, Header, Segment } from 'semantic-ui-react';
import { ButtonLink } from './nav/ButtonLink';
import { v4 as uuid } from "uuid";
// import _ from 'lodash';
import { Workout } from '../models/Workout';
import ChunkCardList from './utils/ChunkCardList';
import WorkoutListCard from './workouts/WorkoutListCard';
import { fetchWorkoutHistory, selectWorkout } from '../redux/actions/workout';
import ShowSequence from './workouts/ShowSequence';
// import AppIconButton from './utils/AppIconButton';

const mapStateToProps = ({ workout, auth }: RootState) => ({
  history: workout.history,
  auth,
  currentWorkout: workout.current
})
const mapDispatchToProps = { fetchWorkoutHistory, selectWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface DashboardProps extends PropsFromRedux { }

const Dashboard = ({ history, auth, currentWorkout, selectWorkout, fetchWorkoutHistory }: DashboardProps) => {
  useEffect(() => {
    fetchWorkoutHistory()
  }, [auth.authenticated, auth.id, fetchWorkoutHistory])
  const renderWorkoutListCard = (workout: Workout): JSX.Element => <WorkoutListCard active={workout._id === currentWorkout._id}
    key={workout._id} workout={workout} onClickHandler={() => { if (workout._id !== currentWorkout._id) selectWorkout(workout) }}
    details={workout.sequenceList.length
      ? <React.Fragment>
        {workout.sequenceList.map((sequence, s) => <ShowSequence key={uuid()} index={s} compact sequence={sequence} />)}
      </React.Fragment>
      : <Card fluid content="No sets or intervals" />}
  />
  return (
    <React.Fragment>
      <ButtonLink fluid to="/dashboard/workout/new" content="Start New Workout" color="green" />
      <Segment className='workout history'>
        <Header content="Workout History" />
        <ChunkCardList className='workout card' chunkSize={6} list={history} renderCard={renderWorkoutListCard} emptyMessage="No saved workouts" />
      </Segment>
    </React.Fragment>
  )
}

export default connector(Dashboard)