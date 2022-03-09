import mongoose from 'mongoose';

export default function jestSetup() {
  afterAll(() => {
    mongoose.connection.close();
  });

  beforeAll(() => {
    mongoose.connect(`mongodb://localhost:27017/testDb`);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
  });
}
