import {fetchData, createKeyEntries} from 'util/dataHandler';

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
catch(err:any)
{
	// [DEV]
	// console.log(err)
}

export {casesData, actionsData, interactionsData, Action, Case, Mode}