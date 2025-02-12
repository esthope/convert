import {StringIndex, Interaction} from 'constant/interfaces';
import interactionData from 'service/data_interaction.json';
// alert
import {create_error} from 'util/errorHandler';
import {Message} from 'constant/interfaces';
let errorMsg:Message;

export const fetchData = (slice?:string):Interaction|any => {
	try
	{
		let interaction:Interaction|undefined;
		const data:StringIndex = interactionData,
			  {cases, actions} = data;

		// get one interaction
		if (slice)
		{
			const selection = data[slice];
			interaction = selection ?? {};
		}

		// return all if slice is empty
		return interaction ?? {cases, actions};
	}
	catch(err)
	{
		// [!] [ERR] envoi vers plus haut
		errorMsg = create_error(`Une erreur technique empêche le fonctionnement des bouttons ${err}`)
		return errorMsg;
	}
}

export const createKeyEntries = (slice:string):StringIndex => {
	const selection = fetchData(slice);

	// [ERR]
	// if (typeof selection == 'Message')

	let interactions:StringIndex = {};

	selection.forEach((item:any) => {
		interactions[item.entry] = item.data_id
	})

	return interactions;
}

export const getInteractionsKeys = (interactions:Interaction[]|string):any => {

	let keys:string[] = [],
		filteredData:Interaction[];

	const data = (typeof interactions === 'object') ? interactions : fetchData(interactions);

	// the interaction must be active
	filteredData = data.filter((item:Interaction)=>(!item.unactive));
	keys = filteredData.map((item:any) => item.key.toLowerCase());

	return keys;
}

export const handle_press = (event:any, keys:string[], interactions:Interaction[], hasFocus:boolean):string => {

	let interID:string = '';

	try
	{
		// get the needed properties
		const {key, type, ctrlKey, shiftKey} = event;
		let interKey:string,
			checkedFocus:boolean,
			pressedKey = key.toLowerCase()

		// check shorcut
		if (!keys.includes(pressedKey))
		{
			// console.log('bloup')
			return interID;
		}

		// select action
		const interaction_id = interactions.filter((inter) => {
			interKey = inter.key.toLowerCase();
			checkedFocus = (typeof inter.focus === 'boolean') ? (inter.focus === hasFocus) : true;

			return ( checkedFocus
				 && !!inter.shift == shiftKey
				 && interKey === pressedKey)
		})

		interID = interaction_id[0]?.data_id ?? ''; 
		return interID;
	}
	catch(err)
	{
		// [!] ERR
		console.log(err)
		return interID;
	}
}