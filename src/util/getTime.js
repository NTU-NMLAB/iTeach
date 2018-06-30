export default function getTime() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1 // (January gives 0)
  let day = date.getDate()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  if (month < 10) {
    month = `0${month.toString()}`
  }
  if (day < 10) {
    day = `0${day.toString()}`
  }
  if (hour < 10) {
    hour = `0${hour.toString()}`
  }
  if (minutes < 10) {
    minutes = `0${minutes.toString()}`
  }
  if (seconds < 10) {
    seconds = `0${seconds.toString()}`
  }

  const fullTime = `${year.toString()}/${month.toString()}/${day.toString()} ${hour.toString()}:${minutes.toString()}:${seconds.toString()}`
  return fullTime
}
