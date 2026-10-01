import BackgroundGlow from "@/components/portfolio/BackgroundGlow";
import Contact from "@/components/portfolio/Contact";
import Education from "@/components/portfolio/Education";
import Experience from "@/components/portfolio/Experience";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Navbar from "@/components/portfolio/Navbar";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <BackgroundGlow />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
