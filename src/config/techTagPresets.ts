export type TechTag = {
  name: string;
  textColor: string;
  backgroundColor: string;
};

export const techTagPresets = {
  express: {
    name: "Express",
    textColor: "#ffffff",
    backgroundColor: "#ffffff80",
  },
  typeScript: {
    name: "TypeScript",
    textColor: "#a2c8f2",
    backgroundColor: "#164f8c80",
  },
  scss: {
    name: "SCSS",
    textColor: "#ebbcd4",
    backgroundColor: "#ab487b80",
  },
  mongoDb: {
    name: "MongoDB",
    textColor: "#2fde77",
    backgroundColor: "#148f4780",
  },
  socketIo: {
    name: "Socket.IO",
    textColor: "#ffffff",
    backgroundColor: "#ffffff80",
  },
  react: {
    name: "React",
    textColor: "#9ae7fc",
    backgroundColor: "#1b6f8780",
  },
  angular: {
    name: "Angular",
    textColor: "#f7b5c9",
    backgroundColor: "#87173980",
  },
  firebase: {
    name: "Firebase",
    textColor: "#f5cc89",
    backgroundColor: "#80571780",
  },
  tailwind: {
    name: "Tailwind",
    textColor: "#91e6ed",
    backgroundColor: "#176e7580",
  },
  next: {
    name: "Next.js",
    textColor: "#e3e3e3",
    backgroundColor: "#5d5d5d80",
  },
  webRtc: {
    name: "WebRTC",
    textColor: "#ffeeab",
    backgroundColor: "#87721e80",
  },
} as const satisfies Record<string, TechTag>;
