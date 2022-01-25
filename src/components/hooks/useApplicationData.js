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
  return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => {
      console.log(res);
      setState({...state, appointments});
    })
};

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
};


return { state, setDay, bookInterview, cancelInterview };
}