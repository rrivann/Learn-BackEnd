/**
 * TODO:
 * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
 * menggunakan teknik readable stream dan writable stream.
 */

const fs = require('fs');

const readableStream = fs.createReadStream('input.txt', {
  highWaterMark: 15,
});
const writableStream = fs.createWriteStream('output.txt');

readableStream.on('readable', () => {
  try {
    writableStream.write(`${readableStream.read()}\n`);
  } catch (error) {
    // catch the error when the chunk cannot be read.
  }
});

readableStream.on('end', () => {
  writableStream.end();
  console.log('Done');
});
