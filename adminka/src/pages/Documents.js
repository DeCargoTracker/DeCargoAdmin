import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Documents.css";
import { deleteDocument, fetchDocuments } from "../component/fetches";

const Documents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const CRM_ID = location.state?.CRM;

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ApiRequestFetchDocuments = async () => {
    const result = await fetchDocuments(CRM_ID);
    console.log(`fetchDocuments result  ${result}`)
    setDocuments(result);
  }
  useEffect(() => {
    if (!CRM_ID) {
      setError("CRM_ID не передан.");
      setLoading(false);
      return;
    }
    ApiRequestFetchDocuments()
    setLoading(false);
  }, [CRM_ID]);

  const ApiRequestDeleteFile = async (id) => {
    const result = await deleteDocument(id);
    console.log(`deleteDocument result  ${result}`)
    ApiRequestFetchDocuments()
  };
  

  return (
    <div className="documents-container">
      <h2>Документи для CRM ID: {CRM_ID}</h2>

      {loading && <p>Завантаження...</p>}
      {error && <p className="error">{error}</p>}
      {documents.length === 0 && !loading && <p>Документи відсутні</p>}

      <div className="document-cards">
        {documents.map((doc) => (
          <div key={doc._id} className="document-card">
            <h3>{doc.fileName}</h3>
            <a href={doc.filePath} target="_blank" rel="noopener noreferrer" className="open-button">
              Відкрити
            </a>
            <button className="delete-button" onClick={() => ApiRequestDeleteFile(doc._id)}>Видалити</button>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default Documents;
