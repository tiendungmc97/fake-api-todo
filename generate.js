const { number } = require('./helpers/random');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const { randomInt } = require('crypto');

const users = [
  {
    id: '438010',
    inforUserID: '823984',
    username: 'admin',
    password: '123456',
  },
  {
    id: '438013',
    inforUserID: '823985',
    username: 'user',
    password: '123456',
  },
];

const inforUsers = [
  {
    id: '823984',
    firstName: 'Nguyen',
    lastName: 'Van X',
    phone: '0129324312',
    address: 'Ha Noi',
    email: 'email@gmail.com',
    ctime: 1649745122535,
    mtime: 1649745122535,
  },
  {
    id: '823985',
    firstName: 'Nguyen',
    lastName: 'Tien Teo',
    phone: '0129324312',
    address: 'jhakdhfkd dsfdf',
    email: 'email@gmail.com',
    ctime: 1649745122535,
    mtime: 1649745122535,
  },
];

// const randomInforUsers = (n) => {
//   if (n <= 0) return [];
//   const inforUsers = [];
//   Array.from(new Array(n)).forEach(() => {
//     const user = {
//       id: number(6),
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       phone: faker.phone.phoneNumber(),
//       address: faker.address.streetAddress(),
//       email: faker.name.email(),
//       ctime: time.now(),
//       mtime: time.now(),
//     };
//     inforUsers.push(user);
//   });
//   return inforUsers;
// };
const status = ['new', 'depending', 'complete'];
const randomTasks = (n) => {
  if (n <= 0) return [];
  const tasks = [];
  Array.from(new Array(n)).forEach(() => {
    const task = {
      id: number(6),
      name: faker.lorem.words(8),
      status: status[randomInt(3)],
      ctime: Date.now(),
      mtime: Date.now(),
    };
    tasks.push(task);
  });
  return tasks;
};

const randomTodos = (users, n) => {
  if (n <= 0) return;
  const todos = [];
  for (const user of users) {
    Array.from(new Array(n)).forEach(() => {
      const todo = {
        id: number(6),
        userId: user.id,
        task: faker.lorem.words(),
        comment: faker.lorem.text(),
        timeTo: Date.now(),
        timeFrom: Date.now() + 3234234,
        ctime: Date.now(),
        mtime: Date.now(),
      };
      todos.push(todo);
    });
  }
  return todos;
};

/// IIFE - Immediately invoked function expressions
(() => {
  // random data

  // const inforUsers = randomInforUsers(3);
  const todos = randomTodos(users, 20);
  const tasks = randomTasks(5);
  // prepare data
  const db = {
    todos,
    users,
    inforUsers,
    tasks,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate data successfully');
  });
})();
