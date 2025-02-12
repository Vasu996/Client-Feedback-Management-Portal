import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/files/upload", formData);
    alert("File uploaded successfully!");
    fetchFiles();
  };

  const fetchFiles = async () => {
    const res = await axios.get("http://localhost:5000/api/files");
    setUploadedFiles(res.data);
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file._id}>
            <a href={`http://localhost:5000/api/files/${file.filename}`} target="_blank" rel="noopener noreferrer">
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
