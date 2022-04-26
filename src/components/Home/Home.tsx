import { FC, useEffect } from "react";
import { saveAs } from "file-saver";
import { getBase64, reduce_image_file_size } from "../../functions";
import ImageFilter from "../ImageFilter/ImageFilter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const Home: FC = () => {
  const {
    image,
    imageHeight,
    imageWidth,
    convertedHeight,
    convertedWidth,
    showFilter,
    imfile,
  } = useSelector((state: RootState) => state.resize);
  const dispatch = useDispatch();

  useEffect(() => {
    var i = new Image();
    i.onload = function () {
      dispatch({
        type: "setImageHeight",
        payload: i.height || 0,
      });

      dispatch({
        type: "setImageWidth",
        payload: i.width || 0,
      });
    };
    i.src = image;
  }, [image, dispatch]);
  const imageConvert = (e: any) => {
    const file = e.target.files[0];
    dispatch({ type: "setImfile", payload: e.target.files[0].filename });

    getBase64(file).then((base64: any) => {
      dispatch({ type: "setInitImage", payload: base64 });

      dispatch({ type: "setImage", payload: base64 });
    });
  };

  const resizeImage = (base64: any) => {
    reduce_image_file_size(base64, convertedWidth, convertedHeight).then(
      (data: any) => {
        dispatch({ type: "setImage", payload: data });
      }
    );
  };

  const handleClear = () => {
    dispatch({ type: "setImage", payload: "" });
    dispatch({ type: "setImfile", payload: "" });
    dispatch({ type: "setConvertedHeight", payload: "500" });
    dispatch({ type: "setConvertedWidth", payload: "500" });
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="header-text">Image Resizer</h1>
      <h3>
        Orginal Image Size: {imageHeight} X {imageWidth}
      </h3>
      <div>
        <div className="upload-container">
          <input
            className="image-input"
            id="input-image"
            type="file"
            value={imfile}
            onChange={imageConvert}
          />
        </div>
      </div>
      <div className="my-5">
        <label className="text-xl font-bold">
          HEIGHT (px) <span className="font-normal">X</span> WIDTH (px)
        </label>
        <br />
        <input
          className="p-2 mx-1 border"
          value={convertedHeight}
          onChange={(e: any) =>
            dispatch({ type: "setConvertedHeight", payload: e.target.value })
          }
          type="number"
          placeholder="Height"
        />
        <input
          className="p-2 mx-1 border"
          value={convertedWidth}
          onChange={(e: any) =>
            dispatch({ type: "setConvertedWidth", payload: e.target.value })
          }
          type="number"
          placeholder="Width"
        />
      </div>

      <div>
        <button
          disabled={!image}
          onClick={() => dispatch({ type: "setShowFilter", payload: true })}
          className="bg-green-500 px-4 py-1 hover:bg-green-600 text-white m-1"
        >
          <i className="fas fa-edit"></i> Edit image
        </button>
        <button
          disabled={!image}
          className="bg-indigo-500 px-4 py-1 hover:bg-indigo-600 text-white m-1"
          onClick={() => resizeImage(image)}
        >
          <i className="fas fa-crop-alt"></i> Resize
        </button>

        <button
          disabled={!image}
          className="bg-red-500 px-4 py-1 hover:bg-red-600 text-white m-1"
          onClick={handleClear}
        >
          <i className="fas fa-trash-alt"></i> Clear
        </button>
        <button
          disabled={!image}
          onClick={() => saveAs(image, "image.jpg")}
          className="fas fa-arrow-down p-2 text-xl border-2 rounded-full bg-red-800 text-white hover:bg-white hover:text-gray-400 transition-all "
        >
          Download
        </button>
      </div>
      {image.length > 0 && (
        <div className="my-10 p-3 mx-auto">
          <div
            style={{ maxWidth: imageWidth }}
            className="text-center orginal_img border-4 border-black rounded-xl mx-auto"
          >
            <div className="flex justify-center">
              <img id="orginal_img" src={image} alt="" />
            </div>
          </div>
        </div>
      )}
      <br />
      {showFilter && (
        <div className="absolute top-0 left-0 w-full bg-black text-white">
          <ImageFilter resizeImage={resizeImage} />
        </div>
      )}
    </div>
  );
};

export default Home;
