import React, { useState, createRef } from "react";
import Dropzone from "react-dropzone";

export default function FileUpload() {
  const [data, setData] = useState([]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        let errors = [];

        if (file.type !== "text/plain") {
          errors.push("Invalid file type.");
        }
        if (errors.length > 0) {
          alert(errors);
        } else {
          let textData = e.target.result;
          let result = textData.match(/<(.*?)>/g);
          let regexUsernameMsg = textData.match(/<(.*?)> (.*)/g);
          let userlist = [];

          result.forEach((resultUserName) => {
            if (userlist.includes(resultUserName)) {
            } else {
              userlist.push(resultUserName);
            }
          });

          let dict = [];
          userlist.forEach((names) => {
            let countmsg = 0;
            regexUsernameMsg.forEach((lines) => {
              let username = lines.substr(0, lines.indexOf(" "));
              let message = lines.substr(lines.indexOf(" ") + 1);

              if (username === names) {
                countmsg += message.length;
                //console.log(countmsg);
              }
            });

            dict.push({
              key: names,
              value: countmsg,
            });
          });

          let processData = [];
          dict.forEach((data) => {
            processData.push(data.key + ": " + data.value + " words.");
          });
          // console.log(processData);

          let items = [];
          for (let [index, value] of processData.entries()) {
            items.push(<li key={index}>{value}</li>);
          }

          setData((data) => [...data, items]);
        }
      };

      reader.readAsText(file);
    });
  };

  const dropzoneRef = createRef();
  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-center text-4xl">Upload a Text File (.txt)</h1>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            Drag and drop text file here.
            <div>
              <p></p>
              <button type="button" onClick={openDialog}>
                Upload
              </button>
            </div>
          </div>
        )}
      </Dropzone>
      <h2>Result:</h2>
      <ul>
        <strong>{data}</strong>
      </ul>
    </div>
  );
}
