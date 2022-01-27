import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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

//Getting the spots for a day
const getSpotsForDay = (day, appointments) => {
  let spots = 0;
  for(const id of day.appointments) {
    const appointment = appointments[id]; 
    if(!appointment.interview){
      spots++;
    }
  }
  return spots;
};

// Updates number of spots available when a user books or cancels an interview
const updateSpots = (state, appointments, id) => {
  const dayObj = state.days.find(day => day.name === state.day);
  const spots = getSpotsForDay(dayObj, appointments)
  console.log("spots" , spots);
  const day = {...dayObj, spots};
  const newDays = state.days.map(d => d.name === state.day ? day:d); 
  return newDays;
}

 // Adds the interview to the database and the state
const bookInterview = (id, interview, editing) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const newDays = updateSpots(state, appointments, id);
  return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => {
      setState(prev=> ({...prev, appointments, days:newDays}));
    })
};

// Removes the interview from the database and the state
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
  const newDays = updateSpots(state, appointments, id);
  return axios
    .delete(`/api/appointments/${id}`)
    .then(res => {
      setState(prev=> ({...prev, appointments, days:newDays}));

    })
};

return { state, setDay, bookInterview, cancelInterview};
}