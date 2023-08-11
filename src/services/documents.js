import axios from "@/utils/axios";

export const uploadDoc = (base64Files) => {
  return axios.post(`/document-upload-convert`, { files: base64Files });
};

export const getdocuments = () => {
  return axios.get(`/documents`);
};

export const getSingleDoc = (docId) => {
  return axios.get(`/documents/${docId}`);
};

export const createPrint = (data) => {
  return axios.post(`/prints`, data);
};

export const createResourceTool = (data) => {
  return axios.post(`/document-resource-tools`, data);
};

export const selfSignDocument = (docId) => {
  return axios.get(`/document-participant-add-self/${docId}`);
};
