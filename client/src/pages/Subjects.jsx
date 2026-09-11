import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Subjects() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/subjects",
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
            data.message || "Failed to fetch subjects"
          );
        }

        setSubjects(data.subjects);
      } catch (err) {
        console.error("Subjects error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSubjects();
    } else {
      setLoading(false);
      setError("Please login first.");
    }
  }, [token]);

  // Get icon based on subject name
  const getSubjectIcon = (name) => {
    if (name.toLowerCase() === "science") {
      return "🔬";
    }

    if (name.toLowerCase() === "mathematics") {
      return "📐";
    }

    if (name.toLowerCase() === "english") {
      return "📖";
    }

    return "📚";
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
            Explore Your Subjects
          </h1>

          <p
            className="lead mx-auto mb-0"
            style={{ maxWidth: "700px" }}
          >
            Choose a subject and start exploring chapters, concepts,
            and learning materials designed to support your Class 10 studies.
          </p>

        </div>
      </section>

      {/* ================= SUBJECTS ================= */}
      <section className="py-5" id="subjects">
        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              OUR SUBJECTS
            </span>

            <h2 className="fw-bold mt-2">
              What Would You Like to Learn?
            </h2>

            <p className="text-secondary">
              Select a subject to explore its chapters and available materials.
            </p>

          </div>

          {/* Loading */}
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
                Loading subjects...
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="container">
              <div className="alert alert-danger text-center">
                {error}
              </div>
            </div>
          )}

          {/* Subjects */}
          {!loading && !error && (
            <div className="row g-4">

              {subjects.length === 0 ? (
                <div className="col-12 text-center py-5">

                  <p className="text-secondary">
                    No subjects available.
                  </p>

                </div>
              ) : (
                subjects.map((subject) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={subject._id}
                  >

                    <div
                      className="card border-0 shadow-sm rounded-4 h-100"
                    >

                      <div className="card-body p-4 d-flex flex-column">

                        {/* Icon */}
                        <div
                          className="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center mb-4"
                          style={{
                            width: "75px",
                            height: "75px",
                          }}
                        >
                          <span className="fs-1">
                            {getSubjectIcon(subject.name)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="fw-bold mb-3">
                          {subject.name}
                        </h3>

                        {/* Description */}
                        <p className="text-secondary mb-4">
                          {subject.description}
                        </p>

                        {/* Button */}
                        <div className="mt-auto">

                          <button
                            className="btn btn-primary w-100"
                            onClick={() =>
                              navigate(`/chapters/${subject._id}`)
                            }
                          >
                            Explore {subject.name}
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
              HOW TO LEARN
            </span>

            <h2 className="fw-bold mt-2">
              Your Learning Path
            </h2>

            <p className="text-secondary">
              Follow a simple path to find the resources you need.
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
                  Access the available study materials.
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
              Ready to Start Learning?
            </h2>

            <p className="lead mb-4">
              Choose your subject and begin your Class 10 learning journey.
            </p>

            <a
              href="#subjects"
              className="btn btn-light px-4"
            >
              Explore Subjects
            </a>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Subjects;