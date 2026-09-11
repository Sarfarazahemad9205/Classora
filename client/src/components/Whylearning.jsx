import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function WhyLearning() {
  const features = [
    {
      icon: "📚",
      title: "Organized Learning",
      description:
        "Study subject-wise and chapter-wise with everything organized in one place.",
    },
    {
      icon: "🎯",
      title: "Focused Learning",
      description:
        "Focus on important Class 10 concepts and learn at your own pace.",
    },
    {
      icon: "📄",
      title: "Study Materials",
      description:
        "Access useful notes, PDFs, videos and other learning materials easily.",
    },
  ];

  return (
    <section className="bg-light py-5">
      <div className="container">

        {/* Section Heading */}
        <div className="text-center mb-5">
          <p className="text-primary fw-semibold text-uppercase mb-2">
            Learn Better
          </p>

          <h2 className="fw-bold display-6">
            Why Choose Classora?
          </h2>

          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "650px" }}>
            Everything you need to make your Class 10 learning simple,
            organized and effective.
          </p>
        </div>

        {/* Feature Cards */}
        <Row className="g-4 justify-content-center">

          {features.map((feature) => (
            <Col key={feature.title} md={4} sm={6} xs={12}>

              <Card
                className="h-100 border-0 text-center shadow-sm"
                style={{
                  borderRadius: "18px",
                }}
              >
                <Card.Body className="p-4 p-lg-5">

                  {/* Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-4"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "18px",
                      backgroundColor: "#e7f1ff",
                      fontSize: "32px",
                    }}
                  >
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h4 className="fw-bold mb-3">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-muted mb-0 lh-lg">
                    {feature.description}
                  </p>

                </Card.Body>
              </Card>

            </Col>
          ))}

        </Row>
      </div>
    </section>
  );
}

export default WhyLearning;