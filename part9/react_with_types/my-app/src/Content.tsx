import React from "react";

interface CourseTypes {
  name: string;
  exerciseCount: number;
}

interface ContentTypes {
  courseContents: Array<CourseTypes>;
}

const Content: React.FC<ContentTypes> = ({ courseContents }) => {
  return (
    <div>
      {courseContents.map((contents) => (
        <div key={contents.name}>
          <p>
            {contents.name} {contents.exerciseCount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Content;
