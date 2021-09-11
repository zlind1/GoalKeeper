import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import AppContext from '../AppContext';
import Goal from './Goal';
import api from '../util/api';

function GoalList() {
  const context = React.useContext(AppContext);
  const [goals, setGoals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newGoalInput, setNewGoalInput] = React.useState('');

  const reloadGoals = () => {
    if (goals.length === 0) setLoading(true);
    api.get('/goals', context.accessToken).then(response => {
      if (response.ok) {
        response.goals.sort((a, b) => {
          if (a.timestamp === b.timestamp) return 0;
          return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
        });
        setGoals(response.goals);
        setLoading(false);
      } else {
        context.refresh();
      }
    })
  }

  const updateNewGoalValue = (e) => {
    setNewGoalInput(e.target.value);
  }

  const openRefreshModal = () => {
    console.log('refreshModal')
    alert('Session expired. Refresh page');
  }

  const addGoal = async (e) => {
    e.preventDefault();
    if (newGoalInput === '') return;
    const newGoal = {
      title: newGoalInput,
      completed: false
    }
    const response = await api.post('/goals', newGoal, context.accessToken);
    if (response.ok) {
      reloadGoals();
      setNewGoalInput('');
    } else {
      await context.refresh();
      openRefreshModal();
    }
  }

  const updateGoal = async (goal) => {
    delete goal.username;
    const goalURL = `/goals/${goal.goal_id}`;
    const response = await api.put(goalURL, goal, context.accessToken);
    if (response.ok) {
      reloadGoals();
    } else {
      await context.refresh();
      openRefreshModal();
    }
  }

  const deleteGoal = async (goal_id) => {
    const goalURL = `/goals/${goal_id}`;
    const response = await api.delete(goalURL, context.accessToken);
    if (response.ok) {
      reloadGoals();
    } else {
      await context.refresh();
      openRefreshModal();
    }
  }

  React.useEffect(reloadGoals, [context, goals.length]);

  return (
    <ListGroup>
      {loading && (
        <ListGroup.Item>
          <p>Loading...</p>
        </ListGroup.Item>
      )}
      {(!loading && goals.length === 0) && (
        <ListGroup.Item>
          <p>No goals</p>
        </ListGroup.Item>
      )}
      {goals.map((goal, i) => (
        <ListGroup.Item key={i}>
          <Goal goal={goal} updateGoal={updateGoal} deleteGoal={deleteGoal}/>
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <Form onSubmit={addGoal}>
          <Form.Control placeholder='Add a new goal' value={newGoalInput}
            onChange={updateNewGoalValue}/>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default GoalList;
