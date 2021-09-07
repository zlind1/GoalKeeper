import React from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import AppContext from '../AppContext';
import Goal from './Goal';

function GoalList() {
  const context = React.useContext(AppContext);
  const [goals, setGoals] = React.useState([]);
  const newGoal = React.createRef();

  const addGoal = (e) => {
    e.preventDefault();
    const newGoalList = [...goals];
    newGoalList.push({
      id: newGoalList.length,
      name: newGoal.current.value,
      completed: false
    });
    setGoals(newGoalList);
    newGoal.current.value = '';
  }

  const toggleCompleted = (goalID) => {
    const newGoalList = [...goals];
    for (const goal of newGoalList) {
      if (goal.id === goalID) {
        goal.completed = !goal.completed;
        break;
      }
    }
    setGoals(newGoalList);
  }

  return (
    <ListGroup>
      {goals.map((goal, i) => (
        <ListGroup.Item key={i}>
          <Goal goal={goal} toggleCompleted={toggleCompleted}/>
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <Form onSubmit={addGoal}>
          <Form.Control placeholder='Add a new goal' ref={newGoal}/>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default GoalList;
