import API from "./axios";

export const askAssistant = (question) => API.post("/assistant/chat", { question });

export const getFarmKnowledge = () => API.get("/farm-knowledge");