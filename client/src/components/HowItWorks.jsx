import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icon from "./Icon";

const steps = [
  { number: "01", icon: "lock", title: "Create an account", description: "Register or log in to open your learning space." },
  { number: "02", icon: "book", title: "Choose a subject", description: "Pick Science, Mathematics, or English to get started." },
  { number: "03", icon: "list", title: "Select a chapter", description: "Find a chapter and see the resources available for it." },
  { number: "04", icon: "play", title: "Start learning", description: "Read, watch, and revisit materials whenever you need." },
];

function HowItWorks() {
  return (
    <section className="steps-section" id="how-it-works">
      <div className="container">
        <div className="section-heading text-center mb-5">
          <p className="section-kicker">SIMPLE BY DESIGN</p>
          <h2>How learning works</h2>
          <p>Four small steps take you from choosing a subject to exploring its resources.</p>
        </div>
        <Row className="g-4 justify-content-center">
          {steps.map((step) => (
            <Col key={step.number} lg={3} md={6} xs={12}>
              <Card className="step-card h-100">
                <Card.Body className="p-4">
                  <div className="step-topline"><span>STEP {step.number}</span><Icon name={step.icon} size={19} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
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
