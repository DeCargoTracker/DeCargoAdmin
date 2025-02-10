import { useState } from "react";
import "../styles/DragDropFile.css";

export default function DragDropFile({ onFilesSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(event.dataTransfer.files);
    updateFiles(newFiles);
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    updateFiles(newFiles);
  };

  const updateFiles = (newFiles) => {
    const uniqueFiles = [...files, ...newFiles].filter(
      (file, index, self) => index === self.findIndex((f) => f.name === file.name)
    );
    setFiles(uniqueFiles);
    onFilesSelect(uniqueFiles);
  };

  const removeFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    onFilesSelect(updatedFiles);
  };

  return (
    <div
      className={`drop-zone ${isDragging ? "dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <label className="drop-zone-title">Upload Files</label>
      <input type="file" multiple onChange={handleFileChange} className="file-input" id="fileInput" />
      <label htmlFor="fileInput" className="file-label">Choose Files</label>
      <p className="file-list">{files.length > 0 ? "Drag & Drop more files or remove them below" : "Drag & Drop files here"}</p>
      
      {/* Отображение загруженных файлов */}
      <div className="file-preview">
        {files.map((file) => (
          <div key={file.name} className="file-item">
            <span className="file-icon">📄{file.name}</span>
            <button className="remove-file" onClick={() => removeFile(file.name)}>✖</button>
          </div>
        ))}
      </div>
    </div>
  );
}
