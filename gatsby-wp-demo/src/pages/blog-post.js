import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Header from "../components/header"
import "../styles/blog.css"

const BlogPost = ({ data }) => {
  const post = data.wpPost
  const featuredImage = getImage(post.featuredImage?.node?.localFile)

  return (
    <>
    <Header />
    <article className="blog-detail">
      {featuredImage && (
        <GatsbyImage
          image={featuredImage}
          alt={post.title}
          className="featured-image-full"
        />
      )}
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
    </>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
