let gpaCalculator = document.querySelector('.gpa-calculator')
let addASemester = document.querySelector('.add-a-semester')
let semesterCount = 1

addASemester.addEventListener('click', () => {
  semesterCount++
  newSemester(semesterCount)
})

const newSemester = (semesterCount) => {
  let semesterTemplate = document.querySelector('#new-semester')
  let newSemester = semesterTemplate.content.firstElementChild.cloneNode(true)
  gpaCalculator.insertBefore(newSemester, addASemester)
  let semesterTitle = newSemester.querySelector('.semester-title')
  semesterTitle.textContent = `Semester ${romanize(semesterCount)}`

  let addCourse = newSemester.querySelector('.add-course')
  addCourse.addEventListener('click', () => {
    let courseTemplate = document.querySelector('#new-course')
    let courseTable = newSemester.querySelector('table')
    let newCourse = courseTemplate.content.firstElementChild.cloneNode(true)
    courseTable.appendChild(newCourse)
  })

  let clearAll = newSemester.querySelector('.clear-all')
  clearAll.addEventListener('click', () => {
    let courseTable = newSemester.querySelector('table')
    let deletableRows = Array.from(
      courseTable.getElementsByClassName('deletable-row')
    )

    deletableRows.forEach((deletableRow) => {
      deletableRow.remove()
    })
  })

  let calculate = newSemester.querySelector('.calculate')
  calculate.addEventListener('click', () => {
    let gradeInputs = Array.from(newSemester.querySelectorAll('.grade'))
    let grades = gradeInputs.map((gradeInput) => {
      return gradeInput.value
    })
    let creditsInputs = Array.from(newSemester.querySelectorAll('.credits'))
    let credits = creditsInputs.map((creditsInput) => {
      return Number(creditsInput.value)
    })
    let scores = grades.map((grade, index) => {
      return grade * credits[index]
    })

    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue
    let scoresSum = scores.reduce(reducer)
    let creditsSum = credits.reduce(reducer)
    let gpa = scoresSum / creditsSum

    let gpaUI = newSemester.querySelector('.gpa-value')
    gpaUI.textContent = `Your GPA is: ${gpa}`
  })

  return newSemester
}

newSemester(semesterCount)

function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
        roman = '',
        i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }