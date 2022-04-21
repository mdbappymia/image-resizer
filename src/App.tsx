import { FC, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { getBase64, reduce_image_file_size } from "./functions";

const App: FC = () => {
  const [image, setImage] = useState<any>("");
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [convertedHeight, setConvertedHeight] = useState(500);
  const [convertedWidth, setConvertedWidth] = useState(500);

  useEffect(() => {
    const orginalImage = document.getElementById("orginal_img");
    setImageHeight(orginalImage?.clientHeight || 0);
    setImageWidth(orginalImage?.clientWidth || 0);
  }, [image]);
  const imageConvert = (e: any) => {
    const file = e.target.files[0];
    console.log(document.getElementById("orginal_img")?.clientWidth);
    getBase64(file).then((base64: any) => {
      setImage(base64);
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
  return (
    <div className="container">
      <h1>Image Resizer</h1>
      <h3>
        Orginal Image Size: {imageHeight} X {imageWidth}
      </h3>
      <h3>Convert to: </h3>
      <div>
        <label>Height</label>
        <input
          onChange={(e: any) => setConvertedHeight(e.target.value)}
          type="number"
        />
        <br />
        <label>Width</label>
        <input
          onChange={(e: any) => setConvertedWidth(e.target.value)}
          type="number"
        />
      </div>
      <button onClick={() => resizeImage(image)}>Resize</button>
      <br />
      <div>
        <label>Input Image</label>
        <br />
        <input type="file" onChange={imageConvert} />
      </div>
      {image.length > 0 && (
        <div className="orginal_image_container">
          <img id="orginal_img" src={image} alt="" />
        </div>
      )}
      <br />
      <button onClick={() => saveAs(image, "image.jpg")}>Download image</button>
    </div>
  );
};

export default App;
