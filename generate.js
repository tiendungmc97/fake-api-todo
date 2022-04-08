 const { number } = require('./helpers/random');
const { faker } = require('@faker-js/faker');
const fs = require('fs');

const randomProfile = (n) => {
  if (n <= 0) return [];
  const profileList = [];
  Array.from(new Array(n)).forEach(() => {
    const profile = {
      id: number(6),
      name: faker.name.findName(),
      gender: faker.name.gender(),
      job: faker.name.jobDescriptor(),
    };
    profileList.push(profile);
  });
  return profileList;
};
const randomTaskList = (profileList, n) => {
  if (n <= 0) return;
  const taskList = [];
  for (const profile of profileList) {
    Array.from(new Array(n)).forEach(() => {
      const task = {
        id: number(6),
        profileId: profile.id,
        title: faker.animal.bird(),
        ctime: Date.now(),
        mtime: Date.now(),
      };
      taskList.push(task);
    });
  }
  return taskList;
};

/// IIFE - Immediately invoked function expressions
(() => {
  // random data
  const profile = randomProfile(5);
  const taskList = randomTaskList(profile, 20);

  // prepare data
  const db = {
    posts: taskList,
    comments: [],
    profile: profile,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate data successfully');
  });
})();
