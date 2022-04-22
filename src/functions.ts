export async function reduce_image_file_size(
  base64Str: string,
  MAX_WIDTH = 450,
  MAX_HEIGHT = 450
) {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      height = MAX_HEIGHT;
      width = MAX_WIDTH;
      canvas.width = width;
      canvas.height = height;
      let ctx: any = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
  });
  return resized_base64;
}

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const imageEdit = async (
  base64Str: string,
  blur: number,
  brightness: number,
  contrast: number,
  grayscale: number,
  invert: number,
  opacity: number,
  saturate: number,
  sepia: number
) => {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      let ctx: any = canvas.getContext("2d");
      ctx.filter = `brightness(${brightness * 2}%) contrast(${
        contrast / 20
      }) blur(${
        blur / 5
      }px) grayscale(${grayscale}%) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%)`;

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
  });
  return resized_base64;
};
