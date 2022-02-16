export class DateHelper {
  public static convertFromStoreToViewFormat(date: string): string {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
  }

  public static convertFromViewToStoreFormat(date: string): string {
    return date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
  }
}
