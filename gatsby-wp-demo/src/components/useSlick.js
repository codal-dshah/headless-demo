import { useEffect } from "react"
import $ from "jquery"
import "slick-carousel"

const useSlick = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && $(".testimonial-slider").length) {
      $(".testimonial-slider").not('.slick-initialized').slick({
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 2,
        margin: '10px',
      })
    }
  }, [])
}

export default useSlick
