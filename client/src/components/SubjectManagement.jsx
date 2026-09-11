import { useState } from "react";

function SubjectManagement({ token, subjects, setSubjects }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateSubject = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Please enter subject name.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter subject description.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create subject"
        );
      }

      setMessage(
        data.message || "Subject created successfully."
      );

      setName("");
      setDescription("");

      // Add newly created subject to the existing list
      if (data.subject) {
        setSubjects((prevSubjects) => [
          ...prevSubjects,
          data.subject,
        ]);
      }
    } catch (err) {
      console.error("Create subject error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-5">

      <div className="card-body p-4 p-md-5">

        <div className="text-center mb-4">

          <span className="text-primary fw-bold">
            SUBJECT MANAGEMENT
          </span>

          <h2 className="fw-bold mt-2">
            Create New Subject
          </h2>

          <p className="text-secondary">
            Add subjects such as Kannada, Hindi, English,
            Mathematics, Science, and more.
          </p>

        </div>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateSubject}>

          {/* SUBJECT NAME */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Subject Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter subject name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Subject Description
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter subject description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading
              ? "Creating Subject..."
              : "Create Subject"}
          </button>

        </form>

        {/* EXISTING SUBJECTS */}

        <hr className="my-5" />

        <div>

          <h4 className="fw-bold mb-3">
            Existing Subjects
          </h4>

          {subjects.length === 0 ? (
            <p className="text-secondary">
              No subjects created yet.
            </p>
          ) : (
            <div className="list-group">

              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="list-group-item"
                >

                  <h6 className="fw-bold mb-1">
                    {subject.name}
                  </h6>

                  <p className="mb-0 text-secondary">
                    {subject.description}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default SubjectManagement;