import React from "react"
import { graphql } from "gatsby"
import useSlick from "../components/useSlick"
import "../styles/about-us.css"
import Header from "../components/header"
import Footer from "../components/footer"
import TestimonialSlider from '../components/testimonial-slider';


const AboutPage = ({ data }) => {
  useSlick()
  const page = data.wpPage
  return (
    <>
    <Header />
    <TestimonialSlider />
    <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    <Footer />
    </>
  )
}

export const query = graphql`
  query {
    wpPage(slug: { eq: "about-us" }) {
      title
      content
    }
  }
`

export default AboutPage
