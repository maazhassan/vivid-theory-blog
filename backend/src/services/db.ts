import { Sequelize } from 'sequelize';
import blogModel from '../models/blog.model.js';
import dotenv from 'dotenv';

dotenv.config();

const postgres_database = process.env.POSTGRES_DB || 'postgres';
const postgres_user = process.env.POSTGRES_USER || 'postgres';
const postgres_password = process.env.POSTGRES_PASSWORD || 'postgres';

export const sequelize = new Sequelize(postgres_database, postgres_user, postgres_password, {
  host: 'localhost',
  dialect: 'postgres'
});

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

blogModel(sequelize);