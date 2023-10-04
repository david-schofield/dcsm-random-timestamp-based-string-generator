declare module 'dcsm-random-timestamp-based-string-generator' {

  export function randomTBS(): RandomTimestampBasedStringGenerator;

  export function timestampFromRandomTBS(string: string): number;

  export function generateRandomTBS(): string;

  export class RandomTBS {
    constructor();
    generate(): string;
    retriveTimestamp(stringGeneratedByRandomTimestampBasedString: string): number;
  }
  
  export default generateRandomTBS;
}
