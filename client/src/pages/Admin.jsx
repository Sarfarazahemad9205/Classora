import { useEffect, useState } from "react";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubjectManagement from "../components/SubjectManagement";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const { token, user } = useAuth();

  // ================= SUBJECTS & CHAPTERS =================
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  // ================= WEBSITE VISITS =================
  const [visits, setVisits] = useState(0);

  // ================= SELECTED SUBJECT & CHAPTER =================
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  // ================= CHAPTER STATES =================
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [chapterLoading, setChapterLoading] = useState(false);
  const [chapterMessage, setChapterMessage] = useState("");
  const [chapterError, setChapterError] = useState("");

  // ================= MATERIAL STATES =================
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  // ================= MATERIAL LOADING =================
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // FETCH SUBJECTS & CHAPTERS
  // =========================================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        setError("");

        const [subjectsResponse, chaptersResponse] =
          await Promise.all([
            fetch("/api/subjects", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch("/api/chapters", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        const subjectsData = await subjectsResponse.json();
        const chaptersData = await chaptersResponse.json();

        if (!subjectsResponse.ok) {
          throw new Error(
            subjectsData.message || "Failed to fetch subjects"
          );
        }

        if (!chaptersResponse.ok) {
          throw new Error(
            chaptersData.message || "Failed to fetch chapters"
          );
        }

        setSubjects(subjectsData.subjects || []);
        setChapters(chaptersData.chapters || []);
      } catch (err) {
        console.error("Admin data error:", err);
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setLoadingData(false);
      setError("Please login first.");
    }
  }, [token]);

  // =========================================================
  // FETCH WEBSITE VISITS
  // =========================================================

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch("/api/stats/visits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch website visits"
          );
        }

        setVisits(data.visits);
      } catch (err) {
        console.error("Fetch visits error:", err);
      }
    };

    if (token && user?.role === "admin") {
      fetchVisits();
    }
  }, [token, user]);

  // =========================================================
  // FILTER CHAPTERS BY SELECTED SUBJECT
  // =========================================================

  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.subject &&
      String(chapter.subject._id) === String(selectedSubject)
  );

  // =========================================================
  // SUBJECT CHANGE
  // =========================================================

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedChapter("");
  };

  // =========================================================
  // CREATE CHAPTER
  // =========================================================

  const handleCreateChapter = async (e) => {
    e.preventDefault();

    setChapterMessage("");
    setChapterError("");

    if (!selectedSubject) {
      setChapterError("Please select a subject.");
      return;
    }

    if (!chapterName.trim()) {
      setChapterError("Please enter chapter name.");
      return;
    }

    if (!chapterDescription.trim()) {
      setChapterError("Please enter chapter description.");
      return;
    }

    try {
      setChapterLoading(true);

      const response = await fetch(
        "/api/chapters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: chapterName.trim(),
            description: chapterDescription.trim(),
            subject: selectedSubject,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create chapter"
        );
      }

      setChapterMessage(
        data.message || "Chapter created successfully."
      );

      setChapterName("");
      setChapterDescription("");

      const chaptersResponse = await fetch(
        "/api/chapters",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const chaptersData = await chaptersResponse.json();

      if (chaptersResponse.ok) {
        setChapters(chaptersData.chapters || []);
      }
    } catch (err) {
      console.error("Create chapter error:", err);
      setChapterError(err.message);
    } finally {
      setChapterLoading(false);
    }
  };

  // =========================================================
  // DELETE CHAPTER
  // =========================================================

  const handleDeleteChapter = async (chapterId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this chapter?"
    );

    if (!confirmDelete) {
      return;
    }

    setChapterMessage("");
    setChapterError("");

    try {
      const response = await fetch(
        `/api/chapters/${chapterId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete chapter"
        );
      }

      setChapterMessage(
        data.message || "Chapter deleted successfully."
      );

      setChapters((prevChapters) =>
        prevChapters.filter(
          (chapter) => chapter._id !== chapterId
        )
      );

      if (selectedChapter === chapterId) {
        setSelectedChapter("");
      }
    } catch (err) {
      console.error("Delete chapter error:", err);
      setChapterError(err.message);
    }
  };

  // =========================================================
  // MATERIAL TYPE CHANGE
  // =========================================================

  const handleTypeChange = (e) => {
    setType(e.target.value);

    setFile(null);
    setVideoUrl("");
    setContent("");

    const fileInput = document.getElementById("materialFile");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =========================================================
  // ADD MATERIAL
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!selectedChapter) {
      setError("Please select a chapter.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a material title.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a material description.");
      return;
    }

    if (type === "pdf" && !file) {
      setError("Please select a PDF file.");
      return;
    }

    if (type === "video" && !videoUrl.trim()) {
      setError("Please enter a YouTube video URL.");
      return;
    }

    if (type === "notes" && !content.trim()) {
      setError("Please enter note content.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("type", type);
      formData.append("description", description.trim());
      formData.append("chapter", selectedChapter);

      if (type === "pdf") {
        formData.append("file", file);
      }

      if (type === "video") {
        formData.append("videoUrl", videoUrl.trim());
      }

      if (type === "notes") {
        formData.append("content", content.trim());
      }

      const response = await fetch(
        "/api/material",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add material"
        );
      }

      setMessage(data.message);

      setTitle("");
      setDescription("");
      setSelectedChapter("");
      setType("pdf");
      setVideoUrl("");
      setContent("");
      setFile(null);

      const fileInput = document.getElementById("materialFile");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error("Add material error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ADMIN CHECK
  // =========================================================

  if (user && user.role !== "admin") {
    return (
      <>
        <AppNavbar />

        <div className="container py-5">
          <div className="alert alert-danger text-center">
            Access denied. Admin only.
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <AppNavbar />

      {/* HERO */}

      <section className="bg-primary text-white py-5">
        <div className="container py-5 text-center">

          <span className="badge bg-light text-primary px-3 py-2 mb-3">
            ADMIN PANEL
          </span>

          <h1 className="display-5 fw-bold mb-3">
            Manage E-Learning Content
          </h1>

          <p
            className="lead mx-auto mb-0"
            style={{ maxWidth: "700px" }}
          >
            Create chapters and add PDFs, videos, notes,
            and learning resources for Class 10 students.
          </p>

        </div>
      </section>

      {/* ADMIN CONTENT */}

      <section className="py-5">

        <div className="container">

          {/* WEBSITE VISITS */}

          <div className="card border-0 shadow-sm rounded-4 mb-5">

            <div className="card-body p-4 text-center">

              <span className="text-primary fw-bold">
                WEBSITE STATISTICS
              </span>

              <h2 className="fw-bold mt-2 display-6">
                {visits}
              </h2>

              <p className="text-secondary mb-0">
                Total Website Visits
              </p>

            </div>

          </div>

          {/* SUBJECT MANAGEMENT */}

          <SubjectManagement
            token={token}
            subjects={subjects}
            setSubjects={setSubjects}
          />

          {/* CHAPTER + MATERIAL */}

          <div className="row justify-content-center">

            <div className="col-lg-8">

              {/* CREATE CHAPTER */}

              <div className="card border-0 shadow-sm rounded-4 mb-5">

                <div className="card-body p-4 p-md-5">

                  <div className="text-center mb-4">

                    <span className="text-primary fw-bold">
                      CHAPTER MANAGEMENT
                    </span>

                    <h2 className="fw-bold mt-2">
                      Create New Chapter
                    </h2>

                    <p className="text-secondary">
                      Create a chapter under a selected subject.
                    </p>

                  </div>

                  {chapterMessage && (
                    <div className="alert alert-success">
                      {chapterMessage}
                    </div>
                  )}

                  {chapterError && (
                    <div className="alert alert-danger">
                      {chapterError}
                    </div>
                  )}

                  <form onSubmit={handleCreateChapter}>

                    {/* SUBJECT */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Subject
                      </label>

                      <select
                        className="form-select"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        disabled={loadingData}
                        required
                      >

                        <option value="">
                          {loadingData
                            ? "Loading subjects..."
                            : "Select Subject"}
                        </option>

                        {subjects.map((subject) => (
                          <option
                            key={subject._id}
                            value={subject._id}
                          >
                            {subject.name}
                          </option>
                        ))}

                      </select>

                    </div>

                    {/* CHAPTER NAME */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Chapter Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter chapter name"
                        value={chapterName}
                        onChange={(e) =>
                          setChapterName(e.target.value)
                        }
                        required
                      />

                    </div>

                    {/* CHAPTER DESCRIPTION */}

                    <div className="mb-4">

                      <label className="form-label fw-semibold">
                        Chapter Description
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Enter chapter description"
                        value={chapterDescription}
                        onChange={(e) =>
                          setChapterDescription(e.target.value)
                        }
                        required
                      />

                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2"
                      disabled={
                        chapterLoading || loadingData
                      }
                    >
                      {chapterLoading
                        ? "Creating Chapter..."
                        : "Create Chapter"}
                    </button>

                  </form>

                  <hr className="my-5" />

                  {/* EXISTING CHAPTERS */}

                  <div>

                    <h4 className="fw-bold mb-3">
                      Existing Chapters
                    </h4>

                    {chapters.length === 0 ? (
                      <p className="text-secondary">
                        No chapters created yet.
                      </p>
                    ) : (
                      <div className="list-group">

                        {chapters.map((chapter) => (
                          <div
                            key={chapter._id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >

                            <div>

                              <h6 className="fw-bold mb-1">
                                {chapter.name}
                              </h6>

                              <small className="text-secondary">
                                {chapter.subject?.name ||
                                  "Unknown Subject"}
                              </small>

                              <p className="mb-0 mt-1 text-secondary">
                                {chapter.description}
                              </p>

                            </div>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm ms-3"
                              onClick={() =>
                                handleDeleteChapter(
                                  chapter._id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>
                        ))}

                      </div>
                    )}

                  </div>

                </div>

              </div>

              {/* ADD MATERIAL */}

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-md-5">

                  <div className="text-center mb-4">

                    <span className="text-primary fw-bold">
                      MATERIAL MANAGEMENT
                    </span>

                    <h2 className="fw-bold mt-2">
                      Add New Material
                    </h2>

                    <p className="text-secondary">
                      Fill in the details below to add a learning resource.
                    </p>

                  </div>

                  {/* LOADING */}

                  {loadingData && (
                    <div className="text-center mb-4">

                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">
                          Loading...
                        </span>
                      </div>

                      <p className="text-secondary mt-2">
                        Loading subjects and chapters...
                      </p>

                    </div>
                  )}

                  {/* SUCCESS */}

                  {message && (
                    <div className="alert alert-success">
                      {message}
                    </div>
                  )}

                  {/* ERROR */}

                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>

                    {/* SUBJECT */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Subject
                      </label>

                      <select
                        className="form-select"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        disabled={loadingData}
                        required
                      >

                        <option value="">
                          {loadingData
                            ? "Loading subjects..."
                            : "Select Subject"}
                        </option>

                        {subjects.map((subject) => (
                          <option
                            key={subject._id}
                            value={subject._id}
                          >
                            {subject.name}
                          </option>
                        ))}

                      </select>

                    </div>

                    {/* CHAPTER */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Chapter
                      </label>

                      <select
                        className="form-select"
                        value={selectedChapter}
                        onChange={(e) =>
                          setSelectedChapter(e.target.value)
                        }
                        disabled={
                          !selectedSubject || loadingData
                        }
                        required
                      >

                        <option value="">
                          {selectedSubject
                            ? "Select Chapter"
                            : "Select Subject First"}
                        </option>

                        {filteredChapters.map((chapter) => (
                          <option
                            key={chapter._id}
                            value={chapter._id}
                          >
                            {chapter.name}
                          </option>
                        ))}

                      </select>

                    </div>

                    {/* TITLE */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Material Title
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter material title"
                        value={title}
                        onChange={(e) =>
                          setTitle(e.target.value)
                        }
                        required
                      />

                    </div>

                    {/* TYPE */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Material Type
                      </label>

                      <select
                        className="form-select"
                        value={type}
                        onChange={handleTypeChange}
                        required
                      >

                        <option value="pdf">
                          PDF
                        </option>

                        <option value="video">
                          Video
                        </option>

                        <option value="notes">
                          Notes
                        </option>

                      </select>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="mb-3">

                      <label className="form-label fw-semibold">
                        Description
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Enter material description"
                        value={description}
                        onChange={(e) =>
                          setDescription(e.target.value)
                        }
                        required
                      />

                    </div>

                    {/* PDF */}

                    {type === "pdf" && (
                      <div className="mb-4">

                        <label className="form-label fw-semibold">
                          Select PDF File
                        </label>

                        <input
                          id="materialFile"
                          type="file"
                          className="form-control"
                          accept=".pdf,application/pdf"
                          onChange={(e) =>
                            setFile(
                              e.target.files[0] || null
                            )
                          }
                        />

                        <small className="text-secondary">
                          Only PDF files are allowed.
                        </small>

                      </div>
                    )}

                    {/* VIDEO */}

                    {type === "video" && (
                      <div className="mb-4">

                        <label className="form-label fw-semibold">
                          YouTube Video URL
                        </label>

                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={videoUrl}
                          onChange={(e) =>
                            setVideoUrl(e.target.value)
                          }
                        />

                        <small className="text-secondary">
                          Enter a valid YouTube URL.
                        </small>

                      </div>
                    )}

                    {/* NOTES */}

                    {type === "notes" && (
                      <div className="mb-4">

                        <label className="form-label fw-semibold">
                          Note Content
                        </label>

                        <textarea
                          className="form-control"
                          rows="10"
                          placeholder="Write your study notes here..."
                          value={content}
                          onChange={(e) =>
                            setContent(e.target.value)
                          }
                        />

                        <small className="text-secondary">
                          Enter the study notes that students will read.
                        </small>

                      </div>
                    )}

                    {/* ADD MATERIAL BUTTON */}

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2"
                      disabled={
                        loading || loadingData
                      }
                    >
                      {loading
                        ? "Adding Material..."
                        : "Add Material"}
                    </button>

                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Admin;