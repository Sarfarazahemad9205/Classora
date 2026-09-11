import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Subjects from "./pages/Subjects";
import Chapters from "./pages/Chapters";
import Materials from "./pages/Materials";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {
    fetch("/api/stats/visit", {
      method: "POST",
    }).catch((error) => {
      console.error("Failed to record visit:", error);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />

        <Route path="/subjects" element={<Subjects />} />

        <Route
          path="/chapters/:subjectId"
          element={<Chapters />}
        />

        <Route
          path="/materials/:chapterId"
          element={<Materials />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;