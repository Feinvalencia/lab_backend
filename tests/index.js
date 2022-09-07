const expect = require('chai').expect;
const request = require('supertest');
const {
  MongoMemoryServer
} = require('mongodb-memory-server');
const mongoose = require("mongoose");
const mongod = new MongoMemoryServer();


/**
 * Connect to the in-memory database.
 */
let connect = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
let closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
let clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

//Up the services. 
process.env.NODE_ENV = "test";
const {app} = require('..');


describe('Test application', function() {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before(async () => await connect());

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => await clearDatabase());

  describe('Test for Authentication', function() {
    it('should register successful', function(done) {

      let user = {
        "name": "name",
        "email": "gym-db@gmail.com",
        "password": "password",
        "role": "USER"
      };
      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should register fail by email validation', function(done) {

      let user = {
        "name": "name",
        "email": "email",
        "password": "password",
        "role": "USER"
      };
      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should register fail by password validation', function(done) {

      let user = {
        "name": "name",
        "email": "gym-db@gmail.com",
        "password": "#&%[{<*",
        "role": "USER"
      };
      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should register fail by role validation', function(done) {

      let user = {
        "name": "name",
        "email": "gym-db@gmail.com",
        "password": "password",
        "role": "SUPERADMIN"
      };
      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(500, done);
    });

    it('should register fail by double register', function(done) {

      let user = {
        "name": "name",
        "email": "gym-db@gmail.com",
        "password": "password",
        "role": "USER"
      };
      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(user).end(function() {
          request(app)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(500, done);
        });
    });
  });
  /**
   * Close the db and server.
   */
  after(async (done) => {
    await closeDatabase();
    process.exit();
  });
});