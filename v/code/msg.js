//
//Resolves references to the asset.products data type.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//use popup to create a new message
export class new_msg extends outlook.baby {
    app;
    //
    constructor(app) {
        super(app, "new_msg.html");
        this.app = app;
    }
    //
    //In future, check if a file json containing iquestionare is selected
    //
    async check() {
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
    async get_result() {
        //
        return true;
    }
    //
    async show_panels() {
        //
    }
}
