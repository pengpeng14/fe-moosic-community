const remainTime = () => {
  let day = 0;
  let hour = 0;
  let minute = 0;
  let seconds = 0;

  const currentTime = new Date();
  day = 5 - currentTime.getDay();
  hour = 24 - currentTime.getHours();
  if (currentTime.getMinutes() > 0) {
    if (hour === 0) {
      hour = 23;
      day -= 1;
    } else {
      hour -= 1;
    }
    minute = 60 - currentTime.getMinutes();
  }
  if (currentTime.getSeconds() > 0) {
    if (minute == 0) {
      minute = 59;
      hour -= 1;
    } else {
      minute -= 1;
    }
    seconds = 60 - currentTime.getSeconds();
  }
  const result: string = `${day}d ${hour}hr ${minute}m ${seconds}s`;
  return result;
};

export default { remainTime };
