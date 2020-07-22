import React from "react";
import { ContentTypes } from "./types";

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
