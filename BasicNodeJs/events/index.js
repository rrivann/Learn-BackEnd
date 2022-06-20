// TODO 1
const {EventEmitter} = require('events');

const birthdayEventListener = (name) => {
  console.log(`Happy birthday ${name}!`);
};

// TODO 2
const myEventEmitter = new EventEmitter();

// TODO 3
const onBirthdayEventListener = ({name}) => {
  birthdayEventListener(name);
};

// TODO 4
myEventEmitter.on('birthday', onBirthdayEventListener);
myEventEmitter.emit('birthday', {name: 'Rivan'});
