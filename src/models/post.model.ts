export class PostModel{
    post_ID?: number;
    user_ID?: number;
    content?: string;

    constructor({post_ID, user_ID, content}) {
        if(post_ID!==null) this.post_ID = post_ID;
        if(user_ID!==null) this.user_ID = user_ID;
        if(content!==null) this.content = content;
    }
}