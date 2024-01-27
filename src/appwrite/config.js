import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

export class Service {
   client = new Client();
   databases;
   bucket;

   constructor() {
      this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
      this.databases = new Databases(this.client);
   }

   async createPost({ title, slug, content, featuredImage, status, userId }) {
      try {
         return await this.databases.createDocument(
            conf.appwritedDatabaseId,
            conf.appwriteCollectionId,
            slug,
            { title, content, featuredImage, status, userId }
         );
      } catch (error) {
         console.log("CreatePost::", error);
      }
   }

   async updatePost(slug, { title, content, featuredImage, status }) {
      try {
         return await this.databases.updateDocument(
            conf.appwritedDatabaseId,
            conf.appwriteCollectionId,
            slug,
            { title, content, featuredImage, status }
         );
      } catch (error) {
         console.log("updatePost::", error);
      }
   }

   async deletePost(slug) {
      try {
         await this.databases.deleteDocument(
            conf.appwritedDatabaseId,
            conf.appwriteCollectionId,
            slug
         );
         return true;
      } catch (error) {
         console.log("DeletePost::", error);
      }
   }

   async getPost(slug) {
      try {
         return await this.databases.getDocument(
            conf.appwritedDatabaseId,
            conf.appwriteCollectionId,
            slug
         );
      } catch (error) {
         console.log("GetPost::", error);
      }
   }

   async getPosts(query = [Query.equal("status", "active")]) {
      try {
        return await this.databases.listDocuments(
            conf.appwritedDatabaseId,
            conf.appwriteCollectionId,
            query
         );
      } catch (error) {
         console.log("listPost::", error);
      }
   }
}

const service = new Service();

export default service;
