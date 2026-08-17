import { useState } from "react";
import { Send, Sprout, User } from "lucide-react";
import Sidebar from "../components/navs/sidebar";
import Header from "../components/header";
import MobileNav from "../components/navs/mobileNav";

// ---- Dummy conversation (swap for real Claude API messages later) ----
const initialMessages = [
  {
    role: "assistant",
    text: "Hi Daniel! I'm here to help with anything on your farm — crop issues, livestock questions, or general advice. What's on your mind?",
  },
  {
    role: "user",
    text: "My tomato leaves are curling, what should I do?",
  },
  {
    role: "assistant",
    text: "Leaf curl on tomato is often caused by heat stress, inconsistent watering, or in some cases a viral infection spread by whiteflies. Since it's been humid lately, check the undersides of the leaves for tiny insects first. If you don't see any, try keeping watering consistent rather than letting the soil dry out between waterings.",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  // Placeholder handler — wire up real Claude API call later
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileNav />
        <div className="w-full p-6 xl:mt-20 mt-28 mb-20 bg-gray-50 flex flex-col" style={{ height: "calc(100vh - 5rem)" }}>
          {/* Page header */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Ask AI Assistant</h1>
            <p className="text-gray-500 text-sm mt-1">Ask anything about your crops, livestock, or farm.</p>
          </div>

          {/* Chat window */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      m.role === "user" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {m.role === "user" ? <User size={14} /> : <Sprout size={14} />}
                  </div>
                  <div
                    className={`max-w-md text-sm px-4 py-2.5 rounded-2xl ${
                      m.role === "user"
                        ? "bg-green-600 text-white rounded-tr-sm"
                        : "bg-gray-50 text-gray-700 rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your question..."
                  className="w-full pl-4 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
