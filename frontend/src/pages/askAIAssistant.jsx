import { useState, useRef, useEffect } from "react";
import { Send, Sprout, User, Loader2, ChevronLeft } from "lucide-react";
import Sidebar from "../components/navs/sidebar";
import Header from "../components/header";
import { askAssistant } from "../api/assistant";
import { useNavigate } from "react-router-dom";


const initialMessages = [
  {
    role: "assistant",
    text: "Hi! I'm here to help with anything on your farm — crop issues, livestock questions, or general advice. What's on your mind?",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    const question = input.trim();
    if (!question || sending) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setError("");

    try {
      setSending(true);
      const response = await askAssistant(question);
      setMessages((prev) => [...prev, { role: "assistant", text: response.data.answer }]);
    } catch (err) {
      setError(err.response?.data?.message || "The assistant couldn't respond. Try again.");
    } finally {
      setSending(false);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSend();
  //   }
  // };

  return (
    <>
      <main className="w-full bg-gray-250  flex flex-col min-h-screen">

        <div className="flex items-center justify-between bg-gray-100 border-b border-gray-100 p-2 fixed top-0 z-10 w-full">
          <button
            onClick={() => navigate(-1)}
            className="m-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>

          <div className="m-4 shrink-0">
            <h1 className="text-sm font-semibold text-gray-900">Ask AI Assistant</h1>
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-18 border bg-gray-500 border-gray-100 flex flex-col overflow-hidden ">
          <div className="flex-1 overflow-y-auto p-5 space-y-4 mb-10">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"
                    }`}
                >
                  {m.role === "user" ? <User size={14} /> : <Sprout size={14} />}
                </div>

                <div
                  className={`max-w-md text-sm px-4 py-2.5 rounded-2xl whitespace-pre-wrap ${m.role === "user"
                    ? "bg-green-600 text-white rounded-tr-sm"
                    : "bg-gray-50 text-gray-700 rounded-tl-sm"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                  <Sprout size={14} />
                </div>
                <div className="bg-gray-50 text-gray-500 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 bg-white justify-center flex ">
            <div className="fixed bottom-5 w-11/12 z-10 ">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask our AI assistant"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-12 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-300"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-green-600 transition hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    
    </>
  );
};

export default Chat;
