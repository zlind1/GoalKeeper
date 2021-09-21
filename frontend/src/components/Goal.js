import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
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

  const stopEditing = () => {
    setEditMode(false);
  }

  React.useEffect(() => {
    if (editMode) {
      goalRef.current.value = goal.title;
      goalRef.current.focus();
      goalRef.current.onblur = stopEditing;
      goalRef.current.onkeypress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          goal.title = goalRef.current.value;
          updateGoal(goal);
          setEditMode(false);
        }
      }
      const resizeTextArea = () => {
        goalRef.current.style.height = 'auto';
        goalRef.current.style.height = `${goalRef.current.scrollHeight}px`;
      }
      window.onresize = resizeTextArea;
      goalRef.current.oninput = resizeTextArea;
      resizeTextArea();
    } else {
      window.onresize = null;
    }
  }, [editMode, goal, goalRef, updateGoal]);

  return (
    <Row>
      <Col xs={9}>
        <div className='d-flex w-100'>
          <Form.Check inline checked={goalChecked} className='mx-2'
            onChange={toggleCompleted}/>
          <div className='flex-grow-1'>
            {editMode ? (
              <Form.Control ref={goalRef} className='p-0' as='textarea' rows={1}
                style={{resize: 'none'}}/>
            ) : (
              <span className={goal.completed ? 'text-decoration-line-through' : ''}>
                {goal.title}
              </span>
            )}
          </div>
        </div>

      </Col>
      <Col xs={3}>
        <div className='d-flex justify-content-end'>
          {editMode ? (
            <ImCancelCircle size={25} onClick={stopEditing}/>
          ) : (
            <FiEdit3 size={25} onClick={() => setEditMode(true)}/>
          )}
          <FiTrash size={25} onClick={() => deleteGoal(goal.goal_id)}/>
        </div>
      </Col>
    </Row>
  );
}

export default Goal;
