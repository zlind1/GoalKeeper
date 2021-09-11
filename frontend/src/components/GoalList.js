import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import AppContext from '../AppContext';
import Goal from './Goal';
import api from '../util/api';

function GoalList() {
  const context = React.useContext(AppContext);
  const [goals, setGoals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshToggle, setRefreshToggle] = React.useState(false);
  const [needsReload, setNeedsReload] = React.useState(false);
  const [needsAdd, setNeedsAdd] = React.useState(false);
  const [needsUpdate, setNeedsUpdate] = React.useState(false);
  const [needsDelete, setNeedsDelete] = React.useState(false);
  const [newGoalInput, setNewGoalInput] = React.useState('');
  const [goalToUpdate, setGoalToUpdate] = React.useState(null);
  const [goalToDelete, setGoalToDelete] = React.useState(null);

  const reloadGoals = async () => {
    if (goals.length === 0) setLoading(true);
    const response = await api.get('/goals', context.accessToken);
    if (response.ok) {
      setGoals(response.goals);
    } else {
      await context.refresh();
      setNeedsReload(true);
      setRefreshToggle(!refreshToggle);
    }
    setLoading(false);
  }

  const updateNewGoalValue = (e) => {
    setNewGoalInput(e.target.value);
  }

  const addGoal = async (e) => {
    if (e !== undefined) {
      e.preventDefault();
      if (newGoalInput === '') return;
    }
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
      setNeedsAdd(true);
      setRefreshToggle(!refreshToggle);
    }
  }

  const updateGoal = async (goal) => {
    if (goal !== undefined) {
      delete goal.username;
      await setGoalToUpdate(goal);
      return;
    }
    if (goalToUpdate === null) return;
    const goalURL = `/goals/${goalToUpdate.goal_id}`;
    const response = await api.put(goalURL, goalToUpdate, context.accessToken);
    if (response.ok) {
      reloadGoals();
    } else {
      await context.refresh();
      setNeedsUpdate(true);
      setRefreshToggle(!refreshToggle);
    }
  }

  const deleteGoal = async (goal) => {
    if (goal !== undefined) {
      await setGoalToDelete(goal);
      return;
    }
    if (goalToDelete === null) return;
    const goalURL = `/goals/${goalToDelete}`;
    const response = await api.delete(goalURL, context.accessToken);
    if (response.ok) {
      reloadGoals();
    } else {
      await context.refresh();
      setNeedsDelete(true);
      setRefreshToggle(!refreshToggle);
    }
  }

  React.useEffect(() => {
    if (needsReload) {
      reloadGoals();
      setNeedsReload(false);
    }
    if (needsAdd) {
      addGoal();
      setNeedsAdd(false);
    }
    if (needsUpdate) {
      updateGoal();
      setNeedsUpdate(false);
    }
    if (needsDelete) {
      deleteGoal();
      setNeedsDelete(false);
    }
  }, [refreshToggle]);

  React.useEffect(() => {
    reloadGoals();
  }, []);

  React.useEffect(() => {
    updateGoal();
  }, [goalToUpdate]);

  React.useEffect(() => {
    deleteGoal();
  }, [goalToDelete]);

  return (
    <ListGroup>
      {loading && (
        <ListGroup.Item>
          <p>Loading...</p>
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
