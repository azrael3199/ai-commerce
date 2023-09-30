import { Client as Appwrite, Databases, Account, ID } from "appwrite";
import config from "./config";

const api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    api.sdk = { database, account };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create(ID.unique(), email, password, name);
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  verifyEmail: () => {
    return api
      .provider()
      .account.createVerification(location.origin + "/verifyEmail");
  },

  confirmVerification: (userId, secret) => {
    return api.provider().account.updateVerification(userId, secret);
  },

  changePassword: (email) => {
    return api
      .provider()
      .account.createRecovery(email, location.origin + "/changePassword");
  },

  verifyChangePassword: (userId, secret, password) => {
    return api
      .provider()
      .account.updateRecovery(userId, secret, password, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (databaseId, collectionId, data) => {
    return api
      .provider()
      .database.createDocument(databaseId, collectionId, ID.unique(), data);
  },

  listDocuments: (databaseId, collectionId) => {
    return api.provider().database.listDocuments(databaseId, collectionId);
  },

  updateDocument: (databaseId, collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },
};

export default api;
