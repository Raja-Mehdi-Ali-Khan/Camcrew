import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ index, onUpload }) => {
  //   const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    onUpload(index, selectedFile);
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      //   const formData = new FormData();
      //   formData.append("image", file);

      //   const response = await axios.post(
      //     "http://localhost:4000/upload",
      //     formData
      //   );
      //   const imageUrl = response.data.data.url; // Assuming the response contains the URL of the uploaded image
      onUpload(file);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <label htmlFor="cover" className="text-white text-lg">
        {`${index == 0 ? "Main" : "Upload"}`} Image
      </label>
      <input
        type="file"
        id="cover"
        onChange={handleFileChange}
        className="border text-white border-gray-300 rounded focus:outline-none focus:border-gray-500"
      />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="max-w-xs" />
      )}
      {/* <button
        onClick={handleUpload}
        className={`px-8 py-3 bg-bgimage text-white font-semibold rounded hover:bg-bgdarkimage focus:outline-none focus:bg-bgdarkimage ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button> */}
    </div>
  );
};

export default ImageUploader;
