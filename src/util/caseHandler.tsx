// @ts-nocheck

/*
- récupérer les caractères sélectionnés
- récupérer le caractère de remplacement
- là où ils se trouvent, les remplacer

savoir là où il se trouvent

"test oui test oui non"
→ selection du deuxième test seulement, comment le différencier ?

*/
export const franckRemplacer = (areaValue:string /*à enlever*/, selected:string, choice:string):void => {
	// let regex = '/X{1,}/gi'; // state selected;
	let regex = selected; // state selected;

	transformed = areaValue.replaceAll(regex, choice);
	setAreaValue(transformed);
}

/*---------------- ARCHIVE --------------------*/
/*
	- lowercase partout
	- départager tous les mots /\s\w/g
	- ignorer le premier
	- capitaliser la 1er lettre des mots
	- joindre les mots sans espace
*/
export const franckCamelCase = ():void => {
	// text-transform: capitalize
	let transformed = areaValue.toLowerCase();
	transformed = transformed.replaceAll(/\s\p{Letter}/gu, (value:string):string => value.toUpperCase())
	transformed = transformed.replaceAll(/\s/g, '');
	setAreaValue(transformed);
}

/*
	- lowercase partout
	- départager tous les mots (^|\s)\w
	- capitaliser la 1er lettre des mots
	- joindre les mots avec espace
*/
export const franckCapitalize = ():void => {
	let transformed = areaValue.toLowerCase();
	transformed = transformed.replaceAll(/(^|\s)\p{Letter}/gu, (value:string):string => value.toUpperCase())
	setAreaValue(transformed);
}

/**/
export const franckInversion = ():void => {
	//[\p{upper}\p{lower}]
	let lowerRegex = new RegExp('\\p{Lower}', 'u');

	let transformed = areaValue.replaceAll(/\p{Letter}/gu, (letter:string):string => {
	return (lowerRegex.test(letter)) ? letter.toUpperCase() : letter.toLowerCase();
	});
	setAreaValue(transformed);
}