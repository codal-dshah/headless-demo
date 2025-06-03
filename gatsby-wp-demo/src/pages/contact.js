import React from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import "../styles/contact.css"
import Header from "../components/header"
import ContactForm from "../components/ContactForm";


const ContactPage = ({ data }) => {
  const page = data.wpPage;

  return (
    <>
    <Header />
    <div className="contact-page">
      <h1>{page.title}</h1>
      <div className="contact-form">
        {parse(page.content)} {/* Render form HTML from WP */}
            <ContactForm />

      </div>
    </div>
    </>
  );
};

export const query = graphql`
  query {
    wpPage(slug: { eq: "contact" }) {
      title
      content
    }
  }
`;

export default ContactPage;
