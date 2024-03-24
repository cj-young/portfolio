import chatAppMarkdown from "./projects-markdown/chatApp.md?raw";
import chessAppMarkdown from "./projects-markdown/chessApp.md?raw";
import codeEditorMarkdown from "./projects-markdown/codeEditor.md?raw";

export type CopywriteItem = {
  description: string;
  additionalMarkdown: string;
};

export const copywriting = {
  chessApp: {
    description:
      "This is a full stack chess app built with the MERN stack. It supports multiplayer, games against bots at varying difficulties, and engine analysis.",
    additionalMarkdown: chessAppMarkdown,
  },
  chatApp: {
    description:
      "This is a chat app built with Next.js that is similar to services like Discord. It features direct messages, group chats, servers, voice calls, and more.",
    additionalMarkdown: chatAppMarkdown,
  },
  codeEditor: {
    description:
      "This is a simple online code editor built with Angular and Firebase. It includes live code output, a gallery of other users’ works, and the ability to share your own creations.",
    additionalMarkdown: codeEditorMarkdown,
  },
} as const satisfies Record<string, CopywriteItem>;
