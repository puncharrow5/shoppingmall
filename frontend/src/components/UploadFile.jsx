import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
import PropTypes from "prop-types";

const UploadFile = ({ onImageChange, images }) => {
  const handleDrop = async (file) => {
    let formData = new FormData();

    const config = {
      // axios를 사용해 비동기로 post전송할 경우엔 보내는 url, 데이터, req.header를 파라미터로 넣어주면 된다.
      // 보내는 데이터가 이미지일 경우엔 헤더를 반드시 "content-type": "multipart/form-data"로 설정해 줘야한다.
      header: { "content-type": "multipart/form-data" },
    };

    // append 메소드는 선택된 요소 내부의 끝 부분에 컨텐츠를 삽입함(formData 내부의 파일들 중 가장 끝에 저장됨)
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
    // 클릭한 이미지의 index를 currentImageIndex 반환함
    const currentImageIndex = images.indexOf(image);
    // images의 원본을 복사
    let newImage = [...images];
    // images에서 currentImageIndex부터 하나를 지움
    newImage.splice(currentImageIndex, 1);
    onImageChange(newImage);
  };

  return (
    <div className="flex gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="min-w-[300px] h-[300px] border items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-2xl">
                업로드하려고 하는 상품의 이미지를 첨부해주세요.
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
              src={`${import.meta.env.SERVER_URL}/${image}`}
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
