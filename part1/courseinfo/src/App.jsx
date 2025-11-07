const Header = ({course}) => {
  return <h1>{course}</h1>
}

// const Content = (props) => {
//   return (
//     <>
//       <p>
//           {props.part1} {props.exercises1}
//         </p>
//         <p>
//           {props.part2} {props.exercises2}
//         </p>
//         <p>
//           {props.part3} {props.exercises3}
//         </p>
//       </>
//   )
// }

const Part = ({part, exercises}) => {
  return <p>{part} {exercises}</p>
}

const Count = (props) => {
  return <p>Number of exercises: {props.exercises1 + props.exercises2 + props.exercises3}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises}/>
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises}/>
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises}/>
      <Count 
          exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} 
      />
    </div>
  )
}

export default App