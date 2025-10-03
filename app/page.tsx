import Hero from "./components/Hero";
import ImpactSlider from "./components/ImpactSlider";
import ImpactCounters from "./components/ImpactCounters";
import Programs from "./components/Programs";
import { impactData, programsData } from "./data/impactData";
import DonateCTA from "./components/DonateCTA";
import Volunteers from "./components/Volunteers";

export default function Home() {
  return (
    <>
      <ImpactSlider className="mb-8" />
      <Hero />
      <ImpactCounters items={impactData} />
      <Programs items={programsData} />
      <Volunteers />
      <DonateCTA />
    </>
  );
}
