// src/pages/blog.js
import React from "react"
import { graphql, Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer.js"
import "../styles/blog.css"

const BlogPage = ({ data }) => {
  const posts = data.allWpPost.nodes

  return (
    <>
    <Header />
    <div className="blog-page1">
      <h1>Latest Blog Posts</h1>
      <div className="blog-list1">
        {posts.map(post => (
          <div key={post.id} className="blog-card">
            <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <div
              className="excerpt"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default BlogPage

export const query = graphql`
  query AllBlogPosts {
    allWpPost(sort: { date: DESC }) {
      nodes {
        id
        title
        excerpt
        slug
      }
    }
  }
`
