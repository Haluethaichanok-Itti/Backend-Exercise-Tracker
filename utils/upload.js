import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import os from "os";
const cloudinaryUploadCard = async (file) => {
  if (!file) {
    throw new Error("No file provided!!!");
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "orangecat/card",
    type: "private",
  });

  const fileURl = result.secure_url;
  await fs.unlink(file.path);

  return fileURl;
};

const cloudinaryUploadProfile = async (file) => {
  if (!file) {
    throw new Error("No file provided!!!");
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "orangecat/profile",
    type: "private",
  });

  const fileURl = result.secure_url;
  await fs.unlink(file.path);

  return fileURl;
};
const cloudinaryUploadProfileCam = async (base64Image) => {
  if (!base64Image) {
    throw new Error("No image provided!!!");
  }

  const decodedImage = Buffer.from(base64Image.split(",")[1], "base64");
  const tempFilePath = path.join(os.tmpdir(), "temp_image.jpg");

  await fs.writeFile(tempFilePath, decodedImage);

  let result = await cloudinary.uploader.upload(tempFilePath, {
    folder: "orangecat/profile",
    type: "private",
  });

  const fileURl = result.secure_url;
  await fs.unlink(tempFilePath);

  return fileURl;
};
const cloudinaryUploadQuote = async (file) => {
  if (!file) {
    throw new Error("No file provided!!!");
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "orangecat/quote",
    type: "private",
  });

  const fileURl = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await fs.unlink(file.path);

  return fileURl;
};

export {
  cloudinaryUploadCard,
  cloudinaryUploadProfile,
  cloudinaryUploadQuote,
  cloudinaryUploadProfileCam,
};
