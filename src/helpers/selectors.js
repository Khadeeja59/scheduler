function getAppointmentsForDay(state, day) {
  const appointments = [];
  const dayArr = state.days.filter(days => days.name === day);
  if (dayArr.length === 0) {
   return appointments;

  } else {
    for (const id of dayArr[0].appointments) {
      appointments.push(state.appointments[id]);
  }
  }
  return appointments;
};


function getInterview(state, interview) {        //appointment.interview
    if(!interview) {
      return null;
    }
    const interviewerId = interview.interviewer;
    const interviewerObj = state.interviewers[interviewerId]; 
    const resultingInterview = {
      student: interview.student,
      interviewer: interviewerObj
    };
    console.log(resultingInterview);
    return resultingInterview;
};

export {getAppointmentsForDay,  getInterview};