import { useEffect, useState } from "react";
import type { SelectedNode } from "./FileViewer";

const RightPane = ({ selectedNode }: { selectedNode: SelectedNode }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fileContent = sessionStorage.getItem(`fv-${selectedNode.id}`);
    console.log("🚀 ~ useEffect ~ fileContent:", fileContent);
    if (fileContent) {
      setContent(fileContent);
    } else {
      setContent("");
    }
  }, [selectedNode.id]);

  const onKeyDown = (e) => {
    // e.preventDefault();
    const code = e.which || e.keyCode;

    const charCode = String.fromCharCode(code).toLowerCase();
    if ((e.ctrlKey || e.metaKey) && charCode === "s") {
      e.preventDefault();
      sessionStorage.setItem(`fv-${selectedNode.id}`, content);
    }
  };

  return (
    <div className="right-pane">
      <span>{selectedNode.name}</span>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default RightPane;
