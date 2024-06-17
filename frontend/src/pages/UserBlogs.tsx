import { BlogSkeleton } from "../components/BlogSkeleton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserBlogCard } from "../components/UserBlogCard";
import { useUserBlogs } from "../hooks";

export const UserBlogs = () => {
  const { loading, blogs = [] } = useUserBlogs();
  console.log(blogs);
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
      <div className="flex justify-center h-screen">
        <div className="max-w-6xl mx-auto p-6">
          {blogs.length === 0 ? (
            <div className="text-5xl">No Posts</div>
          ) : (
            <>
              {blogs.map((blog, index) => (
                <UserBlogCard
                  key={index}
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  img={blog.img}
                  publishedDate={blog.publishedDate}
                  tags={blog.tags}
                  hastags={blog.hastags}
                  authorId={blog.authorId}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
