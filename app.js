let semesterTemplate = document.querySelector('#semester-template')
let courseRowTemplate = document.querySelector('#course-row-template')

let tablets = window.matchMedia('(max-width: 768px)')
let mobiles = window.matchMedia('(max-width: 480px)')

let calculator = document.querySelector('.calculator')
let defaultSemester = calculator.querySelector('.default-semester')
let addSemesterButton = calculator.querySelector('.add-semester')
let calculateButton = calculator.querySelector('.calculate')
let calculatorActionsOne = calculator.querySelector('.calculator-actions.one')
let calculatorActionsTwo = calculator.querySelector('.calculator-actions.two')

let deleteSemesterButton = defaultSemester.querySelector('.semester-delete')
let addCourseButton = defaultSemester.querySelector('.add-course')
let clearAllButton = defaultSemester.querySelector('.clear-all')
let deleteCourseButton = defaultSemester.querySelectorAll('.bi-x-circle')

if (deleteCourseButton.length > 1) {
  defaultSemester.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-x-circle')) {
      e.target.parentNode.parentNode.remove()

      let remainCourses = defaultSemester.querySelectorAll('.course-row')
      if (remainCourses.length === 1) {
        let remainedDeleteCourseButton =
          remainCourses[0].querySelector('.bi-x-circle')
        remainedDeleteCourseButton.parentNode.style.visibility = 'hidden'
      }
    }
  })
}

let addCourse = (node, semester) => {
  let semesterContent =
    node.parentNode.parentNode.querySelector('.semester-content')
  let newCourse = courseRowTemplate.content.firstElementChild.cloneNode(true)
  semesterContent.appendChild(newCourse)

  let remainCourses = semester.querySelectorAll('.course-row')
  if (remainCourses.length > 1) {
    let remainedDeleteCourseButton =
      remainCourses[0].querySelector('.bi-x-circle')
    remainedDeleteCourseButton.parentNode.style.visibility = 'visible'
  }
}

addCourseButton.addEventListener('click', () => {
  addCourse(addCourseButton, defaultSemester)
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

  let semesterTitles = newSemester.querySelectorAll('.semester-title')
  semesterTitles.forEach((semesterTitle) => {
    semesterTitle.textContent = `Semester ${romanize(childrenLength - 3)}`
  })

  let addCourseButton = newSemester.querySelector('.add-course')
  let clearAllButton = newSemester.querySelector('.clear-all')
  let deleteCourseButton = newSemester.querySelectorAll('.bi-x-circle')

  if (deleteCourseButton.length > 1) {
    newSemester.addEventListener('click', (e) => {
      if (e.target.classList.contains('bi-x-circle')) {
        e.target.parentNode.parentNode.remove()

        let remainCourses = newSemester.querySelectorAll('.course-row')
        if (remainCourses.length === 1) {
          let remainedDeleteCourseButton =
            remainCourses[0].querySelector('.bi-x-circle')
          remainedDeleteCourseButton.parentNode.style.visibility = 'hidden'
        }
      }
    })
  }

  addCourseButton.addEventListener('click', () => {
    addCourse(addCourseButton, newSemester)
  })

  clearAllButton.addEventListener('click', () => {
    clearAll(clearAllButton)
  })

  calculator.insertBefore(newSemester, calculator.children[childrenLength - 3])

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

let calculate = () => {
  let allSemesters = Array.from(calculator.querySelectorAll('.semester'))
  let overallGpa = calculator.querySelector('.overall-gpa')
  let semestersGpa = []

  allSemesters.forEach((semester) => {
    let courseRows = semester.querySelectorAll('.course-row')
    let allGradeCredits = []
    let allCredits = []

    courseRows.forEach((courseRow) => {
      let grade = courseRow.querySelector('.grade').value
      let credits = Number(courseRow.querySelector('.credits').value)
      let gradeCredits = grade * credits
      allGradeCredits.push(gradeCredits)
      allCredits.push(credits)

      let deleteCourseButton = courseRow.querySelector('.delete-course')
      deleteCourseButton.style.display = 'none'
    })

    let semesterGPA = semester.querySelector('.semester-gpa')
    let sumGradeCredits = allGradeCredits.reduce((a, b) => a + b, 0)
    let sumCredits = allCredits.reduce((a, b) => a + b, 0)
    let gpa = sumGradeCredits / sumCredits
    semesterGPA.textContent = gpa.toFixed(2)
    semestersGpa.push(gpa)

    let semesterDelete = semester.querySelectorAll('.semester-delete')
    let semesterActions = semester.querySelector('.semester-actions')
    let semesterGPAUI = semester.querySelector('.semester-gpa-ui')
    semesterDelete.forEach((semesterDelete) => {
      semesterDelete.style.display = 'none'
    })
    semesterGPAUI.style.display = 'block'
    semesterActions.style.display = 'none'
  })

  if (allSemesters.length > 1) {
    let sumSemestersGPA = semestersGpa.reduce((a, b) => a + b, 0)
    overallGpa.textContent = (sumSemestersGPA / semestersGpa.length).toFixed(2)

    let overallGPAUi = calculator.querySelector('.overall-gpa-ui')
    overallGPAUi.style.display = 'flex'
  }

  calculatorActionsOne.style.display = 'none'
  calculatorActionsTwo.style.display = 'flex'
}

calculateButton.addEventListener('click', () => {
  calculate()
})

let edit = () => {
  let allSemesters = Array.from(calculator.querySelectorAll('.semester'))

  allSemesters.forEach((semester) => {
    let courseRows = semester.querySelectorAll('.course-row')
    courseRows.forEach((courseRow) => {
      let deleteCourseButton = courseRow.querySelector('.delete-course')
      deleteCourseButton.style.display = 'block'
    })

    let semesterDelete = semester.querySelectorAll('.semester-delete')
    let semesterActions = semester.querySelector('.semester-actions')
    let semesterGPAUI = semester.querySelector('.semester-gpa-ui')
    semesterDelete.forEach((semesterDelete) => {
      semesterDelete.style.display = 'block'
    })
    semesterGPAUI.style.display = 'none'
    semesterActions.style.display = 'flex'
  })

  if (allSemesters.length > 1) {
    let overallGPAUi = calculator.querySelector('.overall-gpa-ui')
    overallGPAUi.style.display = 'none'
  }

  calculatorActionsOne.style.display = 'flex'
  calculatorActionsTwo.style.display = 'none'
}
