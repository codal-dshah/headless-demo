import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import logo from '../images/headless-logo.png';
import '../styles/footer.css';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      allWpMenuItem(filter: {locations: {eq: FOOTER_MENU}}) {
        nodes {
          id
          label
          uri
        }
      }
      allWpPost(limit: 2, sort: {date: DESC}) {
        nodes {
          id
          title
          uri
        }
      }
    }
  `);

  const menuItems = data?.allWpMenuItem?.nodes || [];
  const recentPosts = data?.allWpPost?.nodes || [];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Site Logo" />
          </Link>
        </div>

        {/* Menu Section */}
        <div className="footer-menu">
          <h4>Quick Links</h4>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link to={item.uri}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Posts Section */}
        <div className="footer-posts">
          <h4>Recent Posts</h4>
          <ul>
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link to={`/blog${post.uri}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Headless Demo
      </div>
    </footer>
  );
};

export default Footer;
