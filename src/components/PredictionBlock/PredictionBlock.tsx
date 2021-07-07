import React from "react";
import { UserMessages, UploadedImage } from "../../types/CommonTypes";
import { Loader } from "../commonComponents/Loader/Loader";

type PredictionBlockProps = {
  predictedBreed: string;
  isModelLoading: boolean;
  searchDogBreedImages: () => void;
  uploadedImage: UploadedImage;
};

export const PredictionBlock = ({
  predictedBreed,
  isModelLoading,
  searchDogBreedImages,
  uploadedImage
}: PredictionBlockProps) => {
  const handleSearchDogBreedImages = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    searchDogBreedImages();
  };

  return (
    <div className="prediction-wrapper">
      <p className={`prediction-text ${predictedBreed ? "breed-found" : ""}`}>
        Your dog breed possibly is{" "}
        <span>{predictedBreed ? predictedBreed : "not analyzed yet"}</span>.
      </p>
      {isModelLoading ? (
        <>
          <h1>{UserMessages.ModelLoading}</h1>
          <Loader />
        </>
      ) : (
        <button
          disabled={uploadedImage.isEmpty || isModelLoading}
          className="upload-image-button"
          onClick={handleSearchDogBreedImages}
        >
          <p>Get Images for Analyzed Breed</p>
        </button>
      )}
    </div>
  );
};
