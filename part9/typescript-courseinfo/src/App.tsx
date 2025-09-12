const App = () => {
  const padding = {
    paddingTop: 4,
    paddingBottom: 4,
  };

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
    | CoursePartSpecial;

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
          <div style={padding}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <div>
              <i>{part.description}</i>
            </div>
          </div>
        );
      case "group":
        return (
          <div style={padding}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>

            <div>project exercises {part.groupProjectCount}</div>
          </div>
        );
      case "background":
        return (
          <div style={padding}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <div>
              <i>{part.description}</i>
            </div>
            submit to {part.backgroundMaterial}
          </div>
        );
      case "special":
        return (
          <div style={padding}>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <div>
              <i>{part.description}</i>
            </div>
            required skils: {part.requirements.join(", ")}
          </div>
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
    return (
      <div style={padding}>
        <p>Number of exercises {props.total}</p>
      </div>
    );
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
