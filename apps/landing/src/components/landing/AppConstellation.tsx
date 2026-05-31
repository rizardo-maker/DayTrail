import { signalApps } from "./landingData";

export function AppConstellation() {
  return (
    <div className="signal-field" aria-hidden="true">
      <svg className="connector-lines" viewBox="0 0 1120 720" preserveAspectRatio="none">
        <path d="M118 168 C232 200 312 250 424 328" />
        <path d="M106 306 C224 314 320 326 432 342" />
        <path d="M130 452 C244 414 336 384 448 358" />
      </svg>

      {signalApps.map((app, index) => (
        <span className={`signal-node signal-node-${index + 1}`} key={app.name}>
          <img src={app.icon} alt="" loading="eager" />
          {app.name}
        </span>
      ))}
    </div>
  );
}
