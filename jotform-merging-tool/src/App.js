import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './Login';
import Home from "./Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<App />} /> */}
          <Route path="login" element={<Login />} />
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


// Installed packages:
// Jotform
// npm install react-router-dom
// npm i react-json-view-compare
// $ npm install gh-pages --save-dev - https://github.com/gitname/react-gh-pages
