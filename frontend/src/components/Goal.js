import React from 'react';
import { Form } from 'react-bootstrap';
import { MdEdit, MdCancel, MdDelete } from 'react-icons/md';

function Goal(props) {
  const {goal, updateGoal, deleteGoal} = props;

  const [editMode, setEditMode] = React.useState(false);

  const goalRef = React.createRef();

  const toggleCompleted = () => {
    goal.completed = !goal.completed;
    console.log('changed goal.completed');
    updateGoal(goal);
  }

  const updateTitle = (e) => {
    e.preventDefault();
    if (!editMode) return;
    goal.title = goalRef.current.value;
    console.log('changed goal.title');
    updateGoal(goal);
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
      <Form.Check inline checked={goal.completed} className='mx-2'
        onChange={toggleCompleted}/>
      <div className='flex-grow-1'>
        {editMode ? (
          <Form onSubmit={updateTitle}>
            <Form.Control ref={goalRef} className='px-1 py-0'/>
          </Form>
        ) : (
          <span className={goal.completed ? 'text-decoration-line-through' : ''}>
            {goal.title}
          </span>
        )}
      </div>
      <div className='mx-3'>
        {editMode ? (
          <MdCancel size={25} className='mx-2' onClick={() => setEditMode(false)}/>
        ) : (
          <MdEdit size={25} className='mx-2' onClick={() => setEditMode(true)}/>
        )}
        <MdDelete size={25} onClick={() => deleteGoal(goal.goal_id)}/>
      </div>
    </div>
  );
}

export default Goal;
