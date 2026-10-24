import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icon from "./Icon";

const features = [
  { icon: "openBook", title: "Organized learning", description: "Study subject by subject and chapter by chapter, with everything easy to find." },
  { icon: "target", title: "Focused progress", description: "Keep your attention on the concepts that matter and learn at your own pace." },
  { icon: "file", title: "Useful resources", description: "Access notes, PDFs, videos, and other materials from one learning space." },
];

function WhyLearning() {
  return (
    <section className="feature-section" id="why-classora">
      <div className="container">
        <div className="section-heading text-center mb-5">
          <p className="section-kicker">LEARN BETTER</p>
          <h2>Why choose Classora?</h2>
          <p>Everything you need to make Class 10 learning simple, organized, and effective.</p>
        </div>
        <Row className="g-4 justify-content-center">
          {features.map((feature, index) => (
            <Col key={feature.title} md={4} sm={6} xs={12}>
              <Card className="feature-card h-100">
                <Card.Body className="p-4 p-lg-5">
                  <span className="feature-index">0{index + 1}</span>
                  <div className="feature-icon"><Icon name={feature.icon} size={27} /></div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
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
