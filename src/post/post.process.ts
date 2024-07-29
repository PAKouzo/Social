import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor()
export class PostFileUpload {
  @Process('fileUpload')
  handleFileUpload(job: Job) {
    console.log(job.data);
  }
}