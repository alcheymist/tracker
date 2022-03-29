//
//Import app from the outlook library.
import { popup } from '../../../outlook/v/code/outlook.js';
import * as outlook from '../../../outlook/v/code/outlook.js';
import * as app from "../../../outlook/v/code/app.js";
//
//Import server
import * as server from '../../../schema/v/code/server.js';
//
//Import schema.
import * as schema from '../../../schema/v/code/schema.js';
//
export default class main extends app.app {
    //
    //Initialize the main application.
    constructor(config) {
        super(config);
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
                    //
                    //View due assignments 
                    {
                        title: "View due assignments",
                        id: "view_due_assignments",
                        listener: ["event", () => this.view_due_assignments()]
                    }
                    //                    {
                    //                        title: "Create message",
                    //                        id: "create_msg",
                    //                        listener: ["event", ()=>{this.new_msg()}]
                    //                    }
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
                    {
                        title: "View Assignments",
                        id: "view_assignments",
                        listener: ["event", () => this.view_assignments()]
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
                    //
                    //add intern registration to services.
                    {
                        title: "Complete level 2",
                        id: "piqs",
                        listener: ["event", () => this.piqs()]
                    }
                ]
            },
            {
                title: "Website",
                id: "definer",
                solutions: [
                    //
                    //populate definers from the database
                    {
                        title: "New Definer",
                        id: "create_definer",
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
                        listener: ["event", () => this.svg()]
                    }
                ]
            }
        ];
    }
    async svg() {
        //
        //Create an instance of the tea_delivery class
        const Svg = new svg();
        //
        //Open the popup and close when the user is done.
        await Svg.administer();
        //
        //
        return true;
    }
    //        async new_msg(): Promise<void> {
    //        //
    //        //create a popup that facilitates sending a new message
    //        const Msg = new msg.msg(this);
    //        //
    //        //collect all the data from the user
    //        const result: msg.Imsg | undefined = await Msg.administer();
    //        //
    //        //check the validity of the data
    //        if (result === undefined) return;
    //    }
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
        const delivery = new tea_delivery();
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
    //
    //view all assignments.
    view_assignments() {
        alert('Service under development');
    }
    //Create event and display on the events panel
    create_event() {
        alert('service under development');
    }
    //
    //
    async piqs() {
        //
        //create an instance
        const piq = new piqs.Ipiq(this);
        //
        //call crud page and close when done
        await piq.administer();
    }
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
class definer extends outlook.popup {
    //
    constructor() {
        super('definers.html');
    }
    //In future, check if a file json file containing Iquestionnaire is selected.
    //For now, do nothing
    check() { return true; }
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
class tea_delivery extends popup {
    //
    constructor() {
        super('tea_delivery.html');
    }
    //
    //check if a file json file containing Iquestionnaire is selected.
    //For now, do nothing
    check() { return true; }
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
        //Add an event listener to the ok element
        save.onclick = async () => this.save_delivery();
    }
    //
    save_delivery() {
        //
        alert('Success');
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
    check() { return true; }
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
    check() { return true; }
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
class svg extends popup {
    //
    constructor() {
        super('svg.html');
    }
    //
    //
    check() { return true; }
    ;
    //
    //Check if a file json containing Iquestionare is selected.
    async get_result() { }
    //
    //add an event listener.
    async show_panels() {
        //
    }
}
