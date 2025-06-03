import  { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel';

const TestimonialSlider = () => {
  useEffect(() => {
    const sliders = document.querySelectorAll('.wp-block-custom-testimonial-slider .testimonial-slider');
    sliders.forEach(slider => {
      if (!slider.classList.contains('slick-initialized')) {
        $(slider).slick({
          slidesToShow: 1,
          margin: '4px',
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
          fade: false,
          adaptiveHeight: true,
          prevArrow: '<button type="button" class="slick-prev custom-arrow"></button>',
          nextArrow: '<button type="button" class="slick-next custom-arrow"></button>',
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false
              }
            }
          ]
        });
      }
    });
  }, []);

  return null; // The markup is rendered from WordPress HTML, so this is just for the JS.
};

export default TestimonialSlider;
