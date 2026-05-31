import { lazy, Suspense } from "react";

type RiveMemoryEngineProps = {
  riveSrc?: string;
};

type RiveCanvasProps = {
  src: string;
};

const RiveCanvas = lazy(async () => {
  const { Alignment, Fit, Layout, useRive } = await import("@rive-app/react-canvas");

  function RiveCanvasInner({ src }: RiveCanvasProps) {
    const { RiveComponent } = useRive({
      src,
      autoplay: true,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
    });

    return <RiveComponent className="rive-canvas" />;
  }

  return { default: RiveCanvasInner };
});

export function RiveMemoryEngine({ riveSrc }: RiveMemoryEngineProps) {
  if (riveSrc) {
    return (
      <div className="ribbon-layer" aria-hidden="true">
        <Suspense fallback={null}>
          <RiveCanvas src={riveSrc} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="ribbon-layer" aria-hidden="true">
      <svg className="ribbon-svg" viewBox="0 0 1120 720" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ribbonGradient" x1="88" x2="1040" y1="392" y2="330" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="0.48" stopColor="#22d3ee" />
            <stop offset="0.78" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#9fb7ff" />
          </linearGradient>
          <filter id="ribbonBlur" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <path
          className="ribbon-path ribbon-glow"
          d="M88 410 C206 332 316 292 408 332 C520 380 592 470 734 434 C850 404 920 338 1040 338"
          fill="none"
          filter="url(#ribbonBlur)"
          stroke="url(#ribbonGradient)"
          strokeLinecap="round"
          strokeWidth="20"
        />
        <path
          className="ribbon-path ribbon-core"
          d="M88 410 C206 332 316 292 408 332 C520 380 592 470 734 434 C850 404 920 338 1040 338"
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <circle className="ribbon-pulse pulse-one" cx="186" cy="354" r="8" fill="#3b82f6" />
        <circle className="ribbon-pulse pulse-two" cx="516" cy="380" r="8" fill="#22d3ee" />
        <circle className="ribbon-pulse pulse-three" cx="850" cy="404" r="8" fill="#9f7aea" />
      </svg>
    </div>
  );
}
