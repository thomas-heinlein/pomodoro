export default function getFormattedTime(seconds: number): string {
  return getMinutes(seconds).toString().concat(":").concat(getSeconds(seconds));
}

const getMinutes = (seconds: number): string => {
  let minutes = Math.floor(seconds / 60);
  return appendZeroIfNecessary(minutes);
};

const getSeconds = (seconds: number): string => {
  let remainingSeconds = seconds - +getMinutes(seconds) * 60;
  return appendZeroIfNecessary(remainingSeconds);
};

function appendZeroIfNecessary(time: number) {
  if (time.toString().length === 1) {
    return "0" + time;
  }
  return time.toString();
}
