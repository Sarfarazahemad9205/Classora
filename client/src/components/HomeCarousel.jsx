import Carousel from 'react-bootstrap/Carousel';

import scienceImage from '../assets/science.png';
import mathematicsImage from '../assets/mathematics.png';
import englishImage from '../assets/english.png';

function HomeCarousel() {
  return (
    <div className="carousel-container">
      <Carousel>

        <Carousel.Item>
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${scienceImage})` }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${mathematicsImage})` }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${englishImage})` }}
          />
        </Carousel.Item>

      </Carousel>
    </div>
  );
}

export default HomeCarousel;