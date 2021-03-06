/** @jsx jsx */
import { jsx } from "theme-ui";
import Main from "../components/site/layout/main";
import { graphql } from "gatsby";
import { useSearchBar } from "./../components/site/blog/useSearchBar";
import P from "./../components/common/p";
import SearchBar from "./../components/site/blog/SearchBar";
import Divider from "./../components/common/divider";
import BlogIndex from "../components/site/blog/blog-index";
import AnimatedH1 from "./../components/common/animated-h1";
import SEO from "gatsby-theme-seo/src/components/seo";
import Category from "../components/site/blog/category";
import { useCategory } from "./../components/site/blog/useCategory";
import AllCategory from "../components/site/blog/all-categories";

const emoji = "\u{1F57A}";

const Blog = ({ data, location }) => {
  const { posts, handleSearchQuery } = useSearchBar(data);
  const { categories, handleCategoryQuery } = useCategory(posts);
  console.log({ categories });
  const categoriesList = [
    ...new Set(posts.map(post => post.frontmatter.category))
  ];
  const pinned = posts.filter(post => post.frontmatter.pin === true);
  const allPosts = [pinned[0], ...posts.filter(post => !post.frontmatter.pin)];

  const blog = Array.from("Blog");
  const SEODescription = `
	I'm a software developer who specializes in JAMstack development. This is my blog where I write
  about stuff i code, problems i encounter and projects im working on.
`;

  const SEOKeywords = [
    "Web Developer",
    "JAMstack",
    "JAMstack Development",
    "Headless CMS",
    "React",
    "Gatsby",
    "Expo",
    "Sanity.io"
  ];
  return (
    <Main>
      <SEO
        title="Blog"
        description={SEODescription}
        keywords={SEOKeywords}
        pathname={location.pathname}
        twitter="studio_hungry"
      />
      <Divider />
      <AnimatedH1 string={blog} />
      <div
        sx={{
          marginBottom: "4em"
        }}
      >
        <P>
          This is my blog, there are many like it, but this one is mine. I write
          about stuff i code, problems i encounter and projects im working on.
          Use the search bar below to filter posts by any keyword, or the
          category buttons to choose a post category {emoji}
        </P>
      </div>
      <Divider />
      <SearchBar handleSearchQuery={handleSearchQuery} />
      <section
        sx={{
          display: "grid",
          gridAutoRows: "auto",
          gridTemplateColumns: "repeat(auto-fit, minmax(auto, 100px))",
          gap: "1.5em",
          width: "100%",
          placeContent: "center"
        }}
      >
        <AllCategory handleCategoryQuery={handleCategoryQuery} />
        {categoriesList.map((cat, index) => (
          <Category
            key={cat + index}
            category={cat}
            handleCategoryQuery={handleCategoryQuery}
          />
        ))}
      </section>
      <BlogIndex posts={categories.length ? categories : allPosts} />
    </Main>
  );
};

export default Blog;

export const query = graphql`
  query BlogIndexQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        frontmatter {
          title
          date(formatString: "DD MMM YYYY")
          category
          author
          pin
        }
        fields {
          slug
        }
      }
    }
  }
`;
