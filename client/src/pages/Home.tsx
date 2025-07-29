// src/pages/Home.tsx
import Navbar from "../components/Navbar";
import ChatPanel from "../components/ChatPanel";
import ComponentPreview from "../components/ComponentPreview";
import CodePreview from "../components/CodePreview";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <ChatPanel />
                    <CodePreview code="// sample code here" />

        </div>
        <ComponentPreview code="<Button>Click</Button>" />

      </div>
    </div>
  );
};

export default Home;
