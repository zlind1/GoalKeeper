import React from 'react';
import { Form } from 'react-bootstrap';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';

function Goal(props) {
  const {goal, updateGoal, deleteGoal} = props;

  const [editMode, setEditMode] = React.useState(false);
  const [goalChecked, setGoalChecked] = React.useState(goal.completed);

  const goalRef = React.createRef();

  const toggleCompleted = () => {
    setGoalChecked(!goalChecked);
    goal.completed = !goal.completed;
    updateGoal(goal);
  }

  const updateTitle = (e) => {
    e.preventDefault();
    if (!editMode) return;
    goal.title = goalRef.current.value;
    updateGoal(goal);
    setEditMode(false);
  }

  const stopEditing = () => {
    setEditMode(false);
  }

  React.useEffect(() => {
    if (editMode) {
      goalRef.current.value = goal.title;
      goalRef.current.focus();
    }
  }, [editMode, goal.title, goalRef]);

  return (
    <div className='d-flex'>
      <Form.Check inline checked={goalChecked} className='mx-2'
        onChange={toggleCompleted}/>
      <div className='flex-grow-1'>
        {editMode ? (
          <Form onSubmit={updateTitle}>
            <Form.Control ref={goalRef} className='px-1 py-0' onBlur={stopEditing}/>
          </Form>
        ) : (
          <span className={goal.completed ? 'text-decoration-line-through' : ''}>
            {goal.title}
          </span>
        )}
      </div>
      <div className='mx-3'>
        {editMode ? (
          <ImCancelCircle size={25} className='mx-2' onClick={stopEditing}/>
        ) : (
          <FiEdit3 size={25} className='mx-2' onClick={() => setEditMode(true)}/>
        )}
        <FiTrash size={25} onClick={() => deleteGoal(goal.goal_id)}/>
      </div>
    </div>
  );
}

export default Goal;
