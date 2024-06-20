"use client";
import React, { useState } from "react";
import "@/app/upload/styles.css";
import Navigation from "../components/Navbar/Navbar";

function Page() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnailFile) {
      setUploadStatus(
        "Por favor selecciona tanto un video como una miniatura."
      );
      return;
    }

    setUploadStatus("Subiendo...");

    // Crear un objeto FormData y añadir archivos
    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnailFile", thumbnailFile);
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);

    try {
      const response = await fetch("http://localhost:3000/api/uploadVideo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`Video subido con éxito: ${data.message}`);
      } else {
        const errorData = await response.json();
        setUploadStatus(`Error al subir el video: ${errorData.error}`);
      }
    } catch (error) {
      console.log(response);
      console.error("Error:", error);
      setUploadStatus("Error al subir el video.");
    }
  };

  return (
    <div className="video-upload-container">
      <div>
        <Navigation />
      </div>
      <h1>Subir Nuevo Video</h1>
      <form id="videoUploadForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="videoTitle">Título del Video:</label>
          <input
            type="text"
            id="videoTitle"
            placeholder="Ingresa el título del video"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoDescription">Descripción del Video:</label>
          <textarea
            id="videoDescription"
            placeholder="Describe brevemente el video"
            rows="4"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="thumbnailFile">Selecciona una miniatura:</label>
          <input
            type="file"
            id="thumbnailFile"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          <div id="thumbnailPreview" className="thumbnail-preview">
            {thumbnailPreview ? (
              <img src={thumbnailPreview} alt="Thumbnail Preview" />
            ) : (
              <p>No hay imagen seleccionada</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="videoFile">Selecciona el video:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>

        <button type="submit">Subir Video</button>
      </form>
      <div id="uploadStatus">{uploadStatus}</div>
    </div>
  );
}

export default Page;
