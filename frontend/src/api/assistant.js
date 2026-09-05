import API from "./axios";

export const askAssistant = (question) => API.post("/assistant/chat", { question });