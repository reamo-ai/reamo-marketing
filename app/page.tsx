import Hero from "@/components/Hero";
import FeaturesHeadline from "@/components/FeaturesHeadline";
import FeaturesCards from "@/components/FeaturesCards";
import SeeReamoInAction from "@/components/SeeReamoInAction";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ReamoGetsBack from "@/components/ReamoGetsBack";
import KeepInTouch from "@/components/KeepInTouch";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-screen" />
      <Stats />
      <FeaturesHeadline />
      <FeaturesCards />
      <HowItWorks />
      <SeeReamoInAction />
      <Pricing />
      <ReamoGetsBack />
      <KeepInTouch />
    </main>
  );
}
