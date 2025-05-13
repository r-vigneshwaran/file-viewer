import { useState } from "react";
import RightPane from "./RightPane";
import LeftPane from "./LeftPane";
import { v4 as uuid } from "uuid";

export type FileNode = {
  id: string;
  name: string;
  isDir: boolean;
  children: FileType[];
}[];
export type FileType = {
  id: string;
  name: string;
  isDir: boolean;
  children: FileType[];
};
export type SelectedNode = {
  id: string;
  name: string;
};
const FileViewer = () => {
  const staticFile: FileNode = [
    {
      id: "123",
      name: "file1.txt",
      isDir: false,
      children: [],
    },
    {
      id: "124",
      name: "src",
      isDir: true,
      children: [
        {
          id: "127",
          name: "components",
          isDir: true,
          children: [
            {
              id: "128",
              name: "Button.txt",
              isDir: false,
              children: [],
            },
            {
              id: "128",
              name: "Input.txt",
              isDir: false,
              children: [],
            },
          ],
        },
        {
          id: "126",
          name: "file3.txt",
          isDir: false,
          children: [],
        },
      ],
    },
  ];

  const [listNode, setListNode] = useState<FileNode>(staticFile);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

  const handleSelectFile = ({ id, name }: { id: string; name: string }) => {
    setSelectedNode({ id, name });
  };
  const handleAddNewDir = ({
    indexHierarchy,
    name,
  }: {
    indexHierarchy: number[];
    name: string;
  }) => {
    const newListNodes = [...listNode];
    const nextId = uuid();
    if (indexHierarchy.length) {
      let current:
        | {
            id: string;
            name: string;
            isDir: boolean;
            children: FileType[];
          }
        | {
            id: string;
            name: string;
            isDir: boolean;
            children: FileType[];
          }[] = newListNodes;
      for (let i = 0; i < indexHierarchy.length; i++) {
        const index = indexHierarchy[i];
        if (!Array.isArray(current)) return;
        current = current[index];
        if (i < indexHierarchy.length - 1) {
          current = current.children;
        }
      }
      if (!Array.isArray(current))
        current.children = [
          ...current.children,
          {
            id: nextId,
            name: name,
            isDir: true,
            children: [],
          },
        ];
      setListNode(newListNodes);
    } else {
      setListNode((prev) => [
        ...prev,
        {
          id: nextId,
          name: name,
          isDir: true,
          children: [],
        },
      ]);
    }
  };
  return (
    <div className="file-viewer">
      <LeftPane
        listNode={listNode}
        handleSelect={handleSelectFile}
        handleAddNewDir={handleAddNewDir}
      />
      {selectedNode && <RightPane selectedNode={selectedNode} />}
    </div>
  );
};

export default FileViewer;
