const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const links = {
  releases: "https://github.com/varaprasadreddy9676/DayTrail/releases/latest",
  demo: `${import.meta.env.BASE_URL}videos/daytrail-demo.mp4`,
  source: "https://github.com/varaprasadreddy9676/DayTrail",
};

export const assets = {
  brandMark: asset("assets/daytrail-brand.svg"),
  daytrailIcon: asset("assets/daytrail-icon.png"),
  apps: {
    brave: asset("assets/app-icons/brave.png"),
    chatgpt: asset("assets/app-icons/chatgpt.png"),
    chrome: asset("assets/app-icons/chrome.png"),
    cursor: asset("assets/app-icons/cursor.png"),
    github: asset("assets/app-icons/github.png"),
    notion: asset("assets/app-icons/notion.png"),
    slack: asset("assets/app-icons/slack.svg"),
    terminal: asset("assets/app-icons/terminal.png"),
    vscode: asset("assets/app-icons/vscode.png"),
  },
};

export const signalApps = [
  { name: "VS Code", icon: assets.apps.vscode },
  { name: "Chrome", icon: assets.apps.chrome },
  { name: "Terminal", icon: assets.apps.terminal },
  { name: "ChatGPT", icon: assets.apps.chatgpt },
  { name: "Slack", icon: assets.apps.slack },
];

export const appStrip = [
  { name: "VS Code", icon: assets.apps.vscode },
  { name: "Chrome", icon: assets.apps.chrome },
  { name: "Brave", icon: assets.apps.brave },
  { name: "Terminal", icon: assets.apps.terminal },
  { name: "ChatGPT", icon: assets.apps.chatgpt },
  { name: "Slack", icon: assets.apps.slack },
  { name: "Notion", icon: assets.apps.notion },
  { name: "Cursor", icon: assets.apps.cursor },
  { name: "GitHub", icon: assets.apps.github },
];
