// Internal
const TECH = 'Une erreur technique empêche',
	  RIGHT_TECH = `${TECH} le bon`,
	  SHORTKEY_OK = 'Les raccourcis clavier sont encore disponibles',
	  FONCTION = 'fonctionnement',
	  TRAITMENT = 'traitement',
	  PAGE = 'de la page',
	  BTN = 'des boutons',
	  MAY = 'Il se peut que',
	  PAST = 'le collage',
	  COPY = 'la copie';

// basic
const TECH_ERR = `${RIGHT_TECH} ${TRAITMENT} ${PAGE}`,
	  TECH_BTN = `${RIGHT_TECH} ${FONCTION} ${BTN}`,
	  DEV = 'L\'équipe technique a été prévenue',
	  OOPS = 'Oups...'

// user
const REFRESH = 'Veuillez rafraîchir',
	  REFRESH_PAGE = 'Rafraichir la page',
	  LATTER = 'réessayez plus tard',
	  ALERT = "Consultez le message d'erreur en bas de la fenêtre",
	  REF_IF_PERSIST = `${REFRESH} si cela persiste`

// component
const EDITOR = "L'éditeur est indisponible",
	  SHORTKEY = `${MAY} le raccourcie clavier n'ait pas fonctionné`,
	  // [!] svg
	  ACTIONS = `${TECH_BTN} des actions copier/coller/couper/réinitialiser. ${SHORTKEY_OK}`,
	  ACTION_FAILED = `Votre action n'a pas pu aboutir à cause d'un soucis technique. ${DEV}.`,
	  CASES = `${TECH_BTN} de la casse`,
	  TEXT_UP = `Un soucis technique peut avoir empêché la mise à jour d'une partie du texte.`,
	  TEXT_UNCHANGED = `Le texte n'a pas pu être changé. ${REF_IF_PERSIST}.`,
	  NOTHING_PAST = `Il n'y a rien à coller.`,
	  PAST_ERR = `${TECH} ${PAST} du texte. ${DEV}.`,
	  COPY_ERR = `${TECH} ${COPY} du texte. ${DEV}.`;

const SELECT_FAILED = `La sélection n'a pas pu être effectuée`,
	  MULTI_SELECT = 'Sélection multiple',
	  SELECT_PLEASE = `Aucun texte à remplacer ne semble sélectionné.\nPour sélectionner à plusieurs endroit dans votre textes, appuyez sur le bouton ${MULTI_SELECT}`

// labels
const ERROR = 'erreur', //ERREUR,
	  WARNING = 'alerte' //AVERTISSEMENT

export {
	TECH_ERR,
	TECH_BTN,
	REFRESH,
	REFRESH_PAGE,
	DEV,
	LATTER,
	EDITOR,
	ALERT,
	OOPS,
	SHORTKEY,
	REF_IF_PERSIST,
	ACTIONS,
	ACTION_FAILED,
	CASES,
	TEXT_UP,
	TEXT_UNCHANGED,
	NOTHING_PAST,
	PAST_ERR,
	COPY_ERR,
	SELECT_FAILED,
	SELECT_PLEASE,
	MULTI_SELECT,
	ERROR,
	WARNING
}