let deleteCourseButtons = Array.from(
  document.querySelectorAll('.delete-course')
)

let deleteCourse = (node) => {
  node.parentNode.remove()

  //   DCB -> Delete Course Buttons
  let remainingDCB = Array.from(document.querySelectorAll('.delete-course'))
  if (remainingDCB.length === 1) remainingDCB[0].style.display = 'none'
}

deleteCourseButtons.forEach((deleteCourseButton) => {
  deleteCourseButton.addEventListener('click', () => {
    deleteCourse(deleteCourseButton)
  })
})
