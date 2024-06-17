import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import Footer from "./Footer";
import Header from "./Header";
import Recommendations from "./Recommendations";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";
import parse from 'html-react-parser';

export const FullBlog = ({ blog }: { blog: Blog }) => {
  // Convert the raw content to an EditorState
  const rawContent = JSON.parse(blog.content);
  const contentState = convertFromRaw(rawContent);
  const editorState = EditorState.createWithContent(contentState);

  // Convert the EditorState to HTML
  const htmlContent = stateToHTML(editorState.getCurrentContent());

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded shadow-md">
        <img
          className="w-full h-auto rounded-md"
          src={blog.img}
          alt="Microsoft Building"
        />
        <div className="flex items-center mt-4">
          <Avatar size="big" name={blog.author.name || "Anonymous"} />
          <div className="ml-4">
            <h2 className="text-gray-900 font-semibold">
              {blog.author.name || "Anonymous"}
            </h2>
            <p className="text-gray-600">
              Published in{" "}
              <span className="font-semibold text-gray-900">
                JavaScript in Plain English
              </span>
            </p>
            <p className="text-gray-600">
              {`${Math.ceil(blog.content.length / 5000)} minute(s) read`} •{" "}
              {blog.publishedDate || "28/05/2024"}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-4 pl-12 ml-1">
          <div className="flex items-center mr-4">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="ml-2 text-gray-600">602</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 6.5l-8.79 9.14L7 11.18l-5 5.02L1.41 15l5.59-5.6L12 15l7.21-7.5L21 6.5z" />
            </svg>
            <span className="ml-2 text-gray-600">18</span>
          </div>
        </div>
        <div className="my-6">
          <hr />
        </div>
        <h1 className="text-5xl font-bold my-4">{blog.title}</h1>
        <span className="px-3 py-1 mt-4 bg-gray-200 text-gray-700 rounded-full">
          {blog.tags}
        </span>
        <p className="text-black font-bold text-2xl mt-2">{blog.hastags}</p>

        <div className="my-6">
          <hr />
        </div>
        <div className="text-justify">
          {/* <img
            className="w-full h-auto rounded-md"
            src={blog.img}
            alt="Microsoft Building"
          /> */}
          <div className="text-black mt-4 text-lg">
            {parse(htmlContent)}
          </div>
        </div>
        <div className="my-6">
          <hr />
        </div>
      </div>
      <div className="max-w-4xl mx-auto my-6 p-3  rounded shadow-md">
        <Recommendations />
      </div>
      <Footer />
    </div>
  );
};
