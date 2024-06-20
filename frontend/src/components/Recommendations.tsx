import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useBlogs } from "../hooks";
import Header from "./Header";
import { BlogSkeleton } from "./BlogSkeleton";

const Recommendations = () => {
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
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <h2 className="text-2xl uppercase font-bold mb-6 text-center">
        Recommended from Medium
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.slice(0, 2).map((blog, index) => {
          return (
            <div key={index}>
              <Link to={"/blog/${blog.id}"}>
                <div className="p-6">
                  <img
                    className="w-full h-48 rounded-md"
                    src={blog.img}
                    alt="Article 1"
                  />
                  <div className="flex items-center mt-4">
                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                    <div className="ml-4">
                      <h2 className="text-gray-900 font-semibold">
                        {blog.author.name || "Anonymous"}
                      </h2>
                      <p className="text-gray-600">{blog.tags}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold my-4">{blog.title}</h3>
                  {/* <p className="text-gray-600">1-page. Well-formatted.</p> */}
                  <span className="px-3 py-1 bg-gray-200 text-black font-bold rounded-full">
                    {blog.hastags}
                  </span>
                  <div className="flex items-center mt-4 text-gray-600">
                    <span>{`${Math.ceil(
                      blog.content.length / 5000
                    )} minute(s) read`}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.publishedDate || "28/05/2002"}</span>
                  </div>
                  <div className="flex items-center mt-2 text-gray-600">
                    <span>4.7K</span>
                    <svg
                      className="w-6 h-6 ml-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="ml-2">55</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
