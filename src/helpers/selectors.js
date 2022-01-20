export function getAppointmentsForDay(state, day) {
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

