//
//Import app from the outlook library.
import {popup} from '../../../outlook/v/code/outlook.js';
//
import * as outlook from '../../../outlook/v/code/outlook.js';

import * as app from "../../../outlook/v/code/app.js";
//
import {input, io} from '../../../outlook/v/code/io.js';
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
//Import schema.
import * as schema from '../../../schema/v/code/schema.js';
//
//Resolve the iquestionnaire
import * as quest from '../../../schema/v/code/questionnaire.js'; 
//
import * as mod from '../../../outlook/v/code/module.js';
//
//
//The structure of a definer.
export type Idef = {
    def: string;
    caption: string;
    organization: string;
    seq: number;
}
//System for daily management of organization activities.
export default class main extends app.app {
    //
    public writer: mod.writer;
    public messenger: mod.messenger;
    public accountant: mod.accountant;
    public scheduler: mod.scheduler;
    //
    //Initialize the main application.
    constructor(config: app.Iconfig) {
        super(config);
        //
        //initialize the above 
        this.writer = new mod.writer();
        this.messenger = new mod.messenger();
        this.accountant = new mod.accountant();
        this.scheduler = new mod.scheduler();
    }
    //
    //
    //Retuns all the inbuilt products that are specific to
    //thus application
    get_products_specific(): Array<outlook.assets.uproduct> {
        return [
            {
                title: "Actions",
                id: 'actions',
                solutions: [
                    //
                    //View due assignments 
                    {
                        title: "Manage Events",
                        id: "events",
                        listener: ["crud", 'event', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Manage Messages",
                        id: "messages",
                        listener: ["crud", 'msg', ['review'], '+', "mutall_users"]
                    },               
                    
                ]
            },
            {
                title: "Website",
                id:"definers",
                solutions: [
                    //
                    //populate definers from the database
                    {
                        title: "New Definer",
                        id: "definer",
                        listener: ["event", () => this.definer()]
                    },
                    {
                        title: "Water reading",
                        id: "water",
                        listener: ["event", () => this.water()]
                    },
                    {
                        title: "Enter Payments",
                        id: "payment",
                        listener: ["event", () => this.payment()]
                    }
                ]
            }];
        }
    //
    async payment(): Promise<void> {
        //
        //create a new instance.
        const Payment = new payment(this);
        //
        const result = await Payment.administer();
        //collect all the data
        if (result === undefined ) return;

    }
    //
    async water(): Promise<void> {
        //
        const Water = new water(this);
        //
        const result = await Water.administer();
        //collect all the data
        if(result=== undefined)return;
    }
    //
    //
     async definer(): Promise<void> {
         //create a new instance.
         const Definer = new definer(this);
         //
         const result = await Definer.administer();
         //collect all the data
         if(result=== undefined)return;
    }
}
//
class payment extends outlook.baby<true>{
    //
    declare public mother:main;
    //
    constructor(mother: main){
        super(mother, "payments.html")
    }
    //In future, check if a file json containing iquestionare is selected
    //
    async check(): Promise<boolean> {
        //
        //1. Collect and check the data that the user has entered.
        //
        //2. Save the data to the database.
        const save = await this.mother.accountant.post(this);
        //
        
        return true;
    }
    async get_result(): Promise<true> {
        //
        return true;
    }
    async show_panels(): Promise<void> {
        //

    }
}
//
class water extends outlook.baby<true>{
    //
    declare public mother:main;
    //
    constructor(mother: main) {
        //
       //
      super(mother,'water.html')  
    }
    
    //In future, check if a file json containing iquestionare is selected
    //
    async check(): Promise<boolean> {
        //
        //1. Collect and check the data that the user has entered.
        //
        //2. Save the data to the database.
        const save = await this.mother.writer.save(this);
        //
        return true;
    }
    async get_result(): Promise<true> {
        //
        return true;
    }
    async show_panels(): Promise<void> {
        //
        //1. Set the date to current.
        //
        //2. Fill the selector with the water meters.
        //
        //3. Add an event listener to the selector so that the last readings can be shown
        //automatically on the form.     
        //
        //4. Add a listener to the data entry button so that it can compare the last 
        // and current readings turning the consuption to green or red.
    }
} 
//

//
class definer extends outlook.baby<Idef>{
    //
    //
    constructor(public app: main) {
        //
      super(app,'definers.html')  
    }
    
    //In future, check if a file json containing iquestionare is selected
    //
    async check(): Promise<boolean> {
        //
        //1. Collect and check the data that the user has entered.
        //
        //2. Save the data to the database.
        const save = await this.app.writer.save(this);
        //
        return true;
    }
    
    //
    async get_result(): Promise<Idef> {
        //
        //
         //Get the definer id
         const id = this.get_element('id');
         //
         //ensure you have an input element
         if (!(id instanceof HTMLInputElement)){
             //
             throw new schema.mutall_error(`input for element "identifier" not found`);
         }
         //
         //Get the definer caption
         const caption = this.get_element('caption');
         //
         //ensure you have an input element.
         if(!(caption instanceof HTMLInputElement)){
             //
             throw new schema.mutall_error(`Input for element "caption" not found`);
         }
         //
         //Get the organisation
         const organization = this.get_element('organization');
         //
         //ensure the is an input element
         if(!(organization instanceof HTMLInputElement)){
             //
             throw new schema.mutall_error(`Input for element"organization" not found`);
         }
         //
         //Get the sequence
         const seq = this.get_element('seq');
         //
         //Ensure there is an input element
         if(!(seq instanceof HTMLInputElement)){
             //
             throw new schema.mutall_error(`Input for element "sequence" not found`);
         }
         //
         //compile the message 
         const idefi: Idef = {
             def: id.value,
             caption: caption.value,
             organization: organization.value,
             seq: seq.valueAsNumber
         };
        //
        return idefi;
    }
    async show_panels(): Promise<void> {
        //
        
    }
}
