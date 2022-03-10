let semesterTemplate = document.querySelector('#semester-template')
let courseRowTemplate = document.querySelector('#course-row-template')

let calculator = document.querySelector('.calculator')
let deleteSemesterButton = document.querySelector('.semester-delete')
let addSemesterButton = document.querySelector('.add-semester')
let calculateButton = document.querySelector('.calculate')

let addCourseButton = document.querySelector('.add-course')
let clearAllButton = document.querySelector('.clear-all')
let deleteCourseButtons = Array.from(
  document.querySelectorAll('.delete-course')
)

let deleteCourse = (node) => {
  node.parentNode.remove()

  //   DCB -> Delete Course Buttons
  let remainingDCB = Array.from(document.querySelectorAll('.delete-course'))
  if (remainingDCB.length === 1) remainingDCB[0].style.visibility = 'hidden'
}

deleteCourseButtons.forEach((deleteCourseButton) => {
  deleteCourseButton.addEventListener('click', () => {
    deleteCourse(deleteCourseButton)
  })
})

let addCourse = (node) => {
  let semesterContent =
    node.parentNode.parentNode.querySelector('.semester-content')
  let newCourse = courseRowTemplate.content.firstElementChild.cloneNode(true)
  let deleteCourseButton = newCourse.querySelector('.delete-course')

  deleteCourseButton.addEventListener('click', () => {
    deleteCourse(deleteCourseButton)
  })
  semesterContent.appendChild(newCourse)

  //   DCB -> Delete Course Buttons
  let remainingDCB = Array.from(document.querySelectorAll('.delete-course'))
  if (remainingDCB.length > 1) remainingDCB[0].style.visibility = 'visible'
}

addCourseButton.addEventListener('click', () => {
  addCourse(addCourseButton)
})

let clearAll = (node) => {
  let semesterContent =
    node.parentNode.parentNode.querySelector('.semester-content')
  let courseNames = Array.from(semesterContent.querySelectorAll('.course-name'))
  let grades = Array.from(semesterContent.querySelectorAll('.grade'))
  let credits = Array.from(semesterContent.querySelectorAll('.credits'))

  courseNames.forEach((courseName) => {
    courseName.value = ''
  })

  grades.forEach((grade) => {
    grade.value = ''
  })

  credits.forEach((credit) => {
    credit.value = ''
  })
}

clearAllButton.addEventListener('click', () => {
  clearAll(clearAllButton)
})

let deleteSemester = (node) => {
  node.parentNode.remove()
}

deleteSemesterButton.addEventListener('click', () => {
  deleteSemester(deleteSemesterButton)

  let remainingSemesters = Array.from(document.querySelectorAll('.semester'))
  if (remainingSemesters.length === 1) {
    let semesterDeleteButton =
      remainingSemesters[0].querySelector('.semester-delete')
    semesterDeleteButton.style.visibility = 'hidden'
  }
})

let addSemester = () => {
  let newSemester = semesterTemplate.content.firstElementChild.cloneNode(true)
  let childrenLength = calculator.children.length

  let semesterTitle = newSemester.querySelector('.semester-title')
  semesterTitle.textContent = `Semester ${romanize(childrenLength - 1)}`

  let addCourseButton = newSemester.querySelector('.add-course')
  let clearAllButton = newSemester.querySelector('.clear-all')
  let deleteCourseButtons = Array.from(
    newSemester.querySelectorAll('.delete-course')
  )

  deleteCourseButtons.forEach((deleteCourseButton) => {
    deleteCourseButton.addEventListener('click', () => {
      deleteCourse(deleteCourseButton)
    })
  })

  addCourseButton.addEventListener('click', () => {
    addCourse(addCourseButton)
  })

  clearAllButton.addEventListener('click', () => {
    clearAll(clearAllButton)
  })

  calculator.insertBefore(newSemester, calculator.children[childrenLength - 1])

  let remainingSemesters = Array.from(calculator.querySelectorAll('.semester'))
  if (remainingSemesters.length > 1) {
    let semesterDeleteButtons = Array.from(
      calculator.querySelectorAll('.semester-delete')
    )
    semesterDeleteButtons.forEach((semesterDeleteButton) => {
      semesterDeleteButton.style.visibility = 'visible'
    })
  }

  let deleteSemesterButtons = calculator.querySelectorAll('.semester-delete')
  deleteSemesterButtons.forEach((deleteSemesterButton) => {
    deleteSemesterButton.addEventListener('click', () => {
      deleteSemester(deleteSemesterButton)

      let remainingSemesters = Array.from(
        document.querySelectorAll('.semester')
      )
      if (remainingSemesters.length === 1) {
        let semesterDeleteButton =
          remainingSemesters[0].querySelector('.semester-delete')
        semesterDeleteButton.style.visibility = 'hidden'
      }

      for (let i = 0; i < remainingSemesters.length; i++) {
        let semesterTitle =
          remainingSemesters[i].querySelector('.semester-title')
        semesterTitle.textContent = `Semester ${romanize(i + 1)}`
      }
    })
  })
}

addSemesterButton.addEventListener('click', () => {
  addSemester()
})

function romanize(num) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = '',
    i
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i
      num -= lookup[i]
    }
  }
  return roman
}
