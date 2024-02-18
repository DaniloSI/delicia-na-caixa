export const getDate = (offsetDaysFromToday) => {
  const today = new Date();
  const newDate = new Date(today);
  newDate.setDate(newDate.getDate() + offsetDaysFromToday);
  return newDate;
}