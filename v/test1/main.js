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
                id: "definer",
                solutions: [
                    //
                    //populate definers from the database
                    {
                        title: "New Definer",
                        id: "definer",
                        listener: ["event", () => this.definer()]
                    },
                    {
                        title: "SVG",
                        id: "svg",
                        listener: ["event", async () => this.svg()]
                    }
                ]
            }
        ];
    }
    async definer() {
        //
        //
        const select = this.get_element("definer");
        //
        //List of definers
        const definer = await server.exec(
        //selects data from a database in regard to the pk.
        //               "selector",
        //               ["definer", app.app.current.dbname],
        //               "execute",
        //               []
        "database", ["mutall_tracker"], "get_sql_data", ["select id from definer"]);
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
    async svg() {
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
class svg extends outlook.baby {
    //
    constructor() {
        super('');
    }
    //In future, check if a file json file containing Iquestionnaire is selected.
    //For now, do nothing
    check() { return true; }
    //
    //
    async get_result() {
        //
    }
}
