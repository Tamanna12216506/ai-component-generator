// src/components/CodePreview.tsx
import React, { useState } from "react";
import { ClipboardCopy } from "lucide-react";

interface CodePreviewProps {
  code: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-4 relative bg-gray-100 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-t-lg">
        <span className="text-sm font-semibold">Generated Code</span>
        <button
          onClick={handleCopy}
          className="flex items-center text-xs gap-1 text-blue-600 hover:text-blue-800"
        >
          <ClipboardCopy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodePreview;
