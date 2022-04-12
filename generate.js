const { number } = require('./helpers/random');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const time = new Date();

const users = [
  {
    id: '438010',
    inforUserID: "823984",
    username: 'admin',
    password: '123456',
  },
  {
    id: '438013',
    inforUserID: "823985",
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
        timeFrom: Date.now()+3234234,
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

  // prepare data
  const db = {
    todos: todos,
    users: users,
    inforUsers: inforUsers,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate data successfully');
  });
})();
