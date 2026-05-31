import type { RefObject } from "react";
import { AppStrip } from "./AppStrip";
import { HeroCopy } from "./HeroCopy";
import { HeroScene } from "./HeroScene";
import { ProofBand } from "./ProofBand";

type HeroSectionProps = {
  sceneRef: RefObject<HTMLDivElement>;
};

export function HeroSection({ sceneRef }: HeroSectionProps) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid">
          <HeroCopy />
          <HeroScene sceneRef={sceneRef} />
        </div>
      </section>
      <AppStrip />
      <ProofBand />
    </>
  );
}
