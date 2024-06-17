import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { UserBlogs } from "./pages/UserBlogs";
import { ViewProfile } from "./pages/ViewProfile";
import { Edit } from "./pages/Edit";

function App() {
  const token = localStorage.getItem("token") || "abc";
  console.log(token);
  return (
    <div className="bg-[#F9F9F9]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route
            path="/signup"
            element={token === "abc" ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/signin"
            element={token === "abc" ? <Signin /> : <Navigate to="/" />}
          />
          <Route
            path="/publish"
            element={token !== "abc" ? <Publish /> : <Navigate to="/signin" />}
          />
          <Route
            path="/user-blogs"
            element={
              token !== "abc" ? <UserBlogs /> : <Navigate to="/signin" />
            }
          />
          <Route path="/view-user/:id" element={<ViewProfile />} />
          <Route
            path="/edit-blog/:id"
            element={token !== "abc" ? <Edit /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
