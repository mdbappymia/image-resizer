interface FilterState {
  img64: string;
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

const initialState: FilterState = {
  img64: "",
  blur: 0,
  brightness: 50,
  contrast: 20,
  grayscale: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};
export const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "setImg64": {
      return {
        ...state,
        img64: action.payload,
      };
    }
    case "setBlur": {
      return {
        ...state,
        blur: action.payload,
      };
    }
    case "setBrightness": {
      return {
        ...state,
        brightness: action.payload,
      };
    }
    case "setContrast": {
      return {
        ...state,
        contrast: action.payload,
      };
    }
    case "setGrayscale": {
      return {
        ...state,
        grayscale: action.payload,
      };
    }
    case "setInvert": {
      return {
        ...state,
        invert: action.payload,
      };
    }
    case "setOpacity": {
      return {
        ...state,
        opacity: action.payload,
      };
    }
    case "setSaturate": {
      return {
        ...state,
        saturate: action.payload,
      };
    }
    case "setSepia": {
      return {
        ...state,
        sepia: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
//   const [img64, setImg64] = useState(image);
//   const [blur, setBlur] = useState(0);
//   const [brightness, setBrightness] = useState(50);
//   const [contrast, setContrast] = useState(20);
//   const [grayscale, setGrayscale] = useState(0);
//   const [invert, setInvert] = useState(0);
//   const [opacity, setOpacity] = useState(100);
//   const [saturate, setSaturate] = useState(100);
//   const [sepia, setSepia] = useState(0);
