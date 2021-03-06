//
//Import app from the outlook library.
import { popup } from '../../../outlook/v/code/outlook.js';
//
import * as outlook from '../../../outlook/v/code/outlook.js';
import * as app from "../../../outlook/v/code/app.js";
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
//Import schema.
import * as schema from '../../../schema/v/code/schema.js';
//
import * as piq from "./piq.js";
//Import the test msg class.
import * as msg from "./msg.js";
//
import * as svg from "./svg.js";
import * as mod from '../../../outlook/v/code/module.js';
//System for daily management of organization activities.
export default class main extends app.app {
    //
    writer;
    messenger;
    accountant;
    scheduler;
    //
    //Initialize the main application.
    constructor(config) {
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
    get_products_specific() {
        return [
            {
                title: "Actions",
                id: 'actions',
                solutions: [
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
                    {
                        title: "Create message",
                        id: "create_msg",
                        listener: ["event", () => { this.new_msg(); }]
                    },
                    {
                        title: "Show minutes",
                        id: "minutes",
                        listener: ["event", () => this.minutes()]
                    }
                ]
            },
            {
                title: "Tea Services",
                id: 'tea_services',
                solutions: [
                    //
                    //Registering tea delivery 
                    {
                        title: "Tea Delivery",
                        id: "tea_delivery",
                        listener: ["event", () => this.tea_delivery()]
                    },
                    //
                    //Tea payments
                    {
                        title: "Pay Tea",
                        id: "pay_tea",
                        listener: ["event", () => this.pay_tea()]
                    }
                ]
            },
            {
                title: "Assignments",
                id: 'assignments',
                solutions: [
                    //
                    //Allow users to input assignments and save to the database 
                    //from GUI.
                    {
                        title: "Input Assignments",
                        id: "input_assignments",
                        listener: ["event", () => this.input_assignments()]
                    },
                    //View due assignments 
                    {
                        title: "View due assignments",
                        id: "view_due_assignments",
                        listener: ["event", () => this.view_due_assignments()]
                    }
                ]
            },
            {
                title: "Event planner",
                id: 'event_planner',
                solutions: [
                    //
                    //Add a service for creating new events.
                    {
                        title: "Create an event",
                        id: "create_event",
                        listener: ["event", () => this.create_event()]
                    }
                ]
            },
            {
                title: "Registration",
                id: 'registration',
                solutions: [
                    {
                        title: "Register (LV1)",
                        id: "complete_lv1_registration",
                        listener: ["event", () => this.complete_lv1_registration()]
                    },
                    //
                    //add intern registration to services.
                    {
                        title: "Register intern(LV2)",
                        id: "piq",
                        listener: ["event", () => this.register_intern()]
                    }
                ]
            },
            {
                title: "Website",
                id: "add_definer",
                solutions: [
                    //
                    {
                        title: "View website",
                        id: "website",
                        listener: ["event", () => this.website()]
                    },
                    //populate definers from the database
                    {
                        title: "New Definer",
                        id: "definer",
                        listener: ["event", () => this.definer()]
                    }
                ]
            },
            {
                title: "SVG Work",
                id: "svg_work",
                solutions: [
                    {
                        title: "SVG",
                        id: "svg",
                        listener: ["event", async () => this.svg()]
                    }
                ]
            }
        ];
    }
    async complete_lv1_registration() {
        //
        const Regist = new complete_lv1_registration(this);
        //
        await Regist.administer();
        //
        return true;
    }
    //
    //Show minutes.
    minutes() {
        //
        alert('Method not implemented.');
    }
    //
    //
    async svg() {
        //
        //Create an instance of the  class
        const Svg = new svg.svg(this);
        //
        const result = await Svg.administer();
        //
        if (result === undefined)
            return;
        //
    }
    //
    //
    async website() {
        //
        //create an instance of the class 
        const Website = new website(this);
        //
        const result = await Website.administer();
        //
        if (result === undefined)
            return;
    }
    //
    //List all assignments that are due and have not been reported.
    //Ordered by Date. 
    view_due_assignments() {
        //
        //1.Create a SQL to get data from the database.
        const sql = `select 
                          todo.id,
                          todo.description,
                          developer.email,
                          datediff(now(),
                          todo.start_date) as days_due
                     from
                          todo
                          inner join developer on developer.developer =
                          todo.developer
                     where
                           datediff(now(),
                           todo.start_date) >= 14`;
        //
        //2. Create a new SQL form using the sql.
        //
        //3. Administer the form.
    }
    //
    //Tea delivery
    async tea_delivery() {
        //
        //Create an instance of the tea_delivery class
        const delivery = new tea_delivery(this);
        //
        //Open the popup and close when the user is done.
        await delivery.administer();
        //
        //
        return true;
    }
    //
    //Tea payment
    async pay_tea() {
        //
        //Create an instance of the tea payment class.
        const payment = new pay_tea();
        //
        // Open the popup and close when the user is done.
        await payment.administer();
        //
        //
        return true;
    }
    //
    //Allow users to input assignments from a UI
    async input_assignments() {
        //
        //Create an instance of input assignments.
        const input = new input_assignments();
        // 
        //Call crud page and close when done.
        await input.administer();
    }
    //Create event and display on the events panel
    create_event() {
        alert('service under development');
    }
    //
    //An event listener for registering a new user.
    async register_intern() {
        //
        //create an instance
        const Piq = new piq.register_intern(this);
        //
        //check whether the result is true or false(if we have successfully 
        //registered an intern)
        //Cast to define true or undefined.
        const result /*: true | undefined */ = await Piq.administer();
        //
        //continue only if a user was successfully registered.
        if (result === undefined)
            return;
        //
        //update the homepage with the new intern(s).
        return true;
    }
    //An event listener for creating a new message.
    async new_msg() {
        //
        //create a popup that facilitates sending a new message
        const Msg = new msg.new_msg(this);
        //
        //collect all the data from the user
        const result = await Msg.administer();
        //
        //check the validity of the data
        if (result === undefined)
            return;
        //
        //The message was succesfully sent so update the page.
        //??
    }
    //
    async definer() {
        //
        //
        const select = this.get_element("definer");
        //
        //List of definers
        const definer = await server.exec("database", ["mutall_tracker"], "get_sql_data", ["select id from definer"]);
        //
        //Formulate the option from the definers list.
        const options = definer.map((definer) => `<option value= '${definer.id}'>${definer.id}</option>`);
        //
        //Convert option to text
        const options_str = options.join("\n");
        //
        //Attach the options to the select element.
        select.innerHTML = options_str;
    }
}
class definer extends outlook.baby {
    //
    //
    constructor(app) {
        //
        super(app, 'definers.html');
    }
    //In future, check if a file json file containing Iquestionnaire is selected.
    //For now, do nothing
    async check() { return true; }
    //
    //
    async get_result() {
        //
        //Get the definer id
        const id = this.get_element('id');
        //
        //ensure you have an input element
        if (!(id instanceof HTMLInputElement)) {
            //
            throw new schema.mutall_error(`input for element "identifier" not found`);
        }
        //
        //Get the definer caption
        const caption = this.get_element('caption');
        //
        //ensure you have an input element.
        if (!(caption instanceof HTMLInputElement)) {
            //
            throw new schema.mutall_error(`Input for element "caption" not found`);
        }
        //
        //Get the organisation
        const organization = this.get_element('organization');
        //
        //ensure the is an input element
        if (!(organization instanceof HTMLInputElement)) {
            //
            throw new schema.mutall_error(`Input for element"organization" not found`);
        }
        //
        //Get the sequence
        const seq = this.get_element('seq');
        //
        //Ensure there is an input element
        if (!(seq instanceof HTMLInputElement)) {
            //
            throw new schema.mutall_error(`Input for element "sequence" not found`);
        }
        //
        //compile the message 
        const idefi = {
            def: id.value,
            caption: caption.value,
            organization: organization.value,
            seq: seq.valueAsNumber
        };
        //
        return idefi;
    }
}
class tea_delivery extends outlook.baby {
    //
    constructor(mother) {
        super(mother, 'tea_delivery.html');
    }
    get_business_id() {
        throw new schema.mutall_error('Method not implemented.');
    }
    get_je() {
        throw new schema.mutall_error('Method not implemented.');
    }
    get_debit() {
        throw new schema.mutall_error('Method not implemented.');
    }
    get_credit() {
        throw new schema.mutall_error('Method not implemented.');
    }
    //
    //check if a file json file containing Iquestionnaire is selected.
    //For now, do nothing
    async check() {
        //
        const post = await this.mother.accountant.post(this);
        //
        return true;
    }
    //
    //Collect data to show whether we should update the home page or not.
    async get_result() {
        //
        return true;
    }
    //
    //Add an event listener to the ok button.
    async show_panels() {
        //
        //Get the ok button
        const save = this.get_element("go");
    }
}
//
//Tea payment 
class pay_tea extends popup {
    //
    constructor() {
        super('pay_tea.html');
    }
    //
    //Collect data to show show if we should update the homepage or not.
    async check() { return true; }
    ;
    //
    //Collect data to show whether we should update the home page or not.
    async get_result() { }
    //
    //Add an event listener to the ok button.
    async show_panels() {
        //
        //Get the ok button
        const save = this.get_element("go");
        //
        //Add an event listener to the ok button.
        save.onclick = async () => this.pay_tea();
    }
    pay_tea() {
        //
        alert('Success');
    }
}
//
//Assignments input. 
class input_assignments extends popup {
    //
    constructor() {
        super('');
    }
    //
    //
    async check() { return true; }
    ;
    //
    //Check if a file json containing Iquestionare is selected.
    async get_result() { }
    //
    //add an event listener.
    async show_panels() {
        //
        //Get the ok button
        const save = this.get_element("go");
        //
        //
        save.onclick = async () => this.input_assignments();
    }
    input_assignments() {
        alert('Success');
    }
}
//
class whatsapp extends mod.messenger {
    app;
    //
    //Construct a whatsapp class.
    constructor(app) {
        //
        super();
        this.app = app;
    }
    //
    //check the entered data and if correct return true else return false.
    //And prevents one from leaving the page.
    async check() {
        //
        //1. Collect and check all the data entered by the user.
        //
        //1.1 collect all the simple labels into an array.
        //
        //1.2 collect all the tables
        //
        //2. Write the data to the database. 
        // send a message to the user.
        const send = await this.app.messenger.send(this);
        //
        return true;
    }
    //Implement abstract method
    async get_result() {
        //
    }
}
//
//
class complete_lv1_registration extends popup {
    //
    //construct the reg class
    constructor() {
        super("lv1_reg.html");
    }
    async check() {
        // const save = await this.mother.writer.save(this);
        //
        return true;
    }
    async get_result() {
    }
    //add an event listener.
    async show_panels() {
        //
        //1. Populate the roles fieldset.
        //Hint. Check out how the current roles are being filled in from the database.
        this.fill_user_roles();
        //
        //2. Populate the business selector with businesses.
        //Hint. Use the selector query to populate.
        this.fill_selector("mutall_users", "user", "organization");
    }
}
//
class website extends outlook.baby {
    //
    //Construct class website.
    constructor(app) {
        //
        super(app, "web.html");
    }
    //
    //check the entered data and if correct return true else return false.
    //And prevents one from leaving the page.
    async check() {
        //
        return true;
    }
    //
    //Implement abstract method
    async get_result() {
        return true;
    }
}
