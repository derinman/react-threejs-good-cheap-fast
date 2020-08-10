import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Loading.scss';

export default (props) => {
  
  const tween = useSpring({opacity: props.modelLoaded ? 0 : 1})//model load好就透明度變0
    return (
      <animated.div style={tween} className="Loading">
          {/*spin的外面圈圈*/}
          <div className="Loading__spinner"/>
          <div className="Loading__text">
            Loading
          </div>
      </animated.div>
    )
}
