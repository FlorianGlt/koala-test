export const splitCamelCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1 $2");

export const formatFlightNumber = (flightNumber: string) =>
  flightNumber.replace(/([A-Z])(\d)/g, "$1 $2");

export const convertDelayInMinutesToDelayInHours = (delay: number) => {
  const hour = Math.floor(delay / 60);
  const minutes = delay % 60;
  if (!minutes) {
    return `${hour}h`;
  }

  return `${hour}h${minutes < 10 ? `0${minutes}` : minutes}`;
};
