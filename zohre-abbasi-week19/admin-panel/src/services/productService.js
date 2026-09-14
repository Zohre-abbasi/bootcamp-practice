import api from "./config";

export const getProducts = async (params) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

export const addProduct = async (data) => {
  const response = await api.post("/products", data);

  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);

  return response.data;
};