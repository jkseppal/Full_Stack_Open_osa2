import React from 'react'

const Courses = (props) => {
    const { courses } = props
    return (
      <div>
        <ul>
          {courses.map(course =>
            <li key={course.id}>
              <Course course ={course} />
            </li>
            )}
        </ul>
      </div>
    )
  }
  
  const Course = (props) => {
    const { course } = props
    console.log('test')
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    const { parts } = props
    return (
      <div>
        <ul>
          {parts.map(part =>
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
          )}
        </ul>
      </div>
    )
  }
  
  const Total = (props) => {
    const { parts } = props
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const tehtavat = parts.map(part => part.exercises)
    const total = tehtavat.reduce(reducer)
    return (
      <div>
        <p>
          Number of exercises {total}
        </p>
      </div>
    )
  }

  export default Courses