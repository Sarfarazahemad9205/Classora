import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Chapters() {
  const { subjectId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH CHAPTERS =================
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/chapters",
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
            data.message || "Failed to fetch chapters"
          );
        }

        // Filter chapters according to selected subject
        const filteredChapters = data.chapters.filter(
          (chapter) =>
            chapter.subject &&
            chapter.subject._id === subjectId
        );

        setChapters(filteredChapters);

        // Get subject name
        if (filteredChapters.length > 0) {
          setSubjectName(
            filteredChapters[0].subject.name
          );
        }
      } catch (err) {
        console.error("Chapters error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && subjectId) {
      fetchChapters();
    } else {
      setLoading(false);
      setError("Please login first.");
    }
  }, [token, subjectId]);

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
            {subjectName
              ? `${subjectName} Chapters`
              : "Explore Chapters"}
          </h1>

          <p
            className="lead mx-auto mb-0"
            style={{ maxWidth: "700px" }}
          >
            Choose a chapter and start learning with organized
            study materials designed for Class 10 students.
          </p>

        </div>
      </section>

      {/* ================= CHAPTERS SECTION ================= */}
      <section className="py-5">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              CHAPTERS
            </span>

            <h2 className="fw-bold mt-2">
              Select a Chapter
            </h2>

            <p className="text-secondary">
              Choose the chapter you want to study.
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
                Loading chapters...
              </p>

            </div>
          )}

          {/* ================= ERROR ================= */}
          {!loading && error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {/* ================= CHAPTERS ================= */}
          {!loading && !error && (
            <div className="row g-4">

              {chapters.length === 0 ? (
                <div className="col-12 text-center py-5">

                  <div className="mb-3">
                    <span className="fs-1">
                      📚
                    </span>
                  </div>

                  <h5 className="fw-bold">
                    No chapters available
                  </h5>

                  <p className="text-secondary">
                    There are currently no chapters available
                    for this subject.
                  </p>

                </div>
              ) : (
                chapters.map((chapter, index) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={chapter._id}
                  >

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                      <div className="card-body p-4 d-flex flex-column">

                        {/* Chapter Number */}
                        <div
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold mb-4"
                          style={{
                            width: "55px",
                            height: "55px",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Chapter Name */}
                        <h4 className="fw-bold mb-3">
                          {chapter.name}
                        </h4>

                        {/* Chapter Description */}
                        <p className="text-secondary mb-4">
                          {chapter.description ||
                            "Explore this chapter and learn the important concepts."}
                        </p>

                        {/* Explore Button */}
                        <div className="mt-auto">

                          <button
                            className="btn btn-primary w-100"
                            onClick={() =>
                              navigate(
                                `/materials/${chapter._id}`
                              )
                            }
                          >
                            Explore Chapter
                          </button>

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
              From Subject to Learning
            </h2>

            <p className="text-secondary">
              Follow these simple steps to continue your
              learning journey.
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
                  Select the subject you want to study.
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
                  Choose the chapter you want to learn.
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
                  Access notes, PDFs, videos, and other
                  study materials.
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
              Want to Explore Another Subject?
            </h2>

            <p className="lead mb-4">
              Go back and choose another Class 10 subject.
            </p>

            <button
              className="btn btn-light px-4"
              onClick={() => navigate("/subjects")}
            >
              Back to Subjects
            </button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Chapters;