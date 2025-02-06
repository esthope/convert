import {StringIndex, Interaction} from 'constant/interfaces';
import interactionData from 'service/data_interaction.json';

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
		// [!] MSG
		console.log(err)
	}
}

export const createKeyEntries = (slice:string):StringIndex => {
	const selection = fetchData(slice);
	let interactions:StringIndex = {};

	selection.forEach((item:any) => {
		interactions[item.entry] = item.data_id
	})

	return interactions;
}