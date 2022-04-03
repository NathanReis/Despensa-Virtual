import { AxiosResponse } from 'axios';
import api from '../services/api';
import { User } from './User';

export interface IUserGroupModel {
  id: number;
  name: string;
}

interface IUserGroupResponse {
  id: number;
}

export class UserGroupStorage {
  public static async getAll(): Promise<IUserGroupModel[]> {
    let loggedUser = await User.getLoggedUser();

    return loggedUser.userGroupEntities;
  }

  public static async getById(id: number): Promise<IUserGroupModel | null> {
    let userGroups = await this.getAll();
    let userGroup = userGroups.find(_userGroup => _userGroup.id === id);

    return userGroup ?? null;
  }

  public static async add(userGroup: IUserGroupModel, isDefault: boolean): Promise<number> {
    let response: AxiosResponse<IUserGroupResponse> = await api.post('/user-groups', { name: userGroup.name });
    let createdId = response.data.id;

    userGroup.id = createdId;

    let loggedUser = await User.getLoggedUser();
    loggedUser.userGroupEntities.push(userGroup);

    await api.post('/user-groups/users', { idUserGroup: createdId, idUser: loggedUser.id });

    await User.setLoggedUser(loggedUser);

    if (isDefault) {
      await this.setAsDefault(userGroup);
    }

    return createdId;
  }

  public static async remove(id: number): Promise<void> {
    let loggedUser = await User.getLoggedUser();
    loggedUser.userGroupEntities = loggedUser.userGroupEntities.filter(_userGroup => _userGroup.id !== id);

    if (loggedUser.idDefaultUserGroup === id) {
      loggedUser.idDefaultUserGroup = null;
    }

    await api.delete(`user-groups/${id}/users/${loggedUser.id}`);

    await User.setLoggedUser(loggedUser);
  }

  public static async update(userGroup: IUserGroupModel, isDefault: boolean): Promise<void> {
    await api.put(`/user-groups/${userGroup.id}`, { name: userGroup.name });

    let loggedUser = await User.getLoggedUser();
    let index = loggedUser.userGroupEntities.findIndex(_userGroup => _userGroup.id === userGroup.id);

    if (index >= 0) {
      loggedUser.userGroupEntities[index] = userGroup;

      if (!isDefault) {
        loggedUser.idDefaultUserGroup = null;
      }
    }

    await User.setLoggedUser(loggedUser);

    if (index >= 0 && isDefault) {
      await this.setAsDefault(userGroup);
    }
  }

  public static async setAsDefault(userGroup: IUserGroupModel): Promise<void> {
    let loggedUser = await User.getLoggedUser();
    loggedUser.idDefaultUserGroup = userGroup.id;

    await api.put(`/users/${loggedUser.id}`, { idDefaultUserGroup: userGroup.id });

    await User.setLoggedUser(loggedUser);
  }
}
