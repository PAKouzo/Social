export class CommentModel{
    cmt_ID?: number;
    userID?: number;
    post_ID?: number;
    content?: string;

    constructor({cmt_ID, userID, post_ID, content}) {
        if(cmt_ID!==null) this.cmt_ID = cmt_ID;
        if(userID!==null) this.userID = userID;
        if(post_ID!==null) this.post_ID = post_ID;
        if(content!==null) this.content = content;
    }
}