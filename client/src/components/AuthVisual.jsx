import Icon from "./Icon";

const cards = [
  { icon: "flask", label: "SCIENCE", className: "auth-float-card auth-float-card--one" },
  { icon: "ruler", label: "MATH", className: "auth-float-card auth-float-card--two" },
  { icon: "language", label: "ENGLISH", className: "auth-float-card auth-float-card--three" },
];

function AuthVisual() {
  return (
    <div className="auth-visual" aria-hidden="true">
      <div className="auth-visual-orbit auth-visual-orbit--one" />
      <div className="auth-visual-orbit auth-visual-orbit--two" />
      <div className="auth-visual-core"><Icon name="cap" size={34} /><span>KEEP<br />GROWING</span></div>
      {cards.map((card) => (
        <div key={card.label} className={card.className}>
          <Icon name={card.icon} size={21} />
          <span>{card.label}</span>
        </div>
      ))}
    </div>
  );
}

export default AuthVisual;
