import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import AppContext from '../AppContext';
import Goal from './Goal';
import api from '../util/api';

function GoalList() {
  const context = React.useContext(AppContext);
  const [goals, setGoals] = React.useState([]);
  const newGoalInput = React.createRef();

  const reloadGoals = async () => {
    const response = await api.get('/goals', context.accessToken);
    console.log(response);
    setGoals(response.goals);
  }

  const addGoal = async (e) => {
    e.preventDefault();
    const newGoal = {
      title: newGoalInput.current.value,
      completed: false
    }
    await api.post('/goals', newGoal, context.accessToken);
    reloadGoals();
    newGoalInput.current.value = '';
  }

  const updateGoal = async (goal) => {
    delete goal.username;
    await api.put('/goals', goal, context.accessToken);
    reloadGoals();
  }

  React.useEffect(() => {
    reloadGoals();
  }, []);

  return (
    <ListGroup>
      {goals.map((goal, i) => (
        <ListGroup.Item key={i}>
          <Goal goal={goal} updateGoal={updateGoal}/>
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <Form onSubmit={addGoal}>
          <Form.Control placeholder='Add a new goal' ref={newGoalInput}/>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default GoalList;
