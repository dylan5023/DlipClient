const timeLeft = (date) => {
  const current = new Date().getTime();
  const numericTime = new Date(date).getTime();
  const gap = current - numericTime;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  if (gap < minute) {
    return "now";
  }
  if (gap < hour) {
    return `${parseInt(gap / minute)}minutes before`;
  }
  if (gap < day) {
    return `${parseInt(gap / hour)}hours before`;
  }
  return `${parseInt(gap / day)}day before`;
};

export default function ({}, inject) {
  inject("time", timeLeft);
}
