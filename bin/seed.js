const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const User = require('../models/User');
require('dotenv').config();

mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected to: ', process.env.MONGO_URL);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });

const users = Array.from({ length: 10 }, () => ({
  username: faker.internet.userName(),
  name: faker.name.firstName(),
  familyName: faker.name.lastName(),
}));

User.collection
  .drop()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('deleted db');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  })
  .then(() => User.insertMany(users))
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('inserted fake data');
    mongoose.connection.close();
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    mongoose.connection.close();
  });
