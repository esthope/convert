import {StringIndex, Interaction} from 'constant/interfaces';
import interactionData from 'service/data_interaction.json';
// alert
import {create_error, create_warning} from 'util/errorHandler';
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