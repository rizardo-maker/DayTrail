import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

gsap.registerPlugin(useGSAP);

export function useLandingMotion(
  rootRef: RefObject<HTMLElement>,
  sceneRef: RefObject<HTMLElement>,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) {
        return;
      }

      const selector = gsap.utils.selector(root);
      const revealTargets = selector(
        ".motion-copy, .motion-cta, .mockup-shell, .app-strip, .proof-band",
      );

      gsap.set(revealTargets, { clearProps: "opacity,visibility" });
      gsap.set(selector(".timeline-segment"), { scaleX: 1, transformOrigin: "left center" });
      gsap.set(selector(".selected-hour"), { x: 0, clearProps: "opacity,visibility" });
      gsap.set(selector(".floating-card"), { y: 0, clearProps: "opacity,visibility" });

      if (reducedMotion) {
        gsap.set(selector(".ribbon-path"), { strokeDashoffset: 0 });
        return;
      }

      gsap.set(revealTargets, { y: 18 });
      gsap.set(selector(".timeline-segment"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(selector(".selected-hour"), { x: -26 });
      gsap.set(selector(".floating-card"), { y: 16 });

      selector(".ribbon-path").forEach((path) => {
        const svgPath = path as unknown as SVGPathElement;
        const length = svgPath.getTotalLength?.() ?? 900;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(selector(".motion-copy"), { y: 0, duration: 0.74, stagger: 0.07 })
        .to(selector(".motion-cta"), { y: 0, duration: 0.56, stagger: 0.06 }, "-=0.34")
        .to(selector(".ribbon-path"), { strokeDashoffset: 0, duration: 1.2, stagger: 0.12 }, "-=0.34")
        .to(selector(".mockup-shell"), { y: 0, duration: 0.76 }, "-=0.92")
        .to(selector(".timeline-segment"), { scaleX: 1, duration: 0.58, stagger: 0.07 }, "-=0.34")
        .to(selector(".selected-hour"), { x: 0, duration: 0.52 }, "-=0.2")
        .to(selector(".floating-card"), { y: 0, duration: 0.5, stagger: 0.11 }, "-=0.24")
        .to(selector(".app-strip, .proof-band"), { y: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");

      const loops = [
        gsap.to(selector(".mockup-shell"), {
          y: -8,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
        gsap.to(selector(".ribbon-pulse"), {
          opacity: 0.88,
          scale: 1.08,
          duration: 2.8,
          stagger: 0.38,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center",
        }),
        gsap.to(selector(".signal-node"), {
          x: (index) => [8, 12, 10, 14, 9][index % 5],
          y: (index) => [-4, 4, -2, 3, -3][index % 5],
          duration: 3.2,
          stagger: 0.16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
      ];

      const scene = sceneRef.current;
      const handlePointerMove = (event: PointerEvent) => {
        if (!scene) {
          return;
        }

        const rect = scene.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

        gsap.to(scene, {
          "--parallax-x": x.toFixed(3),
          "--parallax-y": y.toFixed(3),
          duration: 0.45,
          ease: "power2.out",
        });
      };

      const handlePointerLeave = () => {
        if (!scene) {
          return;
        }

        gsap.to(scene, {
          "--parallax-x": 0,
          "--parallax-y": 0,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      scene?.addEventListener("pointermove", handlePointerMove);
      scene?.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        scene?.removeEventListener("pointermove", handlePointerMove);
        scene?.removeEventListener("pointerleave", handlePointerLeave);
        intro.kill();
        loops.forEach((animation) => animation.kill());
      };
    },
    { scope: rootRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );
}
