import React, {useMemo} from 'react';
import ReactQuill from 'react-quill';
import { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import ImageResize from "quill-image-resize";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import {getCookie} from "../../utils/cookie";
Quill.register("modules/ImageUploader", ImageUploader);
Quill.register("modules/ImageResize", ImageResize);

function Editor(props) {
  const modules = useMemo(() => {
    return {
      toolbar: [
        //[{ 'font': [] }],
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
      ],
      ImageUploader: {
        upload: (file) => {
          console.log(file);
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("multipartFiles", file);
            axios
              .post(
                `/api/studies/${props.studyId}/boards/${props.boardId}/articles/images`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    "X-AUTH-TOKEN": getCookie("accessToken"),
                  },
                }
              )
              .then((res) => {
                console.log(res);
                resolve(res.data.data[0].imageUrl);
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              });
          });
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);

  return (
    <ReactQuill
        theme="snow"
        modules={modules}
        {...props}
    />
  )
}

export default Editor;