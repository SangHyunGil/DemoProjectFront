import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from "styled-components";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { sendFile } from '../../reducers/roomReducer';

const FileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    .filelist {
        flex: 1 1 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 100%;
        overflow-y: scroll;
        gap: 10px;
        .files {
            width: 95%;
            height: 100%;
            border: none;
            resize: none;
        }
    }
`

const FileLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`

const FileInputWrapper = styled.div`
    display: flex;
    width: 100%;
    input {
        flex: 1;
        width: 100%;
    }
    button {
        border: 0;
        color: white;
        padding: 5px 10px;
        background: #3Eb489;
        transition: all 0.3s linear;
        &:hover {
            background: #8BC34A;
            cursor: pointer;
            transition: all 0.3s linear;
        }
    }
`

const Filestore = ({ plugin, roomId, username }) => {

    const [chosenFile, setChosenFile] = useState(null);
    const dispatch = useDispatch();
    const { fileData } = useSelector(
        (state) => state.roomReducer
      );    

    const handleChosenFile = (e) => {
        e.preventDefault();
        setChosenFile(() => e.target.files[0]);
    };

    const handleFileTransfer = () => {
        if (!chosenFile) {
          alert("파일을 선택해주세요");
          return;
        }
        const file = chosenFile;
        const chunkLength = 8*1024;
    
        const onReadAsDataURL = (event, text) => {
          var data = {}; // Data Channel을 통해 보낼 데이터 객체
          data.filename = file.name; // data의 이름 설정 (=> 파일 이름)
          if (event) {
            text = event.target.result; // 처음 실행시
            //console.log(text);
            dispatch(
                sendFile({
                    filename:file.name,
                    file: text,
                    display: username,
                    time: moment().format("HH:mm")
                })
            );
          }

          if (text.length > chunkLength) { // Chunk로 찢어서 보내게 됨
            data.message = text.slice(0, chunkLength); // Chunk Length보다 크다면 
          } else { // 모두 보내고 마지막 Chunk만이 남아있다.
            data.message = text;
            data.last = true; // 마지막임을 설정
          }
          sendFileToDataChannel(data); // use JSON.stringify for chrome!
    
          var remainingDataURL = text.slice(data.message.length);
          if (remainingDataURL.length)
            setTimeout(function () {
              onReadAsDataURL(null, remainingDataURL); // 남은 부분에 대해 전송 계속적으로 진행
            }, 100);
        };
    
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", onReadAsDataURL);
    };

    const sendFileToDataChannel = (file) => {
        let msg = {
            textroom: "file",
            room: roomId,
            file: file,
            display: username,
        };

        plugin.data({
            text: JSON.stringify(msg),
            success: function () {
                console.log("Data Channel Message Sent");
            },
            error: function (err) {
                console.log(err);
            },
        });
    };
      
    const renderFileData = fileData.map((file, index) => {
        console.log(file);
        return (
          <FileLinkWrapper
            key={index}
          >
            <span>{file.display}</span>
            <a href={file.file} download={file.filename}>
                {file.filename}
            </a>
            <span>{file.time}</span>
          </FileLinkWrapper>
        );
      });

    return (
        <>
            <FileWrapper>
                <div className="filelist">
                    {renderFileData}
                </div>
                <FileInputWrapper>
                    <input onChange={handleChosenFile} type="file" />
                    <button onClick={handleFileTransfer}>전송</button>
                </FileInputWrapper>
            </FileWrapper>
            
        </>
    )
};

export default Filestore;
