import { Injectable } from "@nestjs/common";
import { UserDTO } from "src/dto/user.dto";
import { UserModel } from "src/models/user.model";

@Injectable()
export class UserService{
    public users: UserModel[] = []
    getUser(): UserModel[] {
        return this.users;
    }
    createUser(userDTO: UserDTO): UserModel {
        const user: UserModel = {
            user_ID: Math.random(),
            ...userDTO
        };
        this.users.push(user)
        return user;
    }
    updateDetail(user_ID: number, userDTO: UserDTO): UserModel {
        const index = this.users.findIndex(item => item.user_ID === Number(user_ID))
        this.users[index].Username = userDTO.Username;
        this.users[index].password = userDTO.password;
        this.users[index].Bio = userDTO.Bio;
        return userDTO;
    }
    deleteUser(user_ID: number): boolean {
        const index = this.users.findIndex(item => item.user_ID === Number(user_ID))
        if(index!=-1){
            this.users.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }
}