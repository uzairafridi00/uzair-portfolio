import "./styles/globals.css";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import About     from "./components/About";
import Process   from "./components/Process";
import Portfolio from "./components/Portfolio";
import Services  from "./components/Services";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Process />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
