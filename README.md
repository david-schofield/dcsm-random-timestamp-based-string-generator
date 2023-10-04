# Random Timestamp-Based String Generator

A library for generating uniqe random alphabetical strings based on the current timestamp. It also provides a method for retrieving the timestamp from a generated string.

## Why use this module?

This module can be used to generate unique identifiers that are based on the current timestamp. These identifiers can be used to track events, generate unique filenames, or create unique IDs for database records that are sortable in alphabetical order based on the time they were created.

The generated strings only contain the characters `A-Z` and `a-z`, and can be sorted chronologically based on the alphabetical order of the strings. Strings generated at the same millisecond are sortable based on the order in which they were generated.

## Features

- Generates a random string based on the current timestamp
- The strings are alphabetical and only contain the characters `A-Z` and `a-z`
- The timestamp when the string was generated is retrievable from generated strings
- The generated strings are unique and can be sorted in alphabetical order.
- Strings generated at the same millisecond are sortable based on the order in which they were generated. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [`RandomTBS`](#randomtbs)
- [Utility Functions](#utility-functions)
  - [`randomTBS`](#randomtbs-1)
  - [`timestampFromRandomTBS`](#timestampfromrandomtbs)
  - [`generateRandomTBS`](#generaterandomtbs)
- [API](#api)
- [License](#license)

## Installation

To install this module, run the following command:

```bash
npm install dcsm-random-timestamp-based-string-generator
```

## Usage

### `RandomTBS`

This class provides methods to generate a random string based on the current timestamp and a method to retrieve the timestamp from a generated string.


```javascript
import { RandomTBS } from 'dcsm-random-timestamp-based-string-generator';

const generator = new RandomTBS();
const randomString = generator.generate();// Returns: "GCXlRnAzajcXUddQxJxtxnFGLJm"
const timestamp = generator.retriveTimestamp(randomString);// Returns: 1696339642840
```

To ensure that the generated strings are unique, the class uses a counter that is incremented every time a new string is generated at the same time (millisecond) the previous string was generated. The counter is reset to zero when the timestamp changes. This ensures that the generated strings are unique and sortable in alphabetical order based on the time they were generated.

NOTE: Use the same instance of `RandomTBS` to generate strings. If you create a new instance of `RandomTBS` every time you generate a string, the counter will be reset to zero every time. This will result in strings that are not sortable in alphabetical order based on the time they were generated if you generate multiple strings at the same time (millisecond).


## Utility Functions

These functions are provided for convenience. 

### `randomTBS`

This function returns a new instance of `RandomTBS`.

```javascript
import { randomTBS } from 'dcsm-random-timestamp-based-string-generator';

const generator = randomTBS();
const randomString = generator.generate();// Returns: "GCXlRnAzajcXUddQxJxtxnFGLJm"
const timestamp = generator.retriveTimestamp(randomString);// Returns: 1696339642840
```

### `timestampFromRandomTBS`

This function retrieves the timestamp from a generated random timestamp-based string.

```javascript
import { timestampFromRandomTBS } from 'dcsm-random-timestamp-based-string-generator';

const randomString = "GCXlRnAzajcXUddQxJxtxnFGLJm";
const timestamp = timestampFromRandomTBS(randomString);// Returns: 1696339642840
```

### `generateRandomTBS`

This function creates a new instance of `RandomTBS` and generates a random timestamp-based string. 

**NOTE!** <br>
It is recommended to use the `RandomTBS` class instead and generate strings using the `generate()` method on the same instance of `RandomTBS`.


```javascript
import generateRandomTBS from 'dcsm-random-timestamp-based-string-generator';

const randomString = generateRandomTBS();// Returns: "GCXlRnAzajcXUddQxJxtxnFGLJm"
```

## API

### `RandomTBS`

#### `generate(): string`

Generates a random string based on the current timestamp.

#### `retriveTimestamp(stringGeneratedByRandomTimestampBasedString: string): number`

Retrieves the timestamp from a generated random timestamp-based string.

### `randomTBS(): RandomTBS`

Returns a new instance of `RandomTBS`.

### `timestampFromRandomTBS(stringGeneratedByRandomTimestampBasedString: string): number`

Retrieves the timestamp from a generated random timestamp-based string. 

### `generateRandomTBS(): string`

Generates a random timestamp-based string.

## License

This module is licensed under the Mozilla Public License 2.0. You can find the full license text in the [LICENSE](./LICENSE) file. 

