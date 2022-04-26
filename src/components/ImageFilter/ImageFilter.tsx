import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { imageEdit, reduce_image_file_size } from "../../functions";
import { RootState } from "../../redux/store/store";

interface Iprops {
  resizeImage: Function;
}

const ImageFilter: FC<Iprops> = ({ resizeImage }) => {
  const dispatch = useDispatch();
  const { initImage, imageHeight, imageWidth } = useSelector(
    (state: RootState) => state.resize
  );
  const {
    img64,
    blur,
    brightness,
    contrast,
    grayscale,
    invert,
    opacity,
    saturate,
    sepia,
    hue_rotate,
  } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch({ type: "setImg64", payload: initImage });
  }, [dispatch, initImage]);
  const handleSave = () => {
    imageEdit(
      initImage,
      blur,
      brightness,
      contrast,
      grayscale,
      invert,
      opacity,
      saturate,
      sepia,
      hue_rotate
    ).then((data: any) => {
      dispatch({ type: "setShowFilter", payload: false });
      reduce_image_file_size(data, imageWidth, imageHeight).then(
        (data: any) => {
          dispatch({ type: "setImage", payload: data });
        }
      );
    });
  };
  return (
    <div className="h-full pb-96 mx-auto container">
      <h1 className="font-bold uppercase text-5xl text-center my-5 py-4 border-4 rounded-full">
        Image filter
      </h1>
      <table className="text-left mx-auto">
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">blur</td>
          <input
            type="range"
            value={blur}
            onChange={(e: any) =>
              dispatch({ type: "setBlur", payload: parseInt(e.target.value) })
            }
            max={20}
          />
          <span className="mx-4">{blur}px</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">brightness</td>
          <input
            type="range"
            value={brightness}
            onChange={(e: any) =>
              dispatch({ type: "setBrightness", payload: e.target.value })
            }
          />
          <span className="mx-4">{brightness * 2}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">contrast</td>
          <input
            onChange={(e: any) =>
              dispatch({
                type: "setContrast",
                payload: parseInt(e.target.value),
              })
            }
            value={contrast}
            type="range"
          />
          <span className="mx-4">{contrast * 5}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">grayscale</td>
          <input
            type="range"
            onChange={(e: any) =>
              dispatch({
                type: "setGrayscale",
                payload: parseInt(e.target.value),
              })
            }
            value={grayscale}
          />
          <span className="mx-4">{grayscale}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">invert</td>
          <input
            type="range"
            value={invert}
            onChange={(e: any) =>
              dispatch({
                type: "setInvert",
                payload: parseInt(e.target.value),
              })
            }
          />
          <span className="mx-4">{invert}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">opacity</td>
          <input
            type="range"
            value={opacity}
            onChange={(e: any) =>
              dispatch({
                type: "setOpacity",
                payload: parseInt(e.target.value),
              })
            }
          />
          <span className="mx-4">{opacity}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">saturate</td>
          <input
            type="range"
            value={saturate}
            onChange={(e: any) =>
              dispatch({
                type: "setSaturate",
                payload: parseInt(e.target.value),
              })
            }
          />
          <span className="mx-4">{saturate}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">sepia</td>
          <input
            type="range"
            value={sepia}
            onChange={(e: any) =>
              dispatch({
                type: "setSepia",
                payload: parseInt(e.target.value),
              })
            }
          />
          <span className="mx-4">{sepia}%</span>
        </tr>
        <tr className="text-lg">
          <td className=" capitalize px-5 font-bold">hue-rotate</td>
          <input
            type="range"
            value={hue_rotate}
            onChange={(e: any) =>
              dispatch({
                type: "setHueRotate",
                payload: parseInt(e.target.value),
              })
            }
            max={360}
          />
          <span className="mx-4">{hue_rotate}deg</span>
        </tr>
      </table>
      <div className="flex justify-center my-10">
        <img
          style={{
            filter: `brightness(${brightness * 2}%) contrast(${
              contrast / 20
            }) blur(${
              blur / 5
            }px) grayscale(${grayscale}%) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%) hue-rotate(${hue_rotate}deg)`,
          }}
          className="w-96 h-96 "
          src={img64}
          alt=""
        />
      </div>
      <div>
        <button
          className="top-0 right-0 bg-green-700 px-4 py-3 hover:bg-green-800 m-1"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="top-0 right-0 bg-orange-700 px-4 py-3 hover:bg-orange-800 m-1"
          onClick={() => {
            dispatch({ type: "setBlur", payload: 0 });
            dispatch({ type: "setBrightness", payload: 50 });
            dispatch({
              type: "setContrast",
              payload: 20,
            });
            dispatch({
              type: "setGrayscale",
              payload: 0,
            });
            dispatch({ type: "setInvert", payload: 0 });
            dispatch({ type: "setOpacity", payload: 100 });

            dispatch({
              type: "setSaturate",
              payload: 100,
            });
            dispatch({ type: "setSepia", payload: 0 });
            dispatch({ type: "setHueRotate", payload: 0 });
          }}
        >
          reset
        </button>

        <button
          className="top-0 right-0 bg-red-700 px-4 py-3 hover:bg-red-800 m-1"
          onClick={() => dispatch({ type: "setShowFilter", payload: false })}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageFilter;
