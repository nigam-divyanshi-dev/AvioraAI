import { getModel } from "../config/llmModels.js";

export const router = async (state) => {
  const mime = state.file?.mimetype;
  console.log("file in router", mime);

  if (mime === "application/pdf") {
    return { ...state, agent: "pdfRag" };
  }

  if (mime?.startsWith("image/")) {
    return { ...state, agent: "imageAnalyzer" };
  }

  if (state.agent && state.agent !== "auto") {
    return { ...state, agent: state.agent };
  }

  const llm = await getModel("router");
  const prompt = `You are an agent router.

Available agents:

- chat
- search
- coding
- pdf
- ppt
- vision

Rules:

chat:
General conversation,
explanations,
learning,
questions.

search:
Current events,
latest information,
news,
recent developments,
internet lookup.

coding:
Generate code,
debug code,
build projects,
architecture,
API design.

pdf:
Questions about generate PDFs
or document context.

ppt:
Questions about generate ppts
or ppt context.

vision:
Generate image,
create image.

Return ONLY one word:

chat
search
coding
pdf
ppt
vision

User Query:
${state.prompt}`;

  const response = await llm.invoke(prompt);
  const agent = response.content.trim().toLowerCase();
  const valid = ["chat", "search", "coding", "pdf", "ppt", "vision"];

  return {
    ...state,
    agent: valid.includes(agent) ? agent : "chat",
  };
};