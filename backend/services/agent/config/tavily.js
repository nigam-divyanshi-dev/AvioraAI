//for web search tool we use tavily

import { TavilySearch } from "@langchain/tavily";

export const searchTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
  includeImages: true
});