import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  authorId: string;
  hastags: string;
  tags: string;
  img: string;
  publishedDate: string;
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.post);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        // headers: {
        //   Authorization: localStorage.getItem("token"),
        // },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useUserBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/user`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        console.log(response.data.posts);
        if (blogs.length > 0) {
          setAuthor(response.data.posts[0].author.name);
        }
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    author,
  };
};
