import React from 'react'
import {Icon, Col, Cards, Row, Card, Carousel} from 'antd';

export default function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img style={{ width: '100%', maxHeight: '150px' }}
              src={`http://localhost:5000/${image}`}></img>

          </div>
        ))}
      </Carousel></div>
  )
}
