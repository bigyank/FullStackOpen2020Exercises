import React from "react";
import { ContentTypes } from "./types";

const Total: React.FC<ContentTypes> = ({ courseContents }) => {
  return (
    <div>
      <p>
        Total Courses :
        {courseContents.reduce(
          (acc, content) => (acc += content.exerciseCount),
          0
        )}
      </p>
    </div>
  );
};

export default Total;
