import {
  TypeOf,
  typeOfSilent
} from 'dcsm-type-helper';

/**
 * Checks if a given timestamp is valid or not.
 * @param {number} timeSinceCreationOfModule - The time elapsed since the creation of the module.
 * @param {number} valueOfDateWhenThisModuleWasCreated - The value of Date when this module was created.
 * @returns {boolean} - Returns true if the timestamp is valid, false otherwise.
 */
function isValidTimestamp(timeSinceCreationOfModule, valueOfDateWhenThisModuleWasCreated) {
  const typeOf = new TypeOf(timeSinceCreationOfModule, valueOfDateWhenThisModuleWasCreated);
  typeOf.setOptions = { disableThrowErrors: true };
  if (typeOf.isNumberPositive === true && typeOf.isNumberMaxSafeInteger === true) {
    try {
      let timeNumber = timeSinceCreationOfModule + valueOfDateWhenThisModuleWasCreated;
      new Date(timeNumber).valueOf();
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

/**
 * A class for generating random strings based on timestamps and retrieving the timestamps from the generated strings.
 */
class RandomTimestampBasedStringGenerator {
  #previous = {
    timestamp: 0,
    randomAlphabeticalString: ''
  };

  /**
   * Generates a random integer between 0 and 50 (inclusive).
   * @private
   * @returns {number} A random integer between 0 and 50 (inclusive).
   */
  #generateRandomInt() {
    const min = 0;
    const max = 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Generates a random alphabetical string of length 20.
   * @private
   * @returns {string} A random alphabetical string of length 20.
   */
  #generateRandomAlphabeticalString() {
    let output = '';
    while (output.length < 20) {
      output += this.#convertNumberToBase51(this.#generateRandomInt());
    }
    return output;
  };

  /**
   * Generates a random timestamp-based string.
   * @private
   * @returns {string} A random timestamp-based string.
   */
  #generateRandomTimestampBasedString() {
    const valueOfDateWhenThisModuleWasCreated = 1694604738572;
    const newTimestamp = new Date().valueOf() - valueOfDateWhenThisModuleWasCreated;
    let timestamp;
    let randomAlphabeticalString;

    if (newTimestamp === this.#previous.timestamp) {
    //if (newTimestamp <= (this.#previous.timestamp + 20)) {
      timestamp = this.#previous.timestamp;
      randomAlphabeticalString = this.#incrementBase51value(this.#previous.randomAlphabeticalString);
      this.#previous.randomAlphabeticalString = randomAlphabeticalString;
    } else {
      timestamp = newTimestamp;
      this.#previous.timestamp = newTimestamp;
      randomAlphabeticalString = this.#generateRandomAlphabeticalString();
      this.#previous.randomAlphabeticalString = randomAlphabeticalString;
    }

    const Base51EncodedTimestamp = this.#convertNumberToBase51(timestamp);
    const generatedString = `${Base51EncodedTimestamp}A${randomAlphabeticalString}`;

    return generatedString;
  };

  /**
   * Increments a Base51-encoded string by 1.
   * @private
   * @param {string} string - The Base51-encoded string to increment.
   * @returns {string} The incremented Base51-encoded string.
   */
  #incrementBase51value(string) {
    if (/^[B-Za-z]+$/.test(`${string}`) === false) {
      this.#generateRandomAlphabeticalString();
    }
    const Base51Characters = 'BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const position = [];
    let output = '';
    let carry = true;

    // 50 is the last index of the Base51Characters string
    for (let i = 0; i < string.length; i++) {
      position.push(Base51Characters.indexOf(string[i]));
    }

    for (let i = string.length - 1; i >= 0; i--) {
      if (carry === true) {
        const index = Base51Characters.indexOf(string[i]);
        if (index === 50) {
          output = 'B' + output;
        } else {
          output = Base51Characters[index + 1] + output;
          carry = false;
        }
      } else {
        output = string[i] + output;
      }
    }

    for (let i = position.length - 1; i >= 0; i--) {
      if (position[i] === 50) {
        position[i] = 0;
        if (i === 0) {
          position.unshift(1);
        }
      } else {
        position[i] += 1;
        break;
      }
    }

    position.forEach((value, index) => {
      position[index] = Base51Characters[value];
    });

    return position.join('');
  };

  /**
   * Retrieves the timestamp from a generated random timestamp-based string.
   * @private
   * @param {string} string - The random timestamp-based string.
   * @returns {number} The timestamp extracted from the random timestamp-based string.
   */
  #retriveTimestampFromGeneratedRandomTimestampBasedString(string) {
    const valueOfDateWhenThisModuleWasCreated = 1694604738572;
    const fallback = valueOfDateWhenThisModuleWasCreated; //new Date(valueOfDateWhenThisModuleWasCreated).valueOf();

    if (/^[B-Za-z]+A[B-Za-z]+$/.test(`${string}`) === false) {
      return fallback;
    }

    const timeSinceCreationOfModule = this.#convertBase51AlphabeticalStringToNumber(`${string}`.replace(/A[B-Za-z]+$/, ''));

    if (isValidTimestamp(timeSinceCreationOfModule, valueOfDateWhenThisModuleWasCreated) === true) {
      return timeSinceCreationOfModule + valueOfDateWhenThisModuleWasCreated;
    } 

    return fallback;

  };

  /**
   * Converts a number to a Base51-encoded string.
   * @private
   * @param {number} number - The number to convert.
   * @returns {string} The Base51-encoded string.
   */
  #convertNumberToBase51(number) {
    if (typeOfSilent(number).isNumberPositive !== true && typeOfSilent(number).isNumberMaxSafeInteger !== true) {
      return 'B';
    }
    const Base51Alphabet = 'BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let output = '';
    do {
      const remainder = number % 51;
      output = Base51Alphabet[remainder] + output;
      number = Math.floor(number / 51);
    } while (number > 0);
    return output;
  };

  /**
   * Converts a Base51-encoded string to a number.
   * @private
   * @param {string} string - The Base51-encoded string to convert.
   * @returns {number} The number represented by the Base51-encoded string.
   */
  #convertBase51AlphabeticalStringToNumber(string) {
    const Base51Characters = 'BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let output = 0;

    if (typeOfSilent(string).isEmptyString === (true || undefined)) {
      return output;
    }

    for (let i = 0; i < string.length; i++) {
      output += Base51Characters.indexOf(string[i]) * Math.pow(51, string.length - i - 1);
    }

    if (typeOfSilent(output).isNumberPositive !== true && typeOfSilent(output).isNumberMaxSafeInteger !== true) {
      return 0;
    }

    return output;
  };

  /**
   * Generates a random timestamp-based string.
   * @returns {string} A random timestamp-based string.
   */
  generate() {
    return this.#generateRandomTimestampBasedString();
  }

  /**
   * Retrieves the timestamp from a generated random timestamp-based string.
   * @param {string} stringGeneratedByRandomTimestampBasedString - The random timestamp-based string.
   * @returns {number} The timestamp extracted from the random timestamp-based string.
   */
  retriveTimestamp(stringGeneratedByRandomTimestampBasedString) {
    return this.#retriveTimestampFromGeneratedRandomTimestampBasedString(stringGeneratedByRandomTimestampBasedString);
  }
}

/**
 * Returns a new instance of RandomTimestampBasedStringGenerator.
 * @returns {RandomTimestampBasedStringGenerator} A new instance of RandomTimestampBasedStringGenerator.
 */
function randomTBS() {
  return new RandomTimestampBasedStringGenerator();
}

/**
 * Retrieves the timestamp from a generated random timestamp-based string.
 * @param {string} stringGeneratedByRandomTimestampBasedString - The random timestamp-based string.
 * @returns {number} The timestamp extracted from the random timestamp-based string.
 */
function timestampFromRandomTBS(string = '') {
  return new RandomTimestampBasedStringGenerator().retriveTimestamp(string);
}

/**
 * Generates a random timestamp-based string.
 * @returns {string} A random timestamp-based string.
 */
function generateRandomTBS() {
  return new RandomTimestampBasedStringGenerator().generate();
}

export {
  RandomTimestampBasedStringGenerator as RandomTBS,
  randomTBS,
  timestampFromRandomTBS,
  generateRandomTBS
};
export default generateRandomTBS;