import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "🔐",
      title: "Create an Account",
      description:
        "Register or log in to your Classora account to start learning.",
    },
    {
      number: "02",
      icon: "📚",
      title: "Choose a Subject",
      description:
        "Select Science, Mathematics or English based on what you want to study.",
    },
    {
      number: "03",
      icon: "📖",
      title: "Select a Chapter",
      description:
        "Choose the chapter you want to learn and explore its available content.",
    },
    {
      number: "04",
      icon: "🎯",
      title: "Start Learning",
      description:
        "Access study materials and learn important Class 10 concepts at your pace.",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <p className="text-primary fw-semibold text-uppercase mb-2">
            Simple Learning
          </p>

          <h2 className="fw-bold display-6">
            How It Works
          </h2>

          <p
            className="text-muted mx-auto mt-3"
            style={{ maxWidth: "650px" }}
          >
            Start learning in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <Row className="g-4 justify-content-center">
          {steps.map((step) => (
            <Col key={step.number} lg={3} md={6} xs={12}>

              <Card
                className="h-100 border-0 text-center"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#f8faff",
                }}
              >
                <Card.Body className="p-4">

                  {/* Number */}
                  <div className="text-primary fw-bold mb-3">
                    STEP {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-4"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      backgroundColor: "#e7f1ff",
                      fontSize: "30px",
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h5 className="fw-bold mb-3">
                    {step.title}
                  </h5>

                  {/* Description */}
                  <p className="text-muted lh-lg mb-0">
                    {step.description}
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

export default HowItWorks;