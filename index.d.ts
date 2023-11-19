declare module 'dcsm-random-timestamp-based-string-generator' {

  class RandomTBS {
    constructor();
    generate(): string;
    retriveTimestamp(stringGeneratedByRandomTimestampBasedString: string): number;
  }

  function randomTBS(): RandomTBS;

  function timestampFromRandomTBS(string: string): number;

  function generateRandomTBS(): string;

  export { RandomTBS, randomTBS, timestampFromRandomTBS, generateRandomTBS };

  export default generateRandomTBS;
}
