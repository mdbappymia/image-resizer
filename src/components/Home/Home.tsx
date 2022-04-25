import { FC, useEffect } from "react";
import { saveAs } from "file-saver";
import { getBase64, reduce_image_file_size } from "../../functions";
import ImageFilter from "../ImageFilter/ImageFilter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const Home: FC = () => {
  //   const [imfile, setImfile] = useState("");
  //   const [initImage, setInitImage] = useState("");
  //   const [image, setImage] = useState<any>("");
  //   const [imageHeight, setImageHeight] = useState(0);
  //   const [imageWidth, setImageWidth] = useState(0);
  //   const [convertedHeight, setConvertedHeight] = useState(500);
  //   const [convertedWidth, setConvertedWidth] = useState(500);
  //   const [showFilter, setShowFilter] = useState(false);

  const {
    image,
    imageHeight,
    imageWidth,
    convertedHeight,
    convertedWidth,
    showFilter,
  } = useSelector((state: RootState) => state.resize);
  const dispatch = useDispatch();

  useEffect(() => {
    const orginalImage = document.getElementById("orginal_img");
    dispatch({
      type: "setImageHeight",
      payload: orginalImage?.clientHeight || 0,
    });

    dispatch({
      type: "setImageWidth",
      payload: orginalImage?.clientWidth || 0,
    });
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
    reduce_image_file_size(base64, convertedHeight, convertedWidth).then(
      (data: any) => {
        dispatch({ type: "setImage", payload: data });
      }
    );
  };

  const handleClear = () => {
    dispatch({ type: "setImage", payload: "" });
    dispatch({ type: "setImfile", payload: "" });
    dispatch({ type: "setConvertedHeight", payload: "" });
    dispatch({ type: "setConvertedWidth", payload: "" });
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
            // value={imfile}
            onChange={imageConvert}
          />
        </div>
      </div>
      <div className="convert-input-area">
        <label>Convert to: </label>
        <br />
        <input
          value={convertedHeight}
          onChange={(e: any) =>
            dispatch({ type: "setConvertedHeight", payload: e.target.value })
          }
          type="number"
          placeholder="Height"
        />
        <input
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
          className="bg-green-500"
        >
          Edit image
        </button>
      </div>
      <div>
        <button
          disabled={!image}
          className="resize-button"
          onClick={() => resizeImage(image)}
        >
          Resize
        </button>

        <button
          disabled={!image}
          className="clear-button"
          onClick={handleClear}
        >
          Clear
        </button>
        <br />
        <button
          className="download-button"
          disabled={!image}
          onClick={() => saveAs(image, "image.jpg")}
        >
          Download image
        </button>
      </div>
      {image.length > 0 && (
        <div className="orginal_image_container">
          <img id="orginal_img" src={image} alt="" />
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
