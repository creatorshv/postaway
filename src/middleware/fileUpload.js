import fileUpload from "express-fileupload";

const fileUploadMiddleware = fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default fileUploadMiddleware;
