//
//
//Resolves reference to the asset.products data type
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Import schema.
import * as schema from "../../../schema/v/code/schema.js";
//
//Resolve the iquestionnaire
import * as quest from '../../../schema/v/code/questionnaire.js';
//
//import main from tracker
import main from './main.js'; 
//
export type Ipiq = {piq: string};
//
//Completing level 2 registration
export class piq extends outlook.baby<quest.Iquestionnaire>{
    //
    constructor(public app: main){
        super(app, "definers.html" )
    }
    //
   async check():Promise<boolean>{
        //
        //1. Collect and check all the data entered by the user.
        //
        return true;
    }
    //
    //
    async get_result(): .Iquestionnaire{
        //
        //
        const start_date = document.querySelector("{name = start_date}")
        //
        const result: .Iquestionnare = []
        //
        await result.push([
            "dbname",
            "ename",
            "cname",
            ""
        ]); 
    }
}