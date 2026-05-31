import { useRef } from "react";
import { LandingHeader } from "../components/landing/LandingHeader";
import { HeroSection } from "../components/landing/HeroSection";
import { useLandingMotion } from "../hooks/useLandingMotion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLandingMotion(rootRef, sceneRef, reducedMotion);

  return (
    <div className="landing-page" ref={rootRef}>
      <div className="page-aurora" aria-hidden="true" />
      <LandingHeader />
      <main>
        <HeroSection sceneRef={sceneRef} />
      </main>
    </div>
  );
}
