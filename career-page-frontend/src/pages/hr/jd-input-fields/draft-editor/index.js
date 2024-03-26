import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "./Draft.css";
import { useLocation } from "react-router-dom";

function AboutCompEditor(props) {
  // const loc = useLocation().state;

  // console.log(loc ? loc.aboutCompany : "loc data not available")

  const html = "<p>This is some <strong>HTML</strong> content.</p>";

  // Convert HTML To Content State

  // const blocksFromHTML = convertFromHTML(html);
  // const state = ContentState.createFromBlockArray(blocksFromHTML);

  // console.log("state",state)

  const [editorState, setEditorState] = useState(() =>

    EditorState.createWithContent(
      ContentState.createFromText("hello world")
    )
  );
  const [convertedContent, setConvertedContent] = useState("");

  const handleEditorStateChange = (data) => {
    setEditorState(data);
  };

  //convert Content state to HTML
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  props.companyEditior(convertedContent);

  return (
    <>
      <h1 className="App-header">About Freeskout</h1>
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
    </>
  );
}

export default AboutCompEditor;
