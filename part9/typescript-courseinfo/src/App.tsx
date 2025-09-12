const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasePlus extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartBasePlus {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartBasePlus {
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartSpecial extends CoursePartBasePlus {
    requirements: string[];
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | Special;

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  interface PartProps {
    part: CoursePart;
  }

  const Part = ({ part }: PartProps) => {
    switch (part.kind) {
      case "basic":
        return (
          <p>
            {part.name} {part.exerciseCount} {part.description}
          </p>
        );
      case "group":
        return (
          <p>
            {part.name} {part.exerciseCount} {part.groupProjectCount}
          </p>
        );
      case "background":
        return (
          <p>
            {part.name} {part.exerciseCount} {part.description}
            {part.backgroundMaterial}
          </p>
        );
      case "special":
        return (
          <p>
            {part.name} {part.exerciseCount} {part.description}
            {part.requirements}
          </p>
        );
      default:
        return assertNever(part);
    }
  };

  interface HeaderProps {
    courseName: string;
  }
  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>;
  };

  interface ContentProps {
    parts: CoursePart[];
  }

  const Content = (props: ContentProps) => {
    return props.parts.map((part) => {
      return <Part part={part} />;
    });
  };

  interface TotalProps {
    total: number;
  }

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.total}</p>;
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
