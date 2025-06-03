import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PostTemplate = ({ data }) => {
  const post = data.wpPost
  const featuredImage = getImage(post.featuredImage?.node?.localFile)

  return (
    <main className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title }} />
      {featuredImage && (
        <GatsbyImage image={featuredImage} alt={post.featuredImage.node.altText || ""} className="mb-4 rounded" />
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  )
}

export default PostTemplate

export const query = graphql`
  query SinglePostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 800, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`
