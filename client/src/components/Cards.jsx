import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Cards() {
  const subjects = [
    {
      name: "Science",
      icon: "🔬",
      description:
        "Learn Physics, Chemistry and Biology with easy-to-understand study materials.",
    },
    {
      name: "Mathematics",
      icon: "📐",
      description:
        "Master Algebra, Geometry, Trigonometry and other important concepts.",
    },
    {
      name: "English",
      icon: "📖",
      description:
        "Improve your grammar, literature, vocabulary and writing skills.",
    },
  ];

  return (
    <div className="container my-5">

      {/* Section heading */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">
          Our Subjects
        </h2>

        <p className="text-muted">
          Explore Class 10 subjects and start your learning journey.
        </p>
      </div>

      {/* Cards */}
      <Row className="g-4 justify-content-center">

        {subjects.map((subject) => (
          <Col key={subject.name} md={4} sm={6} xs={12}>

            <Card
              className="h-100 border-0 shadow-sm text-center"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >

              <Card.Body className="p-4">

                {/* Icon */}
                <div
                  style={{
                    fontSize: "55px",
                    marginBottom: "15px",
                  }}
                >
                  {subject.icon}
                </div>

                {/* Subject name */}
                <Card.Title className="fw-bold fs-3 text-primary">
                  {subject.name}
                </Card.Title>

                {/* Description */}
                <Card.Text className="text-muted mt-3">
                  {subject.description}
                </Card.Text>

                {/* Button */}
                <Button
                  variant="primary"
                  className="rounded-pill px-4 mt-2"
                >
                  Explore →
                </Button>

              </Card.Body>

            </Card>

          </Col>
        ))}

      </Row>
    </div>
  );
}

export default Cards;