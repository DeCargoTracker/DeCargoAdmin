import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Documents.css";

const Documents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const CRM_ID = location.state?.CRM;

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!CRM_ID) {
      setError("CRM_ID не передан.");
      setLoading(false);
      return;
    }

    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/file/${CRM_ID}`);
        if (!response.ok) throw new Error("Не вдалося завантажити документи");

        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [CRM_ID]);

  const deleteDocument = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/file/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (response.ok) {
        setDocuments(documents.filter(doc => doc._id !== id));
      } else {
        console.error("Помилка:", result.error);
      }
    } catch (error) {
      console.error("Помилка при видаленні документа", error);
    }
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
            <button className="delete-button" onClick={() => deleteDocument(doc._id)}>Видалити</button>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default Documents;
