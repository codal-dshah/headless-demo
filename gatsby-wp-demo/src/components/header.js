import React, { useState, useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "../styles/header.css"
import logo from "../images/headless-logo.png"
import { ThemeContext } from "../../gatsby-browser" // use the global context

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])

  const data = useStaticQuery(graphql`
    query {
      allWpMenuItem(filter: { locations: { eq: HEADER_MENU } }) {
        nodes {
          id
          label
          uri
        }
      }
      allWpPost {
        nodes {
          id
          title
          uri
        }
      }
    }
  `)

  const menuItems = data.allWpMenuItem.nodes
  const allPosts = data.allWpPost.nodes

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.length > 1) {
      const results = allPosts.filter((post) =>
        post.title.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredPosts(results)
    } else {
      setFilteredPosts([])
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Site Logo" className="site-logo" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link to={item.uri} activeClassName="active-menu">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          {filteredPosts.length > 0 && (
            <ul className="search-results">
              {filteredPosts.map((post) => (
                <li key={post.id}>
                  <Link to={`/blog${post.uri}`} onClick={() => setSearchTerm("")}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Theme Toggle Button */}
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
