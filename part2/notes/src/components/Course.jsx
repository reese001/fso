const Header = ({name}) => <h1>{name}</h1>

const Part = ({course, exercises}) => <p>{course} {exercises}</p>


const Content = ({courses}) => {
    const total = courses.reduce((sum, course) => sum + course.exercises, 0);
        return (
        <div>
            {courses.map((course) => {
                return (
                <Part key={course.id} course={course.name} exercises={course.exercises} />
                )
            })}
            <strong>total of {total} exercises</strong>
        </div>
    )
}


const Course = ({course}) => {
    return (
    <div>
        <Header name={course.name} />
        <Content courses={course.parts} />
    </div>
    )
}

export default Course