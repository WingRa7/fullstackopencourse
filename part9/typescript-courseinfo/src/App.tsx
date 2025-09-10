const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  interface HeaderProps {
    courseName: string;
  }
  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>;
  };

  interface CoursePart {
    name: string;
    exerciseCount: number;
  }

  interface ContentProps {
    parts: CoursePart[];
  }
  const Content = (props: ContentProps) => {
    return props.parts.map((part) => {
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      );
    });
  };

  const Total = (props: ContentProps) => {
    const total = props.parts.reduce(
      (acc, value) => acc + value.exerciseCount,
      0
    );
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
