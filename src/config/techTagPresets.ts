export type TechTag = {
  name: string;
  textColor: string;
  backgroundColor: string;
};

export const techTagPresets = {
  express: {
    name: "Express",
    textColor: "#ffffff",
    backgroundColor: "#81818180",
  },
  typeScript: {
    name: "TypeScript",
    textColor: "#a2c8f2",
    backgroundColor: "#164f8c80",
  },
  scss: {
    name: "SCSS",
    textColor: "#f7edf3",
    backgroundColor: "#ab487b80",
  },
  mongoDb: {
    name: "MongoDB",
    textColor: "#bcebcf",
    backgroundColor: "#148f4780",
  },
  socketIo: {
    name: "Socket.IO",
    textColor: "#ffffff",
    backgroundColor: "#81818180",
  },
  react: {
    name: "React",
    textColor: "#e0f8ff",
    backgroundColor: "#0f4b5c80",
  },
  angular: {
    name: "Angular",
    textColor: "#f7b5c9",
    backgroundColor: "#87173980",
  },
  firebase: {
    name: "Firebase",
    textColor: "#fce4bd",
    backgroundColor: "#80571780",
  },
  tailwind: {
    name: "Tailwind",
    textColor: "#c7ecf0",
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
