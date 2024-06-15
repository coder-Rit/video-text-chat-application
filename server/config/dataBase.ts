import mongoose from 'mongoose';

const connectToDatabase = (): void => {
  mongoose.connect(process.env.DB_URI as string)
    .then(() => {
      console.log('Connected to the database successfully');
    })
    .catch((err) => {
      console.error(`Database connection error: ${err}`);
    });
};

export default connectToDatabase;
 