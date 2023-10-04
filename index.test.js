import { randomTBS, timestampFromRandomTBS, generateRandomTBS } from './index.js';

describe('Generate a random timestamp based string', () => {
  describe('generate', () => {
    it('should generate a string', () => {
      const result = randomTBS().generate();
      expect(typeof result).toBe('string');
    });

    it('should generate a unique string each time', () => {
      const result1 = randomTBS().generate();
      const result2 = generateRandomTBS();
      expect(result1 === result2).toBe(false);
    });
  });

  describe('retriveTimestamp', () => {
    it('should retrieve the timestamp from a string generated by generateRandomTBS', () => {
      const timestamp = Date.now().valueOf();
      const string = generateRandomTBS();
      const result = timestampFromRandomTBS(string);
      expect(timestamp <= result).toBe(true);
    });
  });
});