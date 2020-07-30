import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Loading.scss';

<<<<<<< HEAD
const Loading = (props) => {
  const tween = useSpring({opacity: props.modelLoaded ? 0 : 1})
    return (
      <animated.div style={tween} className="Loading">
          <div className="Loading__spinner"/>
=======
export default (props) => {
  
  const tween = useSpring({opacity: props.modelLoaded ? 0 : 1})
    return (
      <animated.div style={tween} className="Loading">
          <div className="Loading__spinner">
          </div>
>>>>>>> 8158f317c7f6e1350c59c662f90baae9fc594a18
          <div className="Loading__text">
            Loading
          </div>
      </animated.div>
    )
<<<<<<< HEAD
}

export default Loading;
=======
}
>>>>>>> 8158f317c7f6e1350c59c662f90baae9fc594a18
