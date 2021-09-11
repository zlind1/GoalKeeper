import React from 'react';
import { Form } from 'react-bootstrap';

function Goal(props) {
  const {goal, updateGoal, deleteGoal} = props;

  const toggleCompleted = () => {
    goal.completed = !goal.completed;
    updateGoal(goal);
  }

  const deleteGoalFn = () => {
    deleteGoal(goal.goal_id);
  }

  return (
    <div className='d-flex justify-content-between'>
      <div>
        <Form.Check checked={goal.completed} className='d-inline-block mx-2'
          onChange={toggleCompleted}/>
        <span className={goal.completed ? 'text-decoration-line-through' : ''}>
          {goal.title}
        </span>
      </div>
      <div>
        <button className='btn-close' onClick={deleteGoalFn}/>
      </div>
    </div>
  );
}

export default Goal;
