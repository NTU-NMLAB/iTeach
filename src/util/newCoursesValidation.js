/* 確認課程名稱 */
function checkCourseName(courseName) {
  if (courseName === '' || courseName === null) {
    return {
      valid: false,
      errorCode: 1,
      description: '未填寫課程名稱',
    }
  }
  return {
    valid: true,
    errorCode: 0,
    description: null,
  }
}

/* 確認上課學期 */
function checkSemester(year, semester) {
  if (year === '' || semester === '' ||
      year === null || semester === null) {
    return {
      valid: false,
      errorCode: 2,
      description: '未填寫上課學期',
    }
  }
  return {
    valid: true,
    errorCode: 0,
    description: null,
  }
}

/* 確認上課教室 */
function checkClassroom(classroom) {
  if (classroom === '' || classroom === null) {
    return {
      valid: false,
      errorCode: 3,
      description: '未填寫上課教室',
    }
  }
  return {
    valid: true,
    errorCode: 0,
    description: null,
  }
}

/* 確認上課時間 */
function checkTime(weekday, time) {
  if (weekday === '' || time === '' ||
      weekday === null || time === null) {
    return {
      valid: false,
      errorCode: 4,
      description: '未填寫上課時間',
    }
  }
  return {
    valid: true,
    errorCode: 0,
    description: null,
  }
}

/* 確認課程網站 */
function checkWebsite(url, isOnline) {
  // 如果有打網址才需要檢查
  const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi
  if (url !== '' || url !== '') {
    if (isOnline !== 'none') {
      // TODO 判斷可連網的時候
    }
    if (!url.match(regExp)) {
      return {
        valid: false,
        errorCode: 5,
        description: '網址格式錯誤',
      }
    }
    return {
      valid: true,
      errorCode: 0,
      description: null,
    }
  }
  return {
    valid: true,
    errorCode: 0,
    description: null,
  }
}

export default function newCoursesValidation(courseState, connectionInfo) {
  if (!checkCourseName(courseState.course).valid) {
    return checkCourseName(courseState.course)
  } else if (!checkSemester(courseState.year, courseState.semester).valid) {
    return checkSemester(courseState.year, courseState.semester)
  } else if (!checkClassroom(courseState.classroom).valid) {
    return checkClassroom(courseState.classroom)
  } else if (!checkTime(courseState.weekday, courseState.time).valid) {
    return checkTime(courseState.weekday, courseState.time)
  } else if (!checkWebsite(courseState.website).valid) {
    return checkWebsite(courseState.website, connectionInfo)
  }
  return { // 理論上用不到的return
    valid: true,
    errorCode: 0,
    description: null,
  }
}
