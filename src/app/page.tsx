import About from "@/components/portfolio/About";
import BackgroundGlow from "@/components/portfolio/BackgroundGlow";
import Contact from "@/components/portfolio/Contact";
import Experience from "@/components/portfolio/Experience";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Navbar from "@/components/portfolio/Navbar";
import Process from "@/components/portfolio/Process";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import WhyMe from "@/components/portfolio/WhyMe";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <BackgroundGlow />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Process />
      <WhyMe />
      <Contact />
      <Footer />
    </main>
  );
}
