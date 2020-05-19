import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * ! "visible" in displayWhenVisible refers to the item which is toggled
   * * eg: form, buttons etc
   */

  const displayWhenVisible = { display: isVisible ? '' : 'none' };
  const hideWhenVisible = { display: isVisible ? 'none' : '' };

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

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default Togglable;
