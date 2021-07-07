import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useFetchDogImage } from "../../hooks/fetchDogImage";
import { Loader } from "../commonComponents/Loader/Loader";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { getDogBreedUrl } from "../../helpers/DogBreedHelper";
import { InfiniteImageGallery } from "../InfiniteImageGallery/InfiniteImageGallery";
import { UserMessages, UploadedImage } from "../../types/CommonTypes";
import { PredictionBlock } from "../PredictionBlock/PredictionBlock";
import { UploadedImagePreview } from "./UploadedImagePreview";
import { API_URL } from "../../api/api";
import "./UploadImage.scss";

export const UploadImage = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage>({
    isEmpty: true
  });
  const [netModel, setNetModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const [predictedBreed, setPredictedBreed] = useState<string>("");
  const [allImages, setAllImages] = useState<any[]>([]);
  const [{ isLoading, data, error }, fetchData] = useFetchDogImage(false);
  const [isFetchDogBreedDone, setIsFetchDogBreedDone] = useState<boolean>(
    false
  );

  const uploadedImageRef = useRef<HTMLImageElement | null>(null);

  /*
    I make sure that Dropzone will work only for image files and only for one file at time
    (seems not working on iPhone)
  */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles: any[]) => {
      setUploadedImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            isEmpty: false
          })
        )[0]
      );
    }
  });

  useEffect(() => {
    mobilenet.load().then((net) => {
      setNetModel(net);
      setIsModelLoading(false);
      console.log("Model ready");
    });
  }, []);

  const passImageToNetModel = (target: any) => {
    if (netModel) {
      netModel.classify(target).then((predictions: any[]) => {
        setPredictedBreed(predictions[0].className.split(",")[0].toLowerCase());
      });
    }
  };

  useEffect(() => {
    setAllImages(data);
  }, [data]);

  useEffect(() => {
    if (!isModelLoading) {
      if (uploadedImageRef.current) {
        netModel
          .classify(uploadedImageRef.current)
          .then((predictions: any[]) => {
            setPredictedBreed(
              predictions[0].className.split(",")[0].toLowerCase()
            );
            console.log("predictions", ...predictions);
          });
      }
    }
  }, [netModel, isModelLoading]);

  const searchDogBreedImages = (): void => {
    fetchData(`${API_URL}/breed/${getDogBreedUrl(predictedBreed)}/images`);
    setIsFetchDogBreedDone(true);
  };

  const deleteImage = () => {
    setUploadedImage({ isEmpty: true });
    setPredictedBreed("");
    setIsFetchDogBreedDone(false);
    setAllImages([]);
  };

  const showImageGallery = () => {
    if (!isFetchDogBreedDone) {
      return;
    }
    return allImages && allImages.length < 1 ? (
      <p className="status-message">{UserMessages.NoMatch}</p>
    ) : (
      <InfiniteImageGallery items={allImages} />
    );
  };

  return (
    <div className="upload-and-preview-block">
      <div className="upload-dropzone-wrapper">
        <div className="upload-dropzone-block" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div>
              <p>Click to select image</p>
              <p className="upload-dropzone-text desktop">
                Or drag 'n' drop image here
              </p>
            </div>
          )}
        </div>
        <UploadedImagePreview
          uploadedImage={uploadedImage}
          passImageToNetModel={passImageToNetModel}
          uploadedImageRef={uploadedImageRef}
          deleteImage={deleteImage}
        />
        <PredictionBlock
          predictedBreed={predictedBreed}
          isModelLoading={isModelLoading}
          searchDogBreedImages={searchDogBreedImages}
          uploadedImage={uploadedImage}
        />
      </div>
      {error ? (
        <p className="status-message">"{UserMessages.Error}"</p>
      ) : isLoading && !error ? (
        <Loader />
      ) : (
        showImageGallery()
      )}
    </div>
  );
};
