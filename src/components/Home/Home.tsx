import { FC, useCallback, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { getBase64, imageEdit, reduce_image_file_size } from "../../functions";

const Home: FC = () => {
  const [imfile, setImfile] = useState("");
  const [img64, setImg64] = useState("");
  const [image, setImage] = useState<any>("");
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [convertedHeight, setConvertedHeight] = useState(500);
  const [convertedWidth, setConvertedWidth] = useState(500);

  //   filter state start
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(20);
  const [grayscale, setGrayscale] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);
  useCallback(() => {
    imageEdit(
      img64,
      blur,
      brightness,
      contrast,
      grayscale,
      invert,
      opacity,
      saturate,
      sepia
    ).then((data) => {
      setImage(data);
    });
  }, [
    img64,
    blur,
    brightness,
    contrast,
    grayscale,
    invert,
    opacity,
    saturate,
    sepia,
  ])();

  useEffect(() => {
    const orginalImage = document.getElementById("orginal_img");
    setImageHeight(orginalImage?.clientHeight || 0);
    setImageWidth(orginalImage?.clientWidth || 0);
    // imgEditFunc();
  }, [image]);
  const imageConvert = (e: any) => {
    const file = e.target.files[0];
    setImfile(e.target.files[0].filename);

    getBase64(file).then((base64: any) => {
      setImg64(base64);
      imageEdit(
        base64,
        blur,
        brightness,
        contrast,
        grayscale,
        invert,
        opacity,
        saturate,
        sepia
      ).then((data) => {
        setImage(data);
      });
    });
  };

  const resizeImage = (base64: any) => {
    reduce_image_file_size(base64, convertedHeight, convertedWidth).then(
      (data) => {
        setImage(data);
      }
    );
  };
  // console.log(imageHeight, imageWidth);

  const handleClear = () => {
    setImg64("");
    setImage("");
    setImfile("");
  };

  return (
    <div className="container">
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
      <div className="convert-input-area">
        <label>Convert to: </label>
        <br />
        <input
          onChange={(e: any) => setConvertedHeight(e.target.value)}
          type="number"
          placeholder="Height"
        />
        <input
          onChange={(e: any) => setConvertedWidth(e.target.value)}
          type="number"
          placeholder="Width"
        />
      </div>
      <div>
        <h1>Image filter</h1>
        <div>
          <label>blur</label>
          <input
            type="range"
            value={blur}
            onChange={(e: any) => setBlur(parseInt(e.target.value))}
            max={20}
          />
        </div>
        <div>
          <label>brightness</label>
          <input
            type="range"
            value={brightness}
            onChange={(e: any) => setBrightness(e.target.value)}
          />
        </div>
        <div>
          <label>contrast</label>
          <input
            onChange={(e: any) => setContrast(parseInt(e.target.value))}
            value={contrast}
            type="range"
          />
        </div>
        <div>
          <label>grayscale</label>
          <input
            type="range"
            onChange={(e: any) => setGrayscale(parseInt(e.target.value))}
            value={grayscale}
          />
        </div>
        <div>
          <label>invert</label>
          <input
            type="range"
            value={invert}
            onChange={(e: any) => setInvert(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>opacity</label>
          <input
            type="range"
            value={opacity}
            onChange={(e: any) => setOpacity(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>saturate</label>
          <input
            type="range"
            value={saturate}
            onChange={(e: any) => setSaturate(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>sepia</label>
          <input
            type="range"
            value={sepia}
            onChange={(e: any) => setSepia(parseInt(e.target.value))}
          />
        </div>
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
    </div>
  );
};

export default Home;
