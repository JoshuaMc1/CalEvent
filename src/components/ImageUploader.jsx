import { useState } from "react";
import { FiX } from "react-icons/fi";
import { isTrue } from "../utils/utils";

const ImageUploader = ({ imageDefault = "" }) => {
  const [image, setImage] = useState(imageDefault);

  const handleImageLoad = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageLoad(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleImageLoad(file);
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const renderImage = () => (
    <div className="relative w-full h-auto">
      <img
        src={image}
        alt="uploaded image"
        className="object-cover w-full h-full"
      />
      <button
        onClick={handleImageDelete}
        className="absolute top-2 left-2 bg-white dark:bg-gray-700 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
      >
        <FiX />
      </button>
    </div>
  );

  const renderUploader = () => (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        aria-hidden="true"
        className="w-10 h-10 mb-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        ></path>
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click aquí para subir</span> o arrastre
        y suelte
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG (Sin limites de tamaño)
      </p>
    </div>
  );

  const uploaderClassNames = `flex flex-col items-center justify-center ${
    isTrue(image) ? "w-full h-auto" : "w-full h-full"
  } border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`;

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <label htmlFor="dropzone-file" className={uploaderClassNames}>
        {image !== null ? renderImage() : renderUploader()}
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          name="photo"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
