import axios from "@/utils/axios";

export const uploadDoc = (formData, base64Files) => {
  return axios.post(`/document-upload-convert`, { files: base64Files });
};

export const getdocuments = () => {
  return axios.get(`/documents`);
};

export const getSingleDoc = (docId) => {
  return axios.get(`/documents/${docId}`);
};
