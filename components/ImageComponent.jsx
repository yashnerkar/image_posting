import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageComponent = ({
  crop,setCroppedSrc,setCrop,croppedSrc,setShowModal
}) => {
  const [src, setSrc] = useState(null);
  const imageRef = useRef(null);
  // console.log(imageRef.current);
  // console.log(src);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
      setSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImgUrl(imageRef.current, crop);
      console.log("Cropped Image URL:", croppedImageUrl);
      const base64String = croppedImageUrl.split(',')[1]; // Remove the data:image/jpeg;base64, part
    const imageBufferData = Buffer.from(base64String, 'base64');
      setCroppedSrc(imageBufferData);
    }
  };

  const getCroppedImgUrl = (image, crop) => {
    console.log(image);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    canvas.style.backgroundColor = "white";
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const format = image.src.split('.').pop(); // Get the format from the image source URL
    return canvas.toDataURL(`image/${format}`);
  };
  return (
    <div
      style={{
        zIndex: 50,
      }}
    >
    <div className="container flex justify-center mb-5">
      <input
        className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)]  hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
        onChange={handleFileChange}
        accept="image/*"
        type="file"
        name="imageFile"
        id="file"
      />
      </div>
      {src && (
        <>
        
        <div className="flex justify-evenly">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
          >
            <img
              src={src}
              ref={imageRef}
              crossOrigin="anonymous"
              height={350}
              width={350}
            />
          </ReactCrop>

          <img src={croppedSrc} height={350} width={
            350}></img>

           
        </div>
        <div className="text-center">
        <button
          className="mt-5 inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)]  hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Create A Post
        </button> 
         </div>
         </>
      )}
    </div>
  );
};

export default ImageComponent;
