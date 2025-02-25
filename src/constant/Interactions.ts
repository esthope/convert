import {fetchData, createKeyEntries} from 'util/dataHandler';
// alert
import * as CustomMsg from 'constant/Messages';
import {create_error} from 'util/errorHandler';
import {Message} from 'constant/interfaces';
let errorMsg:Message;

let casesData:any[] = [],
	actionsData:any[] = [],
	interactionsData:any[] = []

try
{
	casesData = fetchData('cases')
	actionsData = fetchData('actions')

	if (casesData && actionsData)
		interactionsData = [...casesData, ...actionsData]
}
catch(err)
{
	// [!] DEV
	// console.log(err)
}

export const Action = createKeyEntries('actions'),
			Case = createKeyEntries('cases'),
			Mode = createKeyEntries('modes');

export {casesData, actionsData, interactionsData}