//
//Resolves references to the asset.products data type.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//use popup to create a new message
export class svg extends outlook.baby {
    //
    constructor(base) {
        super(base, "svg.html");
    }
    //
    //In future, check if a file json containing iquestionare is selected
    //
    async check() {
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
        //
        //add the click event listener to the svg.
        const svg = this.get_element("svg_object");
        //
        svg.onclick = (evt) => this.move(evt);
        //
        // const content = this.get_element("svg_object");
        // //
        // //create the svg element
        // const svg = this.create_element(
        //     content,
        //     "svg",
        //     {}
        // );
    }
    //1. Move circle one to the where the current event was invoked from.
    move(evt) {
        //
        function read() {
            //
            //
        }
    }
}
