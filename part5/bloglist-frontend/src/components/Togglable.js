import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  console.log("====================================");
  console.log(props);
  console.log("====================================");
  /**
   * ! "visible" in displayWhenVisible refers to the item which is toggled
   * * eg: form, buttons etc
   */

  const displayWhenVisible = { display: isVisible ? "" : "none" };
  const hideWhenVisible = { display: isVisible ? "none" : "" };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    };
  });

  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisible}>
        {props.btnName}
      </button>
      <div style={displayWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
