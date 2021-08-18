import React from "react"
import { Carousel } from "react-bootstrap"

const ImageCarousel = ({ images, title }) => {
  return (
    <Carousel fade>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img
            src={image}
            alt={`${title}-${idx}`}
            className="d-block w-100"
            style={{ maxHeight: "350px", minHeight: "350px" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
