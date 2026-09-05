// import { useState } from "react";
// import { Send, Sprout, User } from "lucide-react";
// import Sidebar from "../components/navs/sidebar";
// import Header from "../components/header";

// // ---- Dummy conversation (swap for real Claude API messages later) ----
// const initialMessages = [
//   {
//     role: "assistant",
//     text: "Hi Daniel! I'm here to help with anything on your farm — crop issues, livestock questions, or general advice. What's on your mind?",
//   },
//   {
//     role: "user",
//     text: "My tomato leaves are curling, what should I do?",
//   },
//   {
//     role: "assistant",
//     text: "Leaf curl on tomato is often caused by heat stress, inconsistent watering, or in some cases a viral infection spread by whiteflies. Since it's been humid lately, check the undersides of the leaves for tiny insects first. If you don't see any, try keeping watering consistent rather than letting the soil dry out between waterings.",
//   },
// ];

// const Chat = () => {
//   const [messages, setMessages] = useState(initialMessages);
//   const [input, setInput] = useState("");

//   // Placeholder handler — wire up real Claude API call later
//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { role: "user", text: input }]);
//     setInput("");
//   };

//   return (
//     <>
//       <Header />

//       <div className="flex min-h-screen">
//         <Sidebar />

//         <main className="w-full bg-gray-50  xl:mt-20 mt-28 flex flex-col min-h-screen">
//           {/* Page header */}
//           <div className="m-4 shrink-0">
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Ask AI Assistant
//             </h1>

//             <p className="text-gray-500 text-sm mt-1">
//               Ask anything about your crops, livestock, or farm.
//             </p>
//           </div>

//           {/* Chat container */}
//           <div className="flex-1 min-h-0 bg-white border border-gray-100 flex flex-col overflow-hidden">

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-5 space-y-4 ">
//               {messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""
//                     }`}
//                 >
//                   {/* Avatar */}
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user"
//                         ? "bg-gray-100 text-gray-600"
//                         : "bg-green-100 text-green-700"
//                       }`}
//                   >
//                     {m.role === "user" ? (
//                       <User size={14} />
//                     ) : (
//                       <Sprout size={14} />
//                     )}
//                   </div>

//                   {/* Message */}
//                   <div
//                     className={`max-w-md text-sm px-4 py-2.5 rounded-2xl ${m.role === "user"
//                         ? "bg-green-600 text-white rounded-tr-sm"
//                         : "bg-gray-50 text-gray-700 rounded-tl-sm"
//                       }`}
//                   >
//                     {m.text}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="shrink-0 bg-white justify-center flex ">
//               <div className="fixed bottom-5 w-9/12 z-10 ">
//                 <input
//                   type="text"
//                   value={input}
//                   disabled
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") handleSend();
//                   }}
//                   placeholder="Coming Soon..."
//                   className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-12 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-300"
//                 />

//                 <button
//                   type="button"
//                   onClick={handleSend}
//                   disabled={!input.trim()}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-green-600 transition hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   <Send size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Chat;



import { useState, useRef, useEffect } from "react";
import { Send, Sprout, User, Loader2 } from "lucide-react";
import Sidebar from "../components/navs/sidebar";
import Header from "../components/header";
import { askAssistant } from "../api/assistant";

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
        <Sidebar />

        <main className="w-full bg-gray-50 xl:mt-20 mt-28 flex flex-col min-h-screen">
          <div className="m-4 shrink-0">
            <h1 className="text-2xl font-semibold text-gray-900">Ask AI Assistant</h1>
            <p className="text-gray-500 text-sm mt-1">Ask anything about your crops, livestock, or farm.</p>
          </div>

          <div className="flex-1 min-h-0 bg-white border border-gray-100 flex flex-col overflow-hidden">
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
                    className={`max-w-md text-sm px-4 py-2.5 rounded-2xl whitespace-pre-wrap ${
                      m.role === "user"
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
              <div className="fixed bottom-5 w-9/12 z-10 ">
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
      </div>
    </>
  );
};

export default Chat;
