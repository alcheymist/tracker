//
//Resolves references to the asset.products data type.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import schema.
import * as schema from "../../../schema/v/code/schema.js";
//
import main from './main.js';
//
export type Imsg = {msg:string};
//
//use popup to create a new message
export class new_msg 
    extends outlook.baby<true> {
    //
    constructor(public app: main) {
        super(app, "new_msg.html");
    }
    //
    //In future, check if a file json containing iquestionare is selected
    //
   async check(): Promise<boolean> {
        //
        //1. Collect and check the data that the user has entered.
        //
        //2. Save the data to the database.
        const save = await this.app.writer.save(this);
        //
        //3. Send the appropriate message to the user(s).
        const send = await this.app.messenger.send(this);
        //
        //4. Update the journal entry(je) 
        const post = await this.app.accountant.post(this);
        //
        //5. Schedule tasks if available.
        const exec = await this.app.scheduler.exec(this);
        //
        return true;
    }
    //
    //Collect the message and media of communication specified by the user.
    async get_result(): Promise<true> {
        //
        return true;
    }
    //
    async show_panels(): Promise<void> {
        //
        
    }
}