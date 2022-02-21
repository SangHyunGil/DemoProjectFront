import React from 'react';
import ReactQuill from 'react-quill';

function Editor(props) {
  return (
    <ReactQuill 
        {...props}
    />
  )
}

export default Editor;