import {
  RandomTBS,
  randomTBS,
  timestampFromRandomTBS,
  generateRandomTBS
} from '../index.js';

import Print from 'dcsm-print';

function timestampToHuman(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(4, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${milliseconds}`;
}

Print('randomTBS', randomTBS());
Print('randomTBS().generate()', randomTBS().generate());
const retrivedTimestamp = timestampFromRandomTBS(generateRandomTBS());
Print('timestampFromRandomTBS', retrivedTimestamp);
Print('generateRandomTBS', generateRandomTBS());
Print('new Date(retrivedTimestamp).toString()', new Date(retrivedTimestamp).toString());

const testIncrement = randomTBS();
const UUIDlist = [];
for (let i = 0; i < 100; i++) {
  UUIDlist.push(testIncrement.generate());
  UUIDlist.push(testIncrement.generate());
  UUIDlist.push(testIncrement.generate());
}

const shuffledUUIDlist = [];
UUIDlist.forEach((value, index, array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  shuffledUUIDlist.push(array[index]);
});


const sortedUUIDlist = UUIDlist.sort();

sortedUUIDlist.forEach((value, index) => {
  console.log(timestampToHuman(timestampFromRandomTBS(value)), timestampFromRandomTBS(value), value, shuffledUUIDlist[index], `sorted and suffled same index: ${value === shuffledUUIDlist[index]}`);
});
