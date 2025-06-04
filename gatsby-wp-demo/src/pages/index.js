import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "../styles/home.css"
import Header from "../components/header"
import Footer from "../components/footer"
import { ThemeContext } from "../../gatsby-browser"

const HomePage = ({ data }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)

  const homeFields = data.wpPage?.homePageFields
  const heroTitle = homeFields?.heroTitle
  const heroSubTitle = homeFields?.heroSubTitle
  const heroImage = getImage(homeFields?.heroImage?.node?.localFile)
  const featuredPosts = homeFields?.featuredPosts?.nodes || []

  return (
    <>
      <Header />
      <main>
          <section className="hero-section">
          {heroImage && (
            <div className="hero-image">
              <GatsbyImage
                image={heroImage}
                alt={homeFields.heroImage?.node?.altText || "Hero Image"}
              />
            </div>
          )}
          <h1 className="hero-title">{heroTitle}</h1>
          <p className="hero-subtitle">{heroSubTitle}</p>
        </section>

        <section className="featured-posts">
          <h2>Featured Posts</h2>
          <div className="featured-grid">
            {featuredPosts.map((post) => (
              <div className="featured-post" key={post.id}>
                <h3>{post.title}</h3>
                <div
                  className="featured-post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    wpPage(slug: { eq: "home" }) {
      homePageFields {
        heroTitle
        heroSubTitle
        heroImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(width: 1000, placeholder: BLURRED)
              }
            }
          }
        }
        featuredPosts {
          nodes {
            __typename
            ... on WpPost {
              id
              title
              content
            }
          }
        }
      }
    }
  }
`

export default HomePage
