
import { useEffect, useState } from "react";

function MaterialManagement({
  token,
  subjects,
  chapters,
  selectedSubject,
  selectedChapter,
  setSelectedSubject,
  setSelectedChapter,
}) {
  // ================= MATERIAL STATES =================

  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  // ================= MATERIAL STATES =================

  const [materials, setMaterials] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // FILTER CHAPTERS BY SELECTED SUBJECT
  // =========================================================

  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.subject &&
      String(chapter.subject._id) === String(selectedSubject)
  );

  // =========================================================
  // FETCH MATERIALS
  // =========================================================

  const fetchMaterials = async () => {
    try {
      setLoadingMaterials(true);
      setError("");

      const response = await fetch("/api/material", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch materials"
        );
      }

      setMaterials(data.materials || []);
    } catch (err) {
      console.error("Fetch materials error:", err);
      setError(err.message);
    } finally {
      setLoadingMaterials(false);
    }
  };

  // =========================================================
  // LOAD MATERIALS
  // =========================================================

  useEffect(() => {
    if (token) {
      fetchMaterials();
    }
  }, [token]);

  // =========================================================
  // SUBJECT CHANGE
  // =========================================================

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedChapter("");
  };

  // =========================================================
  // MATERIAL TYPE CHANGE
  // =========================================================

  const handleTypeChange = (e) => {
    setType(e.target.value);

    setFile(null);
    setVideoUrl("");
    setContent("");

    const fileInput = document.getElementById(
      "materialFile"
    );

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
      formData.append(
        "description",
        description.trim()
      );
      formData.append("chapter", selectedChapter);

      if (type === "pdf") {
        formData.append("file", file);
      }

      if (type === "video") {
        formData.append(
          "videoUrl",
          videoUrl.trim()
        );
      }

      if (type === "notes") {
        formData.append(
          "content",
          content.trim()
        );
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

      setMessage(
        data.message ||
          "Material added successfully."
      );

      // Reset form
      setTitle("");
      setDescription("");
      setType("pdf");
      setVideoUrl("");
      setContent("");
      setFile(null);

      const fileInput = document.getElementById(
        "materialFile"
      );

      if (fileInput) {
        fileInput.value = "";
      }

      // Refresh materials
      await fetchMaterials();
    } catch (err) {
      console.error(
        "Add material error:",
        err
      );

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DELETE MATERIAL
  // =========================================================

  const handleDeleteMaterial = async (
    materialId
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmDelete) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/material/${materialId}`,
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
          data.message ||
            "Failed to delete material"
        );
      }

      setMessage(
        data.message ||
          "Material deleted successfully."
      );

      // Remove deleted material from UI
      setMaterials((prevMaterials) =>
        prevMaterials.filter(
          (material) =>
            material._id !== materialId
        )
      );
    } catch (err) {
      console.error(
        "Delete material error:",
        err
      );

      setError(err.message);
    }
  };

  // =========================================================
  // MATERIAL ICON
  // =========================================================

  const getMaterialIcon = (type) => {
    if (type === "notes") {
      return "📝";
    }

    if (type === "pdf") {
      return "📄";
    }

    if (type === "video") {
      return "🎥";
    }

    return "📚";
  };

  // =========================================================
  // MATERIAL TYPE NAME
  // =========================================================

  const getMaterialType = (type) => {
    if (type === "notes") {
      return "Notes";
    }

    if (type === "pdf") {
      return "PDF";
    }

    if (type === "video") {
      return "Video";
    }

    return "Material";
  };

  // =========================================================
  // FILTER MATERIALS BY SELECTED CHAPTER
  // =========================================================

  const filteredMaterials = materials.filter(
    (material) =>
      material.chapter &&
      String(material.chapter._id) ===
        String(selectedChapter)
  );

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          ADD MATERIAL
      ====================================================== */}

      <div className="card border-0 shadow-sm rounded-4 mb-5">

        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">

            <span className="text-primary fw-bold">
              MATERIAL MANAGEMENT
            </span>

            <h2 className="fw-bold mt-2">
              Add New Material
            </h2>

            <p className="text-secondary">
              Fill in the details below to add a
              learning resource.
            </p>

          </div>

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
                required
              >

                <option value="">
                  Select Subject
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
                  setSelectedChapter(
                    e.target.value
                  )
                }
                disabled={!selectedSubject}
                required
              >

                <option value="">
                  {selectedSubject
                    ? "Select Chapter"
                    : "Select Subject First"}
                </option>

                {filteredChapters.map(
                  (chapter) => (
                    <option
                      key={chapter._id}
                      value={chapter._id}
                    >
                      {chapter.name}
                    </option>
                  )
                )}

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
                  setDescription(
                    e.target.value
                  )
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
                      e.target.files[0] ||
                        null
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
                    setVideoUrl(
                      e.target.value
                    )
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
                    setContent(
                      e.target.value
                    )
                  }
                />

                <small className="text-secondary">
                  Enter the study notes that
                  students will read.
                </small>

              </div>
            )}

            {/* ADD BUTTON */}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
              {loading
                ? "Adding Material..."
                : "Add Material"}
            </button>

          </form>

        </div>

      </div>

      {/* =====================================================
          EXISTING MATERIALS
      ====================================================== */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">

            <span className="text-primary fw-bold">
              MATERIAL MANAGEMENT
            </span>

            <h2 className="fw-bold mt-2">
              Existing Materials
            </h2>

            <p className="text-secondary">
              Select a chapter to view and
              manage its materials.
            </p>

          </div>

          {/* NO CHAPTER SELECTED */}

          {!selectedChapter && (
            <div className="text-center py-4">

              <span className="fs-1">
                📚
              </span>

              <h5 className="fw-bold mt-3">
                Select a chapter
              </h5>

              <p className="text-secondary mb-0">
                Select a chapter above to view
                its materials.
              </p>

            </div>
          )}

          {/* LOADING */}

          {selectedChapter &&
            loadingMaterials && (
              <div className="text-center py-4">

                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>

                <p className="text-secondary mt-3">
                  Loading materials...
                </p>

              </div>
            )}

          {/* NO MATERIALS */}

          {selectedChapter &&
            !loadingMaterials &&
            filteredMaterials.length ===
              0 && (
              <div className="text-center py-4">

                <span className="fs-1">
                  📚
                </span>

                <h5 className="fw-bold mt-3">
                  No materials found
                </h5>

                <p className="text-secondary mb-0">
                  This chapter does not have
                  any materials yet.
                </p>

              </div>
            )}

          {/* MATERIAL LIST */}

          {selectedChapter &&
            !loadingMaterials &&
            filteredMaterials.length > 0 && (
              <div className="list-group">

                {filteredMaterials.map(
                  (material) => (
                    <div
                      key={material._id}
                      className="list-group-item p-3"
                    >

                      <div className="d-flex justify-content-between align-items-center">

                        <div className="d-flex align-items-center">

                          {/* ICON */}

                          <div
                            className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "50px",
                              height: "50px",
                            }}
                          >
                            <span className="fs-4">
                              {getMaterialIcon(
                                material.type
                              )}
                            </span>
                          </div>

                          {/* DETAILS */}

                          <div>

                            <h6 className="fw-bold mb-1">
                              {material.title}
                            </h6>

                            <span className="badge bg-primary mb-1">
                              {getMaterialType(
                                material.type
                              )}
                            </span>

                            <p className="mb-0 text-secondary small">
                              {material.description}
                            </p>

                          </div>

                        </div>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="btn btn-danger btn-sm ms-3"
                          onClick={() =>
                            handleDeleteMaterial(
                              material._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

        </div>

      </div>
    </>
  );
}

export default MaterialManagement;

