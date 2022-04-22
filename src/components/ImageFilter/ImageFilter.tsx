import React, { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { imageEdit, reduce_image_file_size } from "../../functions";
import { RootState } from "../../redux/store/store";

interface Iprops {
  resizeImage: Function;
}

const ImageFilter: FC<Iprops> = ({ resizeImage }) => {
  const dispatch = useDispatch();
  const { initImage, convertedHeight, convertedWidth } = useSelector(
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
  } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    // dispatch({ type: "setImg64", payload: initImage });
    imageEdit(
      initImage,
      blur,
      brightness,
      contrast,
      grayscale,
      invert,
      opacity,
      saturate,
      sepia
    ).then((data: any) => {
      dispatch({ type: "setImg64", payload: data });
    });
  }, [
    dispatch,
    initImage,
    blur,
    brightness,
    contrast,
    grayscale,
    invert,
    opacity,
    saturate,
    sepia,
  ]);
  const handleSave = () => {
    dispatch({ type: "setShowFilter", payload: false });
    reduce_image_file_size(img64, convertedHeight, convertedWidth).then(
      (data: any) => {
        dispatch({ type: "setImage", payload: data });
      }
    );
  };
  return (
    <div>
      <h1>Image filter</h1>
      <div>
        <label>blur</label>
        <input
          type="range"
          value={blur}
          onChange={(e: any) =>
            dispatch({ type: "setBlur", payload: parseInt(e.target.value) })
          }
          max={20}
        />
      </div>
      <div>
        <label>brightness</label>
        <input
          type="range"
          value={brightness}
          onChange={(e: any) =>
            dispatch({ type: "setBrightness", payload: e.target.value })
          }
        />
      </div>
      <div>
        <label>contrast</label>
        <input
          onChange={(e: any) =>
            dispatch({ type: "setContrast", payload: parseInt(e.target.value) })
          }
          value={contrast}
          type="range"
        />
      </div>
      <div>
        <label>grayscale</label>
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
      </div>
      <div>
        <label>invert</label>
        <input
          type="range"
          value={invert}
          onChange={(e: any) =>
            dispatch({ type: "setInvert", payload: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <label>opacity</label>
        <input
          type="range"
          value={opacity}
          onChange={(e: any) =>
            dispatch({ type: "setOpacity", payload: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <label>saturate</label>
        <input
          type="range"
          value={saturate}
          onChange={(e: any) =>
            dispatch({ type: "setSaturate", payload: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <label>sepia</label>
        <input
          type="range"
          value={sepia}
          onChange={(e: any) =>
            dispatch({ type: "setSepia", payload: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="flex justify-center">
        <img className="w-96 h-96" src={img64} alt="" />
      </div>
      <button onClick={handleSave}>Save</button>
      <button
        onClick={() => dispatch({ type: "setShowFilter", payload: false })}
      >
        Close
      </button>
      <div>
        <button
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
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default ImageFilter;
