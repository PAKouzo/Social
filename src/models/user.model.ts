export class UserModel{
    user_ID?: number;
    Username?: string;
    password?: string;
    Bio?: string;
    avartar?: string;

    constructor({user_ID, Username, password, Bio}) {
        if(user_ID!==null) this.user_ID = user_ID;
        if(Username!==null) this.Username = Username;
        if(password!==null) this.password = password;
    }
}