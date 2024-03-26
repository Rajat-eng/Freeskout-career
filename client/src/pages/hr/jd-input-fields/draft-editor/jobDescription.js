import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
// import "./Draft.css";

function JobEditior (props) {


  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);


  const handleEditorStateChange = (data) => {
    setEditorState(data);
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  props.jobEditior(convertedContent)


  return (
    <>
      <h1 className="App-header job-editior">Job Details & Requirements</h1>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ["inline", "list", "history"],
        }}
      />
      {/* <button onClick={()=>props.jobEditior(convertedContent)}>click here</button> */}
    </>
  );
}

export default JobEditior;
