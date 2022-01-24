import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm"

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then (transition(SHOW));
    console.log("jjjj", props.id, props.interview);

  };
 const deleteInterview = () => {
 props.cancelInterview (props.id) 
    .then (transition(EMPTY));
    console.log("Delete", props.id);
 }

//  const transitionToConfirm = () => {
//    transition(CONFIRM);
//  }
  return (
  <article className="appointment">
    {/* {props.time? `Appointment at ${props.time}` : 'No appointments'} */}
  <Header time={props.time} />
  {/* {props.interview ? <Show /> : <Empty  />} */}
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && props.interview && (
  <Show
  student={props.interview.student}
  interviewer={props.interview.interviewer}
  onDelete={()=> transition(CONFIRM)}
  onEdit={() => transition(EDIT)}
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
  onConfirm={deleteInterview}
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
 
  {/* {props.interview ? <Show id= {props.id} time={props.time} interview={{student: props.interview.student, interviewer: props.interview.interviewer}} /> : <Empty  />} */}
  </article>
  )
};
