import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Blog } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

export const ViewProfile = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [author, setAuthor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/user/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setAuthor(response.data.posts[0].author.name);
        setLoading(false);
      });
  }, []);

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
      <div className="h-screen">
        <div className="mt-4">
          <h1 className="text-5xl font-bold text-center">{author}</h1>
          <p className="text-gray-700 text-2xl mt-2 text-center">
            Posted {blogs.length} blogs.
          </p>
        </div>
        <div className="flex justify-center">
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
      </div>
      <Footer />
    </div>
  );
};
