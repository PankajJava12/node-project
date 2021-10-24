import { connect } from 'mongoose';
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

// Connect to MongoDB
const mongoConnectionURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export async function connectToDatabase() {
    return connect(mongoConnectionURI);
}