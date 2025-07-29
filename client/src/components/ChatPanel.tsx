// src/components/ChatPanel.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatPanel = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("Component Response:", data);
      // TODO: store data in state or context
    } catch (err) {
      console.error("Error sending prompt:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Describe your component..."
        className="flex-1 border p-2 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="bg-black text-white p-2 rounded"
        disabled={loading}
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
};

export default ChatPanel;
