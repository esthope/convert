// Internal
const TECH = 'Une erreur technique empêche le bon',
	  SHORTKEY_OK = 'Les raccourcis clavier sont encore disponibles',
	  FONCTION = 'fonctionnement',
	  TRAITMENT = 'traitement',
	  PAGE = 'de la page',
	  BTN = 'des boutons',
	  MAY = 'Il se peut que';

// basic
const TECH_ERR = `${TECH} ${TRAITMENT} ${PAGE}`,
	  TECH_BTN = `${TECH} ${FONCTION} ${BTN}`,
	  DEV = 'L\'équipe technique a été prévenue',
	  OOPS = 'Oups...'

// user
const REFRESH = 'Veuillez rafraîchir',
	  LATTER = 'réessayez plus tard',
	  ALERT = "Consultez le message d'erreur en bas de la fenêtre",
	  REF_IF_PERSIST = `${REFRESH} si cela persiste`

// component
const EDITOR = "L'éditeur est indisponible",
	  SHORTKEY = `${MAY} le raccourcie clavier n'ait pas fonctionné`,
	  // [!] svg
	  ACTIONS = `${TECH_BTN} des actions copier/coller/couper/réinitialiser. ${SHORTKEY_OK}`,
	  CASES = `${TECH_BTN} de la casse`,
	  TEXT_UP = `Un soucis technique peut avoir empêché la mise à jour d'une partie du texte.`,
	  TEXT_UNCHANGED = `Le texte n'a pas pu être changé. ${REF_IF_PERSIST}.`

export {
	TECH_ERR,
	TECH_BTN,
	REFRESH,
	DEV,
	LATTER,
	EDITOR,
	ALERT,
	OOPS,
	SHORTKEY,
	REF_IF_PERSIST,
	ACTIONS,
	CASES,
	TEXT_UP,
	TEXT_UNCHANGED
}