import conf from "../conf/conf";
import { Client, ID, Storage, Query } from "appwrite";

export class UploadService {
   client = new Client();
   bucket;

   constructor() {
      this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
      this.bucket = new Storage(this.client);
   }

   async uploadFile(file) {
      try {
         return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
         );
      } catch (error) {
         console.log("uploadFile ::", error);
      }
   }

   async deleteFile(fileID) {
      try {
         await this.bucket.getFile(conf.appwriteBucketId, fileID);
         return true;
      } catch (error) {
         console.log("deleteFile::", error);
      }
   }
   async getFile(fileID) {
      try {
         return await this.bucket.getFile(conf.appwriteBucketId, fileID);
      } catch (error) {
         console.log("getFile::", error);
      }
   }

   filePrev(fileID) {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
   }
}

const uploadService = new UploadService();

export default uploadService;
