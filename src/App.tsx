// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Login } from "./pages/login";
import Navbar from "./components/navbar";
import CreatePost from "./pages/create-post/createpost";
function App() {
  return (
    <>
      <main className=" font-semibold text-red-900 h-screen bg-pink-300">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
