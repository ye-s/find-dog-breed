import React from "react";
import { UploadedImage } from "../../types/CommonTypes";

type UploadedImagePreviewProps = {
  uploadedImage: UploadedImage;
  passImageToNetModel: (e: EventTarget) => void;
  uploadedImageRef: React.RefObject<HTMLImageElement | null> | null;
  deleteImage: () => void;
};

export const UploadedImagePreview = ({
  uploadedImage,
  passImageToNetModel,
  uploadedImageRef = null,
  deleteImage
}: UploadedImagePreviewProps) => {
  const handleOnImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.preventDefault();
    passImageToNetModel(e.target);
  };

  const handleDeleteImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    deleteImage();
  };

  return (
    <div className="upload-image-preview">
      {uploadedImage.isEmpty ? (
        <div className="image-placeholder">
          <p>?</p>
        </div>
      ) : (
        <>
          <img
            alt="preview of uploaded dog breed"
            src={uploadedImage.preview}
            onLoad={handleOnImageLoad}
            ref={uploadedImageRef}
          />
          <div
            className="upload-image-preview--delete"
            onClick={handleDeleteImage}
          />
        </>
      )}
    </div>
  );
};
