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


const bookInterview = (id, interview, editing) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
const newDays = state.days.map((someDay) => {
  if( someDay.name === state.day && !editing) {
    return {...someDay, spots: someDay.spots-1}
  }
  else {
    return someDay;
  }
})
  return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(res => {
      setState(prev=> ({...prev, appointments, days:newDays}));
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
  const newDays = state.days.map((someDay) => {
    if( someDay.name === state.day) {
      return {...someDay, spots: someDay.spots +1 }
    }
    else {
      return someDay;
    }
  })
  
  return axios
    .delete(`/api/appointments/${id}`)
    .then(res => {
      // console.log('Delete successful');
      setState(prev=> ({...prev, appointments, days:newDays}));

    })
};


return { state, setDay, bookInterview, cancelInterview};
}