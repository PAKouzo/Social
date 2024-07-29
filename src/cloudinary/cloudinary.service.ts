import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, UploadStream, v2 } from "cloudinary";
import {v2 as cloudinary} from 'cloudinary'
import streamifier = require('streamifier');
@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>((resolve, reject)=>{
        const upload = cloudinary.uploader.upload_stream((error, result)=>{
            if(error) return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(upload)
    })
  }
}


