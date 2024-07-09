import axios from "axios";

export async function fileUpload(file) {
  if (!file) {
    return null;
  }
  let form = new FormData();
  form.append("file", file);
  try {
    let res = await axios.post(
      "https://freeskout-career.onrender.com/api/v1/file/upload",
      form,
      {
        withCredentials: true,
      }
    );
    if (
      res &&
      res.data &&
      res.data.result &&
      res.data.result.secure_url &&
      res.data.result.public_id
    ) {
      return {
        secure_url: res.data.result.secure_url,
        public_id: res.data.result.public_id,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
