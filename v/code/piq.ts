//
//
//Resolves reference to the asset.products data type
import * as outlook from '../../../outlook/v/code/outlook.js';
//
import * as schema from '../../../schema/v/code/schema.js';
//
//Resolve the iquestionnaire
import * as quest from '../../../schema/v/code/questionnaire.js';
//
import {questionnaire, message, journal} from '../../../outlook/v/code/module.js'
//
//import main from tracker
import main from './main.js'; 
import { basic_value } from '../../../schema/v/code/library.js';
//
export type Ipiq = {piq: string};
//
// export interface Iregister {
//     true: boolean,
//     undefined: undefined
// }
//
//Completing level 2 registration
export class register_intern 
    extends outlook.baby<true>
    implements  questionnaire,message, journal
        {
    //
    constructor(mother: main){
        super(mother, "register_intern.html" )
    }
    get_business_id(): string {
        //extends error and returns an alert.
        throw new schema.mutall_error('Method not implemented.');
    }
    get_je(): {
        //
        ref_num: string;
        //
        purpose: string;
        //
        date: string;
        //
        amount: number;
    }
    {
        throw new schema.mutall_error('Method not implemented.');
    }
    get_debit(): string {
        throw new schema.mutall_error('Method not implemented.');
    }
    get_credit(): string {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //Implement the method required by the questionnaire interface.
    //It returns all the layouts derived from the registration of an intern.
    get_layout(): Array<quest.layout> {
        //
        //1.Retrieve all label layouts (from the registration form) that are outside a table.
        const inputs: Array<quest.layout> = this.get_label_layouts();
        //
        //2.Retrieve all table based layouts from the registration form.
        const tables: Array<quest.layout> = this.get_table_layouts();
        //
        //Return both the inputs and tables.
        return inputs.concat(tables);
    }
    //
    //Retrieve all table based layouts from the registration form.
    get_table_layouts(): Array<quest.layout>{
        //
        //1. Get all the table elements in the registration form.
        const elements = this.document.querySelectorAll("table");
        //
        //2. Convert the table elements to table layouts.
        const tables =
            //convert the elements to an array 
            Array.from(elements)
            //
            //Map every element to a table
            .map(element =>this.get_table_layout(element));
        //
        //3. Return the result.
        return tables;
    }
    //
    //Convert the given table element into a questionnaire table.
    //The structure of a questionnaire table is generally defined as:-
    // {class_name, args}
    //in particular its defined as:-
    //{class_name:"fuel", args: [tname, cnames, ifuel] }
    //where:-
    // tname is the name of the table, 
    // cnames is an array of column names to be lookedup,
    // ifuel is a double array that represents the table body.
    get_table_layout(element: HTMLTableElement):Array<quest.layout>{
        //
        //A. Define the table that is the source of the data.
        //1.Get the tables class name.
        const class_name = "fuel";
        //
        //2. Get the required arguments
        //
        //2.1 Get the table name.
        //
        //2.2 Get the column names of the table.
        //
        //2.3 Get the body of the table as an array based on the tr and tds of the table.
        //
        //3. Compile and the table layout.
        const table: quest.table = { class_name, args:[tname, cnames, body]}
        //
        //B. State where in the database the columns should be saved.
        //We will have as many labels as there are table columns. 
        //The expression to be associated with each label will be based on the table 
        //lookup class. 
        const destinations: Array<quest.label> = this.get_destinations(element);
        //
        //Return both the source of the data and the destination database.
        return destinations.push(table);
    }
    //
    //check the entered data and if correct return true else return false.
    //And prevents one from leaving the page.
   async check():Promise<boolean>{
        //
        //1. Collect and check all the data entered by the user.
        //
        //1.1 collect all the simple labels into an array.
        //
        //1.2 collect all the tables
        //
        //2. Write the data to the database.
        const save =await this.mother.writer.save(this);
        //
        // Registration has charges whis is equal to 0.
        const post =await this.mother.accountant.post(this);
        //
        // send a message to the user.
        const send = await this.mother.messenger.send(this);
        //
        return true;
    }
    //
    get_layouts(): Array<quest.layout>{
        //1. Collect all the labels associated with the simple inputs
        const inputs : Array<quest.layout> = this.get_simple_inputs();
        //
        //2. Collect all the labels associated with tables in the questionnaire
        const tables : Array<quest.layout> = this.get_table_inputs();
        //
        //3. Combine 1 and 2 into a simple array and return it.
        return [...inputs, ...tables];
    }
    get_simple_inputs(): quest.layout[] {
        throw new schema.mutall_error('Method not implemented.');
    }
    get_table_inputs(): quest.layout[] {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    async get_result(): Promise<true>{
        //
        return true;
    }
}