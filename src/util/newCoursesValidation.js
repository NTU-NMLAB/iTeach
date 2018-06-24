/* 確認課程名稱 */
function checkCourseTitle(title) {
  if (title === '' || title === null) {
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

export default function newCoursesValidation(courseData, connectionInfo) {
  if (!checkCourseTitle(courseData.title).valid) {
    return checkCourseTitle(courseData.title)
  } else if (!checkSemester(courseData.year, courseData.semester).valid) {
    return checkSemester(courseData.year, courseData.semester)
  } else if (!checkClassroom(courseData.classroom).valid) {
    return checkClassroom(courseData.classroom)
  } else if (!checkTime(courseData.weekday, courseData.time).valid) {
    return checkTime(courseData.weekday, courseData.time)
  } else if (!checkWebsite(courseData.website).valid) {
    return checkWebsite(courseData.website, connectionInfo)
  }
  return { // 理論上用不到的return
    valid: true,
    errorCode: 0,
    description: null,
  }
}
