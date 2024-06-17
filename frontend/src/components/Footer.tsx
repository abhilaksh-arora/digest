import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white shadow p-2">
      <div className="mx-12 flex items-center justify-center">
        <div className="flex items-center px-6">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-black">
              <span className="text-black">M</span>
              <span className="text-red-500">e</span>
              <span className="text-orange-500">d</span>
              <span className="text-yellow-500">i</span>
              <span className="text-green-500">u</span>
              <span className="text-blue-500">m</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          © 2024 <a className="pl-2 font-bold" href="https://abhilaksharora.tech">Abhilaksh Arora</a>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;