import { Schema, model } from 'mongoose';

// 1. Create an interface representing a race document in MongoDB.
interface Race {
    event: string;
    horse: {
        id: number,
        name: string
    };
    time: string;
}

// 2. Create a Schema corresponding to the race document interface.
const schema = new Schema<Race>({
    event: { type: String, required: true },
    horse: { 
        id: { type: Number },
        name: { type: String }
    },
    time: String
});

export default model<Race>('Race', schema);