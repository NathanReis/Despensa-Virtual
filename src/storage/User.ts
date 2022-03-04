import { LocalStorageHelper } from '../helpers/LocalStorageHelper';

interface IUserModel {
    email: string,
    id: number,
    idDefaultUserGroup: number,
    name: string,
    picture: string
}
export class User {
    public static async getLoggedUser(): Promise<IUserModel> {
        let json = await LocalStorageHelper.get('loggedUser') || '';

        return JSON.parse(json);
    }

}
