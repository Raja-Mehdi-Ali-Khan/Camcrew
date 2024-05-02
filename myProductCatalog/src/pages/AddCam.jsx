import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "../components/ImageUploader";
import { useUser } from "../context/UserContext";

const AddCam = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const { userData } = useUser();
  console.log(userData);
  
  const handleSubmit = async () => {
    try {
      // formData = { ...formData, pincode: userData.zip };
      const response = await axios.post(
        "https://camapi-in57.onrender.com/api/items",
        formData
      );
      console.log(response.data); // Log the created product data
      setFormData({});
      alert("Added a Service");
      // window.location.reload();
      // Optionally, you can perform additional actions after creating the product
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUpload = (index, file) => {
    setImageUrls((prevImageUrls) => {
      // Replace the existing entry at the specified index with the new file
      const updatedImageUrls = { ...prevImageUrls, [index]: file };
      return updatedImageUrls;
    });
  };

  const uploadToDatabase = async () => {
    setLoading(true);
    try {
      const uploadedUrls = [];
      for (const index in imageUrls) {
        if (imageUrls.hasOwnProperty(index)) {
          const file = imageUrls[index];
          const formData = new FormData();
          formData.append("image", file);

          const response = await axios.post(
            "https://camapi-in57.onrender.com/upload",
            formData
          );

          const uploadedUrl = response.data.data.url; // Assuming the response contains the URL of the uploaded image
          uploadedUrls.push(uploadedUrl);
        }
      }

      // After uploading all images, you can store the array of URLs in your database or perform any other necessary operations
      console.log("Uploaded URLs:", uploadedUrls);
      setFormData({ ...formData, image: uploadedUrls });
      // Add your database upload logic here
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    // Handle input changes
    const { name, value } = e.target;
    // Update state with input value
    setFormData({
      ...formData,
      [name]: value,
      pincode: userData?.zip,
      youtube: youtubeId,
      email: userData?.email,
    });
  };

  const [youtubeId, setYoutubeId] = useState("");

  const handleYoutubeChange = (event) => {
    const input = event.target.value;
    const match = input.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
    if (match) {
      const id = match[1];
      setYoutubeId(id);
    } else {
      setYoutubeId("");
    }
    // setFormData({ ...formData,  });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    // Handle feature addition
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="flex  justify-center items-center">
      <div className="container w-screen py-10">
        <h1 className="text-white font-bold text-4xl mb-4 flex justify-center items-center  mx-auto">
          Add New Services
        </h1>
        <div className="flex justify-between">
          <div className="w-2/3 mx-auto flex flex-col items-center gap-y-4 ">
            <label htmlFor="" className="text-white text-lg">
              Full Name
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <label htmlFor="" className="text-white text-lg">
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            >
              <option value className="hidden" />
              <option value="Event Photography">Event Photography</option>
              <option value="Marketing Videography">
                Marketing Videography
              </option>
              <option value="Drone Videography">Drone Videography</option>
              <option value="Media Videography">Media Videography</option>
            </select>
            <label htmlFor="youtube" className="text-white text-lg">
              Youtube Embed Code
            </label>
            <input
              type="text"
              id="youtube"
              name="youtube"
              placeholder="e.g. attach embed youtube code"
              onChange={handleYoutubeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            {youtubeId && (
              <div className=" text-white font-semibold">
                <p>YouTube Video ID: {youtubeId}</p>
                {/* You can save the youtubeId to the database here */}
              </div>
            )}
            <div className="flex flex-col   items-center gap-4 md:gap-20">
              <div className="flex flex-wrap justify-center gap-20">
                {
                  
                }
                {[...Array(5)].map((_, index) => (
                  <ImageUploader
                    key={index}
                    index={index}
                    onUpload={handleUpload}
                  />
                ))}
              </div>
              <button
                onClick={uploadToDatabase}
                className="px-8 py-3 bg-bgimage  text-white font-semibold rounded hover:bg-bgdarkimage focus:outline-none focus:bg-bgdarkimage"
              >
                {loading ? "Please Wait" : "Upload"}
              </button>
            </div>
            <label htmlFor="" className="text-white text-lg">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="30"
              rows="10"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            ></textarea>
            <label htmlFor="" className="text-white text-lg">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-8 py-3 bg-bgimage text-white font-semibold rounded hover:bg-bgdarkimage focus:outline-none focus:bg-bgdarkimage"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCam;
