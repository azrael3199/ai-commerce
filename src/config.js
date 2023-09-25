const config = {
  appName: import.meta.env.VITE_APP_NAME,
  appwriteEndpoint: import.meta.env.VITE_API_ENDPOINT,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  dbProductsId: import.meta.env.VITE_DB_PRODUCTS,
  collectionProductsId: import.meta.env.VITE_COLLECTION_PRODUCTS,
  collectionOrdersId: import.meta.env.VITE_COLLECTION_ORDERS,
  stripePubKey: import.meta.env.VITE_STRIPE_PUB_KEY,
};

export default config;
