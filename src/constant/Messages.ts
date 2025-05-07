// Internal
const TECH = 'Une erreur technique empêche',
	  RIGHT_TECH = `${TECH} le`,
	  SHORTKEY_OK = 'Les raccourcis clavier sont encore disponibles',
	  FONCTION = 'fonctionnement',
	  TRAITMENT = 'traitement',
	  PAGE = 'de la page',
	  BTN = 'des boutons',
	  MAY = 'Il se peut que',
	  PAST = 'le collage',
	  COPY = 'la copie';

// dev
export const EMPTY_DATA = 'Les données n\'ont pas pu être récupérées depuis le JSON.',
			PAST_FAILED = `Impossible de faire ${PAST} avec le raccourcie clavier`

// basic
export const TECH_ERR = `${RIGHT_TECH} ${TRAITMENT} ${PAGE}`,
	  TECH_BTN = `${RIGHT_TECH} ${FONCTION} ${BTN}`,
	  DEV = 'L\'équipe technique a été prévenue',
	  OOPS = 'Oups...'

// user
export const REFRESH = 'Veuillez rafraîchir',
	  REFRESH_PAGE = 'Rafraichir la page',
	  LATTER = 'réessayez plus tard',
	  ALERT = "Consultez le message d'erreur en bas de la fenêtre",
	  TO_PAST = 'coller',
	  TO_CUT = 'couper',
	  REF_IF_PERSIST = `${REFRESH} si cela persiste`

// component
export const EDITOR = "L'éditeur est indisponible",
	  SHORTKEY = `${MAY} le raccourcie clavier n'ait pas fonctionné`,
	  CASES = `${TECH_BTN} de la casse`,
	  // text
	  TEXT_UP = `Un soucis technique peut avoir empêché la mise à jour d'une partie du texte.`,
	  TEXT_UNCHANGED = `Le texte n'a pas pu être changé. ${REF_IF_PERSIST}.`,
	  // actions
	  ACTIONS = `${TECH_BTN} des actions copier • coller • couper • réinitialiser. ${SHORTKEY_OK}`,
	  ACTION_FAILED = `Votre action n'a pas pu aboutir à cause d'un soucis technique. ${DEV}.`,
	  NOTHING_PAST = `Il n'y a rien à coller.`,
	  CB_NOT_ALLOWED = 'Vous devez autoriser le site à accéder au presse-papier pour pouvoir',
	  PLEASE_FOCUS = 'Vous pouvez coller du texte seulement en ayant le focus dans le champs de l\'éditeur',
	  PAST_ERR = `${TECH} ${PAST} du texte. ${DEV}.`,
	  COPY_ERR = `${TECH} ${COPY} du texte. ${DEV}.`,
	  EMPTY_FIELD = 'Saisissez du texte dans le champs de remplacement pour remplacer votre sélection';

// selection
export const SELECT_FAILED = `La sélection n'a pas pu être effectuée`,
	  MULTI_SELECT = 'Sélection multiple',
	  REINIT_SELECT = 'Réinitialiser la sélection',
	  SELECT_PLEASE = `Aucun texte à remplacer ne semble sélectionné.\nPour sélectionner à plusieurs endroit dans votre textes, appuyez sur le bouton ${MULTI_SELECT}`

// labels
export const ERROR = 'erreur',
	WARNING = 'alerte';