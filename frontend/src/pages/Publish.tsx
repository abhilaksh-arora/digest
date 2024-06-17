import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MyEditor from "../components/MyEditor";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BACKEND_URL } from "../config";
import Footer from "../components/Footer";

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [editorContent, setEditorContent] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorContent(newEditorState);
  };

  const handleSubmit = async () => {
    const content = JSON.stringify(
      convertToRaw(editorContent.getCurrentContent())
    );
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      { title, img, content, tags, hashtags },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    navigate(`/blog/${response.data.id}`);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full pt-8 h-screen">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            placeholder="Title"
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setImg(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags"
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hashtags"
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setHashtags(e.target.value)}
          />
          <div className="my-4 bg-white border border-black rounded-lg overflow-scroll h-1/2 p-2">
            <MyEditor
              editorState={editorContent}
              onEditorStateChange={handleEditorStateChange}
            />
          </div>
          <button
            type="submit"
            className="flex flex-row bg-black text-white rounded hover:bg-transparent hover:text-black hover:border-black hover:border font-semibold py-2 px-2"
            onClick={handleSubmit}
          >
            Publish post
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
