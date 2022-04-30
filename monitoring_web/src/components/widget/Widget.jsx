import React from 'react'
import "./Widget.scss"

const Widget = () => {
  return (
    <div className="widget">
        <div className="left">
            <span className="title">title</span>
            <span className="content">contents</span>
            <span className="comment">comment</span>
        </div>
        {/* <div className="right">
            right
        </div> */}
    </div>
  )
}

export default Widget