import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ImageComponent from "../../components/ImageComponent";
import { containCrop } from "react-image-crop";
import Image from "next/image";
const ProfilePage = ({ convertedImages }) => {
  const router = useRouter();
  const { profile_id } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [croppedSrc, setCroppedSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
  const [showImages, setShowImages] = useState(false);

  const handleCaptionChange = (e) => {
    const text = e.target.value;
    setCaption(text);
  };

  console.log(convertedImages)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", croppedSrc);
    formData.append("caption", caption);
    formData.append("username", profile_id);
    const res = await axios.post(
      "http://localhost:3000/api/postimage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setShowModal(false);
  };
  const handleImage = () => {
    setShowImages(() => {
      return !showImages;
    });
  };

  const ConvertedImageComponent = ({ images }) => {
    return (
      <>
        {images?.map((path, index) => (
          <div className="container flex" key={index + 1}>
            <Image src={path} height={200} width={200} alt="base64encoded" />
          </div>
        ))}
      </>
    );
  };

  console.log(showImages);
  return (
    <div className="container w-full">
      <h1> Profile ID: {profile_id} </h1>{" "}
      <button
        className="mt-5 inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)]  hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
        type="button"
        onClick={handleImage}
      >
        Show Posts
      </button>
      <div className="flex justify-around">
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Upload an Image</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                      className="max-w-sm mx-auto"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="caption"
                          className="block mb-2 font-medium text-gray-700"
                        >
                          Caption
                        </label>
                        <input
                          type="text"
                          id="caption"
                          name="caption"
                          value={caption}
                          onChange={handleCaptionChange}
                          className="border rounded px-3 py-2 w-full"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="bg-pink-500 text-white rounded px-6 py-2 "
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-white bg-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-black"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {showImages ? (
        <div className="flex">
          <ConvertedImageComponent images={convertedImages} />
        </div>
      ) : null}
      <ImageComponent
        croppedSrc={croppedSrc}
        setCroppedSrc={setCroppedSrc}
        setShowModal={setShowModal}
        crop={crop}
        setCrop={setCrop}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { profile_id } = context.query;
  const res = await axios.get(
    `http://localhost:3000/api/getImage?username=${profile_id}`
  );
  const images = res.data.images[0];
  const convertedImages = images
    ? images.map((image) => {
        const base64Data = Buffer.from(image.data).toString("base64");
        const filter = image.contentType;
        const imagebase64 = `data:${filter};base64,${base64Data}`;
        return imagebase64;
      })
    : "images";
  return {
    props: { convertedImages }, // will be passed to the page component as props
  };
}

export default ProfilePage;
