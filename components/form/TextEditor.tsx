"use client";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles
// import "quill/dist/quill.snow.css";
import "../../styles/quill/custom-quill-theme.css";
import ReactQuill from "react-quill";
import { DeltaStatic, Sources } from "quill";

const TextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => void;
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="h-96"
      placeholder="Post Description . . ."
    />
  );
};

export default TextEditor;
