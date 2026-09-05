import API from "./axios";

export const askAssistant = (question) => API.post("/api/assistant/chat", { question });