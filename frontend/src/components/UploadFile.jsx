import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
import PropTypes from "prop-types";

const UploadFile = ({ onImageChange, images }) => {
  const handleDrop = async (file) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", file[0]);

    try {
      const response = await axiosInstance.post(
        "/products/image",
        formData,
        config
      );
      onImageChange([...images, response.data.fileName]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (image) => {
    const currentImageIndex = images.indexOf(image);
    let newImage = [...images];
    newImage.splice(currentImageIndex, 1);
    onImageChange(newImage);
  };

  return (
    <div className="flex gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="flex min-w-[300px] h-[300px] border items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="align-middle text-2xl font-bold text-center whitespace-pre-line">
                Choose a File
              </p>
              <p className="align-middle my-1 text-xl text-center text-slate-400  whitespace-pre-line">
                or
              </p>
              <p className="align-middle text-2xl font-bold text-center whitespace-pre-line">
                Drag & Drop
              </p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={handleDelete}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/${image}`}
              alt="imagefile"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

UploadFile.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UploadFile;
