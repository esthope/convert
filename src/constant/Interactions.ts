import {fetchData, createKeyEntries} from 'util/dataHandler';
// alert
import * as CustomMsg from 'constant/Messages';
import {create_error} from 'util/errorHandler';
import {Message} from 'constant/interfaces';
let errorMsg:Message;

let casesData:any[] = [],
	actionsData:any[] = [],
	interactionsData:any[] = [];

let Action:any,
	Case:any,
	Mode:any;

try
{
	casesData = fetchData('cases')
	actionsData = fetchData('actions')

	if (casesData && actionsData)
		interactionsData = [...casesData, ...actionsData]

	Action = createKeyEntries('actions')
	Case = createKeyEntries('cases')
	Mode = createKeyEntries('modes')
}
catch(err)
{
	// [!] DEV
	// console.log(err)
}

export {casesData, actionsData, interactionsData, Action, Case, Mode}
// interactions