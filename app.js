let gpaCalculator = document.querySelector('.gpa-calculator')
let semester = document.querySelector('#semester-one')
let addCourse = semester.querySelector('.add-course')
let clearAll = semester.querySelector('.clear-all')
let addSemester = document.querySelector('.add-a-semester')
let semesterTemplate = document.querySelector('#new-semester')
let courseTemplate = document.querySelector('#new-course')
let courseTable = semester.querySelector('table')

addSemester.addEventListener('click', () => {
  let newSemester = semesterTemplate.content.cloneNode(true)
  gpaCalculator.appendChild(newSemester)
})

addCourse.addEventListener('click', () => {
  let newCourse = courseTemplate.content.cloneNode(true)
  courseTable.appendChild(newCourse)
})

clearAll.addEventListener('click', () => {
  let deletableRows = Array.from(
    courseTable.getElementsByClassName('deletable-row')
  )

  deletableRows.forEach((deletableRow) => {
    deletableRow.remove()
  })
})