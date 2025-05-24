import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const dbURI: any = "mongodb+srv://tarunsharma11091999:Tarun@mentordb.3hfiqy3.mongodb.net/?retryWrites=true&w=majority&appName=mentordb";



(async () => {
  try {
    await mongoose.connect(dbURI
      , {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );

    const db = mongoose.connection.db;
    console.log(dbURI); // Log the URI for debugging (avoid exposing credentials in production)
    logger.info('Database Connection Successful');
  } catch (err: any) {
    logger.error('Database connection failed:', err.message);
    process.exit(1); // Exit process on connection failure
  }
})();
