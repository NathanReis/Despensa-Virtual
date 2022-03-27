import { LocalStorageHelper } from '../helpers/LocalStorageHelper';
import { IUserGroupModel } from './UserGroup';

export interface IUserModel {
  email: string,
  id: number,
  idDefaultUserGroup: number | null,
  name: string,
  picture: string,
  userGroupEntities: Array<IUserGroupModel>
}

export class User {
  public static async getLoggedUser(): Promise<IUserModel> {
    let json = await LocalStorageHelper.get('loggedUser') || '';

    return JSON.parse(json);
  }

  public static async setLoggedUser(user: IUserModel) {
    await LocalStorageHelper.set('loggedUser', JSON.stringify(user));
  }
}
