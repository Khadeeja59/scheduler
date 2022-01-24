import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  },[]);

  const bookInterview = (id, interview) => {
    console.log("bookInterview", id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({
    //   ...state,
    //   appointments
    // });
    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then(res => {
        console.log(res);
        setState({...state, appointments});
      })
    
  }

  const cancelInterview = (id) => {
    console.log(`ID: ${id}`);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(`Appointment: ${appointment}, ID: ${id}, Appointments: ${appointments}`);
    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        console.log('Delete successful');
        setState({...state, appointments});
      })

  }
 
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log("Appointments returned from function", appointments);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  // console.log("Interviews returned from function", appointment.interview);
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"> 
          <DayList
          
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
     <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
