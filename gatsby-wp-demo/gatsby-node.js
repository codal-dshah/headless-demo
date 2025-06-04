const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create DSG page (if still needed)
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });

  // Create blog post pages
  const postResult = await graphql(`
    {
      allWpPost {
        nodes {
          slug
        }
      }
    }
  `);

  postResult.data.allWpPost.nodes.forEach(post => {
    createPage({
      path: `/blog/${post.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.slug,
      },
    });
  });

  // Create About Us page
  const aboutPageResult = await graphql(`
    {
      allWpPage(filter: { slug: { eq: "about-us" } }) {
        nodes {
          id
          slug
          uri
        }
      }
    }
  `);

  aboutPageResult.data.allWpPage.nodes.forEach(page => {
    createPage({
      path: page.uri,
      component: path.resolve("./src/templates/about-us.js"),
      context: {
        id: page.id,
      },
    });
  });
};
