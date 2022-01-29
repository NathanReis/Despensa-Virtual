import * as SecureStore from 'expo-secure-store';

export class LocalStorageHelper {
  private static readonly prefixKey = 'ftttcc';

  private static formatKey(unformattedKey: string): string {
    return `${this.prefixKey}_${unformattedKey}`;
  }

  public static async get(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(this.formatKey(key));
  }

  public static async set(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(this.formatKey(key), value);
  }

  public static async delete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(this.formatKey(key));
  }
}
