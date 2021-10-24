import raceModel from "../model/race.model";
import * as dbHandler from './db';

beforeAll(async () => {   
    await dbHandler.connect()
});

afterEach(async () => {
    await dbHandler.clearDatabase()
});

afterAll(async () => {
    await dbHandler.closeDatabase()
});

describe('Insert', () => {
    it('should insert a race doc into races collection', async () => { 
        const mockData = {
            event: 'start',
            horse: {
                id: 9,
                name: "Frazzle"
            },
            time: 0,
        };
        // expect that two assertions will be made
        expect.assertions(2)
        // create new race model instance
        const race = new raceModel(mockData);
        // save race doc into races collection
        await race.save();

        // find inserted race by horse id
        const insertedRace:any = await raceModel.findOne({ "horse.id": mockData.horse.id });

        // assertion 1
        expect(insertedRace.event).toEqual(mockData.event);

        // assertions 2
        expect(insertedRace.horse.id).toEqual(mockData.horse.id);
    });
});