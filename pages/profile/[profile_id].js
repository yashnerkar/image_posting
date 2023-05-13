import { useState,useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import ImageComponent from '../../components/ImageComponent'

const ProfilePage = ({images}) => {
  const router = useRouter();
  const { profile_id } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [croppedSrc, setCroppedSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 });

  console.log(images);

  const handleCaptionChange = (e) => {
    const text = e.target.value;
    setCaption(text);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', croppedSrc);
    formData.append('caption', caption);
    formData.append('username', profile_id);
    const res = await axios.post("http://localhost:3000/api/postimage",formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
// to convert the
    const base64Data = Buffer.from(res.data.imageBufferData).toString('base64');
    const filter = res.data.mimetype;
    const imagebase64 = `data:${filter};base64,${base64Data}`;
    setImagePath(imagebase64);
    setShowModal(false);
  }

  const ImageComponent = ({imagepath})=>{
    return(
      <>
      {imagepath.map((path) => (
        <div className="flex justify-center" key={path}>
          <img src={path} alt="image" className="w-1/2 h-1/2" />
        </div>
      ))}
    </>
    )
  }
  return (
    <div className="container w-full">
      <h1> Profile ID: {profile_id} </h1>{" "}
      <div className="flex justify-center">
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-sm mx-auto">
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
      <ImageComponent croppedSrc={croppedSrc}  setCroppedSrc={setCroppedSrc}  setShowModal={setShowModal}  crop={crop} setCrop={setCrop} />
    </div>
  );
};

export async function getServerSideProps(context) {
    console.log(context.query)
    const id = context.query.profile_id;
  try {
    const response = await axios.get(`http:/localhost:3000/api/getImage?username=${id}`);
    console.log(response)
    return {
      props: {
        images: response.data
      },
    };
  } catch (error) {
    return {
      props: {
        images: [],
      },
    };
    console.log(error);
  }
}

export default ProfilePage;


