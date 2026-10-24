import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

const subjects = [
  { name: "Science", icon: "flask", description: "Explore physics, chemistry, and biology with clear chapter guides and useful study materials." },
  { name: "Mathematics", icon: "ruler", description: "Build confidence in algebra, geometry, trigonometry, and other key concepts." },
  { name: "English", icon: "language", description: "Strengthen grammar, literature, vocabulary, and writing skills at your own pace." },
];

function Cards() {
  const navigate = useNavigate();
  return (
    <section className="subjects-section" id="subjects">
      <div className="container my-5">
        <div className="subjects-heading text-center mb-4">
          <p className="section-kicker">YOUR LEARNING, ORGANIZED</p>
          <h2 className="fw-bold">Choose a subject to begin</h2>
          <p className="text-muted">A clear path from the first concept to the final chapter.</p>
        </div>
        <Row className="g-4 justify-content-center">
          {subjects.map((subject, index) => (
            <Col key={subject.name} md={4} sm={6} xs={12}>
              <Card className={`subject-card subject-card--${index + 1} h-100`}>
                <Card.Body className="p-4 p-lg-5">
                  <div className="subject-icon"><Icon name={subject.icon} size={29} /></div>
                  <span className="subject-index">0{index + 1} / SUBJECT</span>
                  <Card.Title className="fw-bold">{subject.name}</Card.Title>
                  <Card.Text>{subject.description}</Card.Text>
                  <Button variant="primary" className="rounded-pill px-4 mt-2" onClick={() => navigate("/subjects")}>Explore subject <Icon name="arrow" size={16} /></Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default Cards;
