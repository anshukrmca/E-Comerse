// ImageUpload.js
import React, { useEffect, useState } from "react";
import { storage } from "../../DB/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { IoCloudUploadSharp } from "react-icons/io5";
import { FaImages, FaImage } from "react-icons/fa";

const Image = ({ setSubImage, setMainImage, mainImagess, subImagess }) => {
  const [subImages, setSubImages] = useState([]);
  const [subImgPresentage, setsubImgPresentage] = useState(0);
  const [subimageError, setsubImageError] = useState(false);
  const [subImageUrls, setSubImageUrls] = useState([]);
  const [mainImage, setmainImage] = useState("");
  const [mainImageurl, setMainImageUrl] = useState("");
  const [mainImgPresentage, setmainImgPresentage] = useState(0);
  const [mainimageError, setmainImageError] = useState(false);

  const handleChangeSub = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSubImages(filesArray);
    }
  };

  const handleChangeMain = (e) => {
    if (e.target.files[0]) {
      setmainImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    await handleUploadSub();
    await handleUploadMain();
  };

  const handleUploadMain = async () => {
    if (mainImage) {
      const storageRef = ref(storage, `Mainimages/${mainImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, mainImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setmainImgPresentage(Math.round(progress));
        },
        (error) => {
          setmainImageError(true);
        },
        () => {
          getDownloadURL(storageRef)
            .then((url) => {
              setMainImageUrl(url);
              setMainImage(url);
              console.log('Download MainURL: ', url);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      );
    }
  };

  const handleUploadSub = async () => {
    try {
      const promises = subImages.map(async (image) => {
        const storageRef = ref(storage, `Subimages/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setsubImgPresentage(Math.round(progress));
          },
          (error) => {
            setsubImageError(true);
          },
          () => {
            getDownloadURL(storageRef)
              .then((url) => {
                setSubImageUrls((prevUrls) => [...prevUrls, url]);
                setSubImage((prevUrls) => [...prevUrls, url]);
                console.log('Download SubURL: ', url);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          }
        );
      });
      await Promise.all(promises);
      setSubImages([]);
      setsubImgPresentage(0)
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  useEffect(() => {
    if (subImagess) {
      setSubImageUrls(subImagess || []);
      setMainImageUrl(mainImagess || "");
    }
  }, [subImagess, mainImagess])

  const MainImage = () => {
    return (
      <div className="block">
        <div>
          <label className="flex gap-3 cursor-pointer">
            <input
              type="file"
              onChange={handleChangeMain}
              className="hidden"
            />
            <span>Main Image</span>
            <FaImage size={30} />
          </label>
          <p className="text-sm self-center">
            {mainimageError ? (
              <span className="text-red-700">
                Error uploading Main image (file size must be less than 2 MB)
              </span>
            ) : mainImgPresentage > 0 && mainImgPresentage < 100 ? (
              <span className="text-lime-700">Uploading: ${mainImgPresentage} %</span>
            ) : mainImgPresentage === 100 ? (
              <span className="text-green-700">
                Main Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        {mainImageurl && <div className="flex flex-wrap gap-2">
          <img src={mainImageurl} alt="main" className="w-20 h-20 border-[1px] border-gray-600" />
        </div>}
      </div>
    );
  };

  const SubImage = () => {
    return (
      <div className="block">
        <div>
          <label className="flex gap-3  cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleChangeSub}
              className="hidden"
            />
            <span>Sub Image</span>
            <FaImages size={30} />
          </label>
          <p className="text-sm self-center">
            {subimageError ? (
              <span className="text-red-700">
                Error uploading Sub image (file size must be less than 2 MB)
              </span>
            ) : subImgPresentage > 0 && subImgPresentage < 100 ? (
              <span className="text-lime-700">Uploading: ${subImgPresentage} %</span>
            ) : subImgPresentage === 100 ? (
              <span className="text-green-700">
                Sub Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {subImageUrls && subImageUrls.map((item, index) => (
            <img key={index} src={item} alt="" className="w-20 h-20 border-[1px] border-gray-600" />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-3">
        <MainImage />
        <SubImage />
        <button
          onClick={handleUpload}
          className="bg-green-500 flex gap-4 items-center hover:bg-green-700 h-8  py-1 px-4 rounded"
        >
          Upload <IoCloudUploadSharp />
        </button>
      </div>

    </div>
  );
};

export default Image;
