import { useState } from "react";
import emptyImage from "../src/assets/EmptyImage.png";
import "./App.css";
import imageCompression from 'browser-image-compression';

function App() {
  const [origImageFile, setOrigImageFile] = useState("");
  const [compressedImageFile, setCompressedImageFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false); // State to track if file is uploaded

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setOrigImageFile(URL.createObjectURL(imageFile));
      setFileName(imageFile.name);
      compressImage(imageFile);
      setFileUploaded(true); // Set fileUploaded to true when file is uploaded
    }
  };

  const compressImage = async (imageFile) => {
    try {
      const options = {
        maxSizeMB: 1,             // Maximum size in MB
        maxWidthOrHeight: 1920,   // Maximum width or height in pixels
        useWebWorker: true,       // Use web worker for better performance
        quality: 0.7,
      };

      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImageFile(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.error("Error during image compression:", error);
    }
  };

  const downloadImage = () => { 
    const link = document.createElement("a");
    link.href = compressedImageFile;
    link.download = `compressed-${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <h1>Compress your image (jpg,jpeg,png)</h1>
      <div className="container">
        <div className="column">
          <div className="item">
            {origImageFile ? (
              <img src={origImageFile} alt="Original" className="image" />
            ) : (<img src={emptyImage} alt="Empty" className="image" />)
            }
          </div>

          <h2 style={{ color: "black",marginBlock:"18px"}}>Original Image</h2>
        
        </div>
        <div className="column">
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleFileChange}
          />
          <button
            className="button"
            onClick={downloadImage}
            disabled={!fileUploaded} // Disable button if fileUploaded is false
          
          > Download Compressed Img
          </button>
        </div>
        
        
        <div className="column">
          <div className="item">
            {compressedImageFile ? (<img src={compressedImageFile} alt="Compressed" className="image" />
            ) : (<img src={emptyImage} alt="Empty" className="image" />)
            
            }
         
          </div>

          <h2 style={{ color: "black",marginBlock:"18px" }}>Compressed Image </h2>

        </div>
      </div>
    </div>
  );
}

export default App;
