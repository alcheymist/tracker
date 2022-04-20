//
//Resolves references to the asset.products data type.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//use popup to create a new message
export class msg extends outlook.baby {
    //
    constructor(base) {
        super(base, "new_msg.html");
    }
    //
    //In future, check if a file json containing iquestionare is selected
    //
    check() {
        //
        //Get the message text.
        const text = this.get_element('msg');
        //
        if (text.value === "") {
            //
            this.win.alert('Please enter a message');
            //
            return false;
        }
        //
        //compile message.
        this.result = { msg: text.value };
        //
        return true;
    }
    //
    //Collect the message and media of communication specified by the user.
    async get_result() {
        //
        return this.result;
    }
    //
    async show_panels() {
        const myalert = this.get_element('alert');
        myalert.onclick = () => this.win.alert('Alert');
    }
}
