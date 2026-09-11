import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Materials() {
  const { chapterId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH MATERIALS =================
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/material",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch materials"
          );
        }

        // Filter materials according to selected chapter
const filteredMaterials = data.materials.filter(
  (material) =>
    material.chapter &&
    String(material.chapter._id) === String(chapterId)
);
        setMaterials(filteredMaterials);

        // Get chapter name
        if (filteredMaterials.length > 0) {
          setChapterName(
            filteredMaterials[0].chapter.name
          );
        }
      } catch (err) {
        console.error("Materials error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && chapterId) {
      fetchMaterials();
    } else {
      setLoading(false);
      setError("Please login first.");
    }
  }, [token, chapterId]);

  // ================= MATERIAL ICON =================
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

  // ================= MATERIAL TYPE =================
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

  return (
    <>
      <AppNavbar />

      {/* ================= HERO SECTION ================= */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5 text-center">

          <span className="badge bg-light text-primary px-3 py-2 mb-3">
            CLASS 10
          </span>

          <h1 className="display-5 fw-bold mb-3">
            {chapterName
              ? chapterName
              : "Study Materials"}
          </h1>

          <p
            className="lead mx-auto mb-0"
            style={{ maxWidth: "700px" }}
          >
            Explore notes, PDFs, videos, and other useful
            learning resources for this chapter.
          </p>

        </div>
      </section>

      {/* ================= MATERIALS SECTION ================= */}
      <section className="py-5">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              STUDY MATERIALS
            </span>

            <h2 className="fw-bold mt-2">
              Start Learning
            </h2>

            <p className="text-secondary">
              Choose a learning resource from the available materials.
            </p>

          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="text-center py-5">

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

          {/* ================= ERROR ================= */}
          {!loading && error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {/* ================= MATERIALS ================= */}
          {!loading && !error && (
            <div className="row g-4">

              {materials.length === 0 ? (
                <div className="col-12 text-center py-5">

                  <div className="mb-3">
                    <span className="fs-1">
                      📚
                    </span>
                  </div>

                  <h5 className="fw-bold">
                    No materials available
                  </h5>

                  <p className="text-secondary">
                    There are currently no study materials
                    available for this chapter.
                  </p>

                </div>
              ) : (
                materials.map((material) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={material._id}
                  >

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                      <div className="card-body p-4 d-flex flex-column">

                        {/* ================= ICON ================= */}
                        <div
                          className="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center mb-4"
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                        >
                          <span className="fs-2">
                            {getMaterialIcon(material.type)}
                          </span>
                        </div>

                        {/* ================= TYPE ================= */}
                        <span className="badge bg-primary align-self-start mb-3">
                          {getMaterialType(material.type)}
                        </span>

                        {/* ================= TITLE ================= */}
                        <h4 className="fw-bold mb-3">
                          {material.title}
                        </h4>

                        {/* ================= DESCRIPTION ================= */}
                        <p className="text-secondary mb-4">
                          {material.description}
                        </p>

                        {/* ================= ACTION ================= */}
                        <div className="mt-auto">

                          {/* NOTES */}
                          {material.type === "notes" && (
                            <button
                              className="btn btn-primary w-100"
                              onClick={() =>
                                navigate(
                                  `/materials/${material._id}/view`
                                )
                              }
                            >
                              Read Notes
                            </button>
                          )}

                          {/* PDF */}
                          {material.type === "pdf" && (
                            <a
                              href={`${material.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary w-100"
                            >
                              Open PDF
                            </a>
                          )}

                          {/* VIDEO */}
                          {material.type === "video" && (
                            <a
                              href={material.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary w-100"
                            >
                              Watch Video
                            </a>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                ))
              )}

            </div>
          )}

        </div>

      </section>

      {/* ================= LEARNING PATH ================= */}
      <section className="py-5 bg-light">

        <div className="container py-5">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              YOUR LEARNING PATH
            </span>

            <h2 className="fw-bold mt-2">
              Keep Learning
            </h2>

            <p className="text-secondary">
              Follow the path to explore more Class 10 resources.
            </p>

          </div>

          <div className="row g-4">

            {/* Step 1 */}
            <div className="col-md-4">

              <div className="text-center">

                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold fs-4"
                  style={{
                    width: "65px",
                    height: "65px",
                  }}
                >
                  01
                </div>

                <h5 className="fw-bold">
                  Choose a Subject
                </h5>

                <p className="text-secondary">
                  Select Science, Mathematics, or English.
                </p>

              </div>

            </div>

            {/* Step 2 */}
            <div className="col-md-4">

              <div className="text-center">

                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold fs-4"
                  style={{
                    width: "65px",
                    height: "65px",
                  }}
                >
                  02
                </div>

                <h5 className="fw-bold">
                  Select a Chapter
                </h5>

                <p className="text-secondary">
                  Choose the chapter you want to study.
                </p>

              </div>

            </div>

            {/* Step 3 */}
            <div className="col-md-4">

              <div className="text-center">

                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold fs-4"
                  style={{
                    width: "65px",
                    height: "65px",
                  }}
                >
                  03
                </div>

                <h5 className="fw-bold">
                  Start Learning
                </h5>

                <p className="text-secondary">
                  Access your notes, PDFs, and videos.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="py-5">

        <div className="container py-4">

          <div className="bg-primary text-white rounded-4 p-5 text-center">

            <h2 className="fw-bold mb-3">
              Explore Another Chapter
            </h2>

            <p className="lead mb-4">
              Go back and choose another chapter to continue learning.
            </p>

            <button
              className="btn btn-light px-4"
              onClick={() => navigate(-1)}
            >
              Back to Chapters
            </button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Materials;