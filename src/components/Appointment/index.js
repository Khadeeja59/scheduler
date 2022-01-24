import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then (transition(SHOW));
    console.log("jjjj", props.id, props.interview);
  }
  
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
  />
)}
{mode === CREATE && (
  <Form
  interviewers = {props.interviewers}
  onCancel={back}
  onSave={save}

  />
)}

 
  {/* {props.interview ? <Show id= {props.id} time={props.time} interview={{student: props.interview.student, interviewer: props.interview.interviewer}} /> : <Empty  />} */}
  </article>
  )
};
