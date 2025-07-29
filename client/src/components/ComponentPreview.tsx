// src/components/ComponentPreview.tsx
import React from "react";

interface ComponentPreviewProps {
  code: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ code }) => {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-2">Live Preview:</h2>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
};

export default ComponentPreview;
