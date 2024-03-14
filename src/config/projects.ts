export type Project = {
  name: string;
  id: string;
  backgroundColor: string;
};

const projectConfigs = {
  chessApp: {
    name: "Com.chess",
    id: "com-chess",
    backgroundColor: "#4e1889",
  },
  whischat: {
    name: "Whischat",
    id: "whischat",
    backgroundColor: "#008533",
  },
  devforge: {
    name: "DevForge",
    id: "dev-forge",
    backgroundColor: "#cb2835",
  },
} as const satisfies Record<string, Project>;

export default projectConfigs;
