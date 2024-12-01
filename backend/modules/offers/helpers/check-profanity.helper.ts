import * as profanityList from '../../../assets/profanity-list.json';

export class CheckProfanityHelper {
  private static badWords: string[] = profanityList.data;

  public static async checkProfanity(text: string): Promise<boolean> {
    const normalizedText = text.toLowerCase();
    const words = normalizedText.split(/\s*,\s*|\s+/);

    const badWord = words.find((word) => this.badWords.includes(word));
    if (badWord) {
      console.log('Profanity found:', badWord);
      return true;
    }
    return false;
  }
}
