export class TransformHelper {
  public static trim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }

  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }
}
