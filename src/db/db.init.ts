import { connect } from 'mongoose';
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

// URI for mongo connection
const mongoConnectionURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

/**
 * @function connectToDatabase
 * @description This function connects to MongoDB
 * @returns Mongo connection
 */
export async function connectToDatabase() {
    return connect(mongoConnectionURI);
}