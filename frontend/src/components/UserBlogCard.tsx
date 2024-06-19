import { Link } from "react-router-dom";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import { BACKEND_URL } from "../config";
import parse from "html-react-parser";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  img: string;
  publishedDate: string;
  id: string;
  tags: string;
  authorId: string;
  hastags: string;
}

export const UserBlogCard = ({
  id,
  authorName,
  title,
  img,
  content,
  tags,
  hastags,
  publishedDate,
}: BlogCardProps) => {
  const rawContent = JSON.parse(content);
  const contentState = convertFromRaw(rawContent);
  const editorState = EditorState.createWithContent(contentState);
  const htmlContent = stateToHTML(editorState.getCurrentContent());
  const token = localStorage.getItem("token");

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: `${token}` },
      });
      console.log("Post deleted:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <div>
      <div className="bg-white p-6 m-6 shadow rounded-lg max-w-5xl">
        <div className="flex">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Avatar name={authorName} />
              <div>
                <span className="text-gray-700 font-semibold">
                  {authorName}
                </span>
                <span className="text-gray-500"> in </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
                  {tags}
                </span>
                <span className="text-gray-500">
                  {" "}
                  • {publishedDate || Date.now()}
                </span>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/edit-blog/${id}`}
                  className="flex flex-row bg-black text-white rounded hover:bg-transparent hover:text-black hover:border-black hover:border font-semibold py-2 px-2 mx-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    handleDelete(id);
                  }}
                  className="flex flex-row bg-black text-white rounded hover:bg-transparent hover:text-black hover:border-black hover:border font-semibold py-2 px-2 mx-2"
                >
                  Delete
                </button>
              </div>
            </div>
            <Link to={`/blog/${id}`}>
              <h2 className="mt-4 text-2xl font-bold text-black">{title}</h2>
              <p className="mt-2 text-gray-700">
                {parse(htmlContent.slice(0, 100) + "...")}
              </p>
              <p className="text-black font-bold text-md mt-2">{hastags}</p>
              <div className="mt-4 flex items-center space-x-2">
                {/* <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
                  Microsoft
                </span> */}
                <span className="text-gray-500">{`${Math.ceil(
                  content.length / 100
                )} minute(s) read`}</span>
                <span className="text-gray-500"> • Selected for you</span>
              </div>
              <div className="mt-4 flex items-center space-x-4 text-gray-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    d="M19 2H5c-1.1 0-2 .9-2 2v16l7-3.5L17 20V4c0-1.1-.9-2-2-2zm0 14.5l-5-2.5-5 2.5V4h10v12.5z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-1 13h2v2h-2v-2zm0-10h2v8h-2V7z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <img
            src={img}
            alt="Article"
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-black rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${size === "small" ? "text-xs" : "text-md"} text-white`}
      >
        {name[0]}
      </span>
    </div>
  );
}
