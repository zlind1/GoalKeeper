import React from 'react';
import { Form } from 'react-bootstrap';

function Goal(props) {
  const {goal, toggleCompleted} = props;

  return (
    <div>
      <Form.Check checked={goal.completed} className='d-inline-block mx-2'
        onChange={() => toggleCompleted(goal.id)}/>
      <span className={goal.completed ? 'text-decoration-line-through' : ''}>
        {goal.name}
      </span>
    </div>
  );
}

export default Goal;
