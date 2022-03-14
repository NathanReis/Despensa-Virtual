import { LocalStorageHelper } from '../helpers/LocalStorageHelper';

export interface IUserModel {
    email: string,
    id: number,
    idDefaultUserGroup: number,
    name: string,
    picture: string,
    userGroupEntities: Array<IUserGroupModel>
}

export interface IUserGroupModel {
    id: number,
    name: string
}
export class User {
    public static async getLoggedUser(): Promise<IUserModel> {
        let json = await LocalStorageHelper.get('loggedUser') || '';

        return JSON.parse(json);
    }

}
