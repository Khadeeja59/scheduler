import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "../hooks/useVisualMode";

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };

function destroy(event) {
  transition(DELETING, true);
  props
   .cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
 }
 
  return (
  <article className="appointment">
  <Header time={props.time} />
  
  {mode === EMPTY && (
  <Empty 
  onAdd={()=>transition(CREATE)}
  />
  )}
  
  {mode === SHOW && props.interview && (
  <Show
  student={props.interview.student}
  interviewer={props.interview.interviewer}
  onDelete={()=> transition(CONFIRM)}
  onEdit={()=>transition(EDIT)}
  />
  )}

  {mode === CREATE && (
  <Form
  interviewers = {props.interviewers}
  onCancel={back}
  onSave={save}
  />
  )}
  
  {mode === CONFIRM && (
  <Confirm 
  message="Are you sure you want to delete?"
  onConfirm={destroy}
  onCancel ={back}
  />
  )}
  
  {mode === EDIT && (
  <Form 
  name={props.interview.student}
  interviewer={props.interview.interviewer.id}
  interviewers={props.interviewers}
  onCancel = {back}
  onSave = {save}
  />
  )}
  
  {mode === SAVING && (
  <Status 
  message="Saving..."
  />
  )
  }
  
  {mode === DELETING && (
  <Status 
  message="Deleting..."
  />
  )}
  
  {mode === ERROR_SAVE && (
  <Error 
  message="Unable to save"
  onClose={back}
  />
  )}
  
  {mode === ERROR_DELETE && (
  <Error 
  message="Unable to delete"
  onClose={back}
  />
  )}
 
  </article>
  )
};
