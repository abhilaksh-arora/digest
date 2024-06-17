import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import MyEditor from "../components/MyEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BACKEND_URL } from "../config";
import Footer from "../components/Footer";
import { useBlog } from "../hooks";

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [hastags, setHastags] = useState("");
  const [editorContent, setEditorContent] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImg(blog.img);
      setTags(blog.tags);
      setHastags(blog.hastags);
      setEditorContent(
        EditorState.createWithContent(convertFromRaw(JSON.parse(blog.content)))
      );
    }
  }, [blog]);

  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorContent(newEditorState);
  };

  const handleSubmit = async () => {
    const content = JSON.stringify(
      convertToRaw(editorContent.getCurrentContent())
    );
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/blog/${id}`, // Ensure the endpoint includes the blog id
      { title, img, content, tags, hastags },
      { headers: { Authorization: `${localStorage.getItem("token")}` } } // Ensure the token is correctly formatted
    );
    // console.log(response)
    navigate(`/blog/${response.data.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full pt-8 h-screen">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={img}
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setImg(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hashtags"
            value={hastags}
            className="border border-black rounded-lg text-md block w-full p-2.5 my-4"
            onChange={(e) => setHastags(e.target.value)}
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
