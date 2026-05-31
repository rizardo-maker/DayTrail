import { appStrip } from "./landingData";

export function AppStrip() {
  return (
    <section className="app-strip" aria-labelledby="apps-title">
      <p id="apps-title">Works with the apps you already use</p>
      <div className="chips">
        {appStrip.map((app) => (
          <span className="chip" key={app.name}>
            <img src={app.icon} alt="" loading="lazy" />
            {app.name}
          </span>
        ))}
      </div>
    </section>
  );
}
