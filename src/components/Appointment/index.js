import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
export default function Appointment(props){
  
  return (
  <article className="appointment">
    {/* {props.time? `Appointment at ${props.time}` : 'No appointments'} */}
  <Header time={props.time} />
  {/* {props.interview ? <Show /> : <Empty  />} */}
  {props.interview ? <Show id= {props.id} time={props.time} student={props.interview.student}  interviewer={props.interview.interviewer} /> : <Empty  />}
 
  {/* {props.interview ? <Show id= {props.id} time={props.time} interview={{student: props.interview.student, interviewer: props.interview.interviewer}} /> : <Empty  />} */}
  </article>
  )
};
