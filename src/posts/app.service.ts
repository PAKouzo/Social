import { Injectable } from "@nestjs/common";
import { PostDTO } from "src/dto/post.dto";
import { PostModel } from "src/models/post.model";

@Injectable()
export class PostService {
  public posts: PostModel[] = [];
  getPosts(): PostModel[] {
    return this.posts;
  }
  createPost(user_ID: number, postDTO: PostDTO): PostModel {
    const post: PostModel = {
      post_ID: Math.random(),
      ...postDTO,
    };
    this.posts.push(post);
    return post;
  }
  updatePost(post_ID: number, postDTO: PostDTO): PostModel {
    const index = this.posts.findIndex(
      (item) => item.post_ID === Number(post_ID),
    );
    this.posts[index].content = postDTO.content;
    return postDTO;
  }
  deletePost(post_ID: number): boolean {
    const index = this.posts.findIndex(
      (item) => item.post_ID === Number(post_ID),
    );
    if (index != -1) {
      this.posts.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}