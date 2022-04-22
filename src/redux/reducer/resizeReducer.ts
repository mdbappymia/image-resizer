interface ResizeState {
  imfile: string;
  initImage: string;
  image: string;
  imageHeight: number;
  imageWidth: number;
  convertedHeight: number;
  convertedWidth: number;
  showFilter: boolean;
}

const initialState: ResizeState = {
  imfile: "",
  initImage: "",
  image: "",
  imageHeight: 0,
  imageWidth: 0,
  convertedHeight: 500,
  convertedWidth: 500,
  showFilter: false,
};

export const resizeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "setImfile": {
      return {
        ...state,
        imfile: action.payload,
      };
    }
    case "setInitImage": {
      return {
        ...state,
        initImage: action.payload,
      };
    }
    case "setImage": {
      return {
        ...state,
        image: action.payload,
      };
    }
    case "setImageWidth": {
      return {
        ...state,
        imageWidth: action.payload,
      };
    }
    case "setImageHeight": {
      return {
        ...state,
        imageHeight: action.payload,
      };
    }
    case "setConvertedHeight": {
      return {
        ...state,
        convertedHeight: action.payload,
      };
    }
    case "setConvertedWidth": {
      return {
        ...state,
        convertedWidth: action.payload,
      };
    }
    case "setShowFilter": {
      return {
        ...state,
        showFilter: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
// const [imfile, setImfile] = useState("");
// const [initImage, setInitImage] = useState("");
// const [image, setImage] = useState<any>("");
// const [imageHeight, setImageHeight] = useState(0);
// const [imageWidth, setImageWidth] = useState(0);
// const [convertedHeight, setConvertedHeight] = useState(500);
// const [convertedWidth, setConvertedWidth] = useState(500);
// const [showFilter, setShowFilter] = useState(false);
