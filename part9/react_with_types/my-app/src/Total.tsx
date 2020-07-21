import React from "react";

interface ContentType {
  name: string;
  exerciseCount: number;
}

interface CourseType {
  courseContents: Array<ContentType>;
}

const Total: React.FC<CourseType> = ({ courseContents }) => {
  return (
    <div>
      <p>
        Total Courses :{" "}
        {courseContents.reduce(
          (acc, content) => (acc += content.exerciseCount),
          0
        )}
      </p>
    </div>
  );
};

export default Total;
