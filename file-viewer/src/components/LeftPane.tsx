import { useState } from "react";
import type { FileNode, FileType } from "./FileViewer";
import { ChevronDown, ChevronUp } from "../assets/icons/Chevron";

const LeftPane = ({
  listNode,
  handleSelect,
  handleAddNewDir,
}: {
  listNode: FileNode;
  handleSelect: ({ id, name }: { id: string; name: string }) => void;
  handleAddNewDir: ({
    name,
    indexHierarchy,
  }: {
    name: string;
    indexHierarchy: number[];
  }) => void;
}) => {
  const [fileName, setFileName] = useState("");
  const onClickCreate = () => {
    if (!fileName) {
      alert("Enter File Name");
      return;
    }
    handleAddNewDir({ name: fileName, indexHierarchy: [] });
  };
  return (
    <div className="left-pane">
      <input value={fileName} onChange={(e) => setFileName(e.target.value)} />
      <button onClick={onClickCreate}>Add new Folder</button>
      {listNode.map((item, index) => (
        <>
          <GenerateFileStructure
            {...item}
            handleSelect={handleSelect}
            handleAddNewDir={handleAddNewDir}
            indexHierarchy={[index]}
          />
        </>
      ))}
    </div>
  );
};

export default LeftPane;

const GenerateFileStructure = ({
  id,
  name,
  isDir,
  children,
  handleSelect,
  handleAddNewDir,
  indexHierarchy,
}: FileType & {
  handleSelect: ({ id, name }: { id: string; name: string }) => void;
  handleAddNewDir: ({
    name,
    indexHierarchy,
  }: {
    name: string;
    indexHierarchy: number[];
  }) => void;
  indexHierarchy: number[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    if (!isDir) {
      handleSelect({ id, name });
    }
    setIsOpen((prev) => !prev);
    console.log(indexHierarchy, "indexindex");
  };

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <li>{name}</li>
        {isDir && <>{!isOpen ? <ChevronDown /> : <ChevronUp />}</>}
        {isDir && (
          <AddNewDir
            indexHierarchy={indexHierarchy}
            handleAddNewDir={handleAddNewDir}
          />
        )}
      </span>
      <div style={{ marginLeft: "10px" }} onClick={(e) => e.stopPropagation()}>
        {isDir &&
          isOpen &&
          children.map((item, childIndex) => (
            <GenerateFileStructure
              {...item}
              handleSelect={handleSelect}
              handleAddNewDir={handleAddNewDir}
              indexHierarchy={[...indexHierarchy, childIndex]}
            />
          ))}
      </div>
    </div>
  );
};

const AddNewDir = ({
  handleAddNewDir,
  indexHierarchy,
}: {
  indexHierarchy: number[];
  handleAddNewDir: ({
    indexHierarchy,
    name,
  }: {
    indexHierarchy: number[];
    name: string;
  }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const onClick = (index: number[]) => {
    handleAddNewDir({ indexHierarchy: index, name: fileName });
    setFileName("");
    setIsOpen(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => {
          console.log(indexHierarchy, "AddNewDir indexHierarchy");

          setIsOpen((prev) => !prev);
        }}
      >
        +
      </button>
      {isOpen && (
        <div>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <button onClick={() => onClick(indexHierarchy)}>Create</button>
        </div>
      )}
    </div>
  );
};
