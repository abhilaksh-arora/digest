import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

interface MyEditorProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ editorState, onEditorStateChange }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
    />
  );
};

export default MyEditor;
