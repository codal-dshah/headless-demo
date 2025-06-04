# Headless WordPress + Gatsby Setup

This project demonstrates a Headless CMS architecture using **WordPress** as the backend and **Gatsby** as the frontend. WordPress manages the content, and Gatsby builds a static site using data from the WordPress GraphQL API with light dark mode functionality.

---

## Tech Stack

-   **WordPress**
-   **GatsbyJS**
-   **WPGraphQL**
-   **gatsby-source-wordpress**

---

---

## Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)
-   PHP 7.4+ and MySQL via XAMPP
-   WordPress (latest)

---

## WordPress Backend Setup

1. **Download & Install WordPress** in the project root or any directory.
2. **Activate Required Plugins**:

    - Advanced Custom Fields
    - WP Gatsby
    - WPForms Lite
    - WPGraphQL
    - WPGraphQL for ACF

3. **Activate the Theme**:
    - `twentytwentyfive` (included)
4. **Visit GraphQL Endpoint**:
    ```
    http://localhost/headless-demo/graphql
    ```

---

## Gatsby Frontend Setup

1. **Navigate to Gatsby Directory**:

    ```bash
    cd gatsby-wp-demo
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Configure GraphQL Endpoint**  
   Edit `gatsby-config.js`:

    ```js
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `http://localhost/headless-demo/graphql`, // update to match your WP install
      },
    }
    ```

4. **Start Gatsby Development Server**:

    ```bash
    npm run develop
    ```

    Then visit:  
    `http://localhost:8000` for the site  
    `http://localhost:8000/___graphql` for the Gatsby GraphQL Explorer

---

## Useful Scripts

From the `gatsby-wp-demo/` folder:

```bash
npm run develop       # Start local dev server
npm run build         # Build for production
npm run clean         # Clear cache and rebuild


```
