import AppNavbar from "../components/Navbar";
import HomeCarousel from "../components/HomeCarousel";
import Welcome from "../components/welcome";
import Cards from "../components/Cards";
import WhyLearning from "../components/Whylearning";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-page">
      <AppNavbar />
      <main>
        <HomeCarousel />
        <Welcome />
        <Cards />
        <WhyLearning />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
