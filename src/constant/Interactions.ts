import {fetchData, createKeyEntries} from 'util/dataHandler';

export const casesData = fetchData('cases'),
			actionsData = fetchData('actions'),
			interactionsData = [...casesData, ...actionsData]

export const Action = createKeyEntries('actions'),
			Case = createKeyEntries('cases'),
			Mode = createKeyEntries('modes');