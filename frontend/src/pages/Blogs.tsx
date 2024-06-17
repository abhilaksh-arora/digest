import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              authorId={blog.authorId}
              title={blog.title}
              content={blog.content}
              img={blog.img}
              publishedDate={blog.publishedDate}
              tags={blog.tags}
              hastags={blog.hastags}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
