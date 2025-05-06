# Bienvenue sur le repository de Zeste
> Cet outil web est un convertisseur de casse, et permet également de remplacer en masse une sélection de caractères par d'autres caractères choisis. Il possède la fonctionnalité pratique de sélection multiple.

## Convertir et remplacer
Vous pouvez remplacer la casse du **texte entier**, ou des **caractères sélectionnés**.
Si vous souhaitez modifier **divers endroits** du texte, il est possible de sélectionner des mots ou des caratères avec la fonctionnalité de **multi-sélection**.

## Comment ça marche
Saisissez le texte dans le *champs de l'éditeur*. Pour **modifier la casse**, choisissez un des boutons de modification à disposition. Pour **remplacer des caractères**, saisissez un texte en plus dans le *champs de remplacement* ce qu'il faudra mettre.

#### Les boutons
Les **boutons pour la casse** peuvent inverser la casse et modifier en majuscule • minuscule • camel case • pascal case.
Les **boutons d'action utilisateur** permettent de copier • coller • couper et réinitialiser.
Tous les boutons ont un raccourci clavier associé.

#### Remplacer
Le champs de saisie secondaire permet de remplacer du texte. Il faut d'abord inscrire un texte dans l'éditeur, sélectionner ce qu'on veut remplacer, puis cliquer sur un bouton de remplacement, à côté du champs. Le texte inscrit dans le champs remplacera la/les sélection.s.

#### Sélection
Une fonctionnalité de **multi sélection** permet de switcher entre le mode de sélection simple (habituel), et le mode de sélection multiple. Quand ce dernier mode est activé, toutes les sélections effectuées à partir de ce moment sont enregistrées. On peut donc **sélectionner plusieurs caractères à plusieurs endroits** dans le texte.

> [en analyse] la multi-sélectio sur téléphone n'est pas disponible, ou ne fonctionnera probablement pas.

Quand des caractères sont sélectionnés, ce sont **seulement eux qui vont être modifiés** par les boutons et le remplacement. Si rien n'est sélectionné, alors ce sera la casse du texte entier qui sera modifiée – le remplacement attend une sélection.

## Techniquement
> Le programme tourne avec la techno [ReactJS](https://react.dev/), en utilisant [TypeScript](https://www.typescriptlang.org/). L'éditeur de base est celui de [DraftJS](https://draftjs.org/).

#### L'éditeur avec DraftJS – sélection multiple
Seules deux fonctionnalités de DraftJS sont utilisées, soit : la saisie du texte dans une zone de texte, et l'ajout du style *inline* HIGHLIGHT au texte, qui est détourné dans Zeste pour la sélection multiple.

Lorsque le mode sélection multiple est activé, et que l'utilisateur commence à sélectionner des caractères, je demande à DraftJS d'appliquer le style. Il enregistre les blocks et les positions des caractères dans son tableau des styles.

Lorsque l'utilisateur demande la modification du texte, ce tableau est récupéré pour identifier les caratères grâce à leurs positions/index, puis ils sont remplacés et l'éditeur est mis à jour.

#### Les boutons 
Des évènements sont écoutés sur le clavier pour *attraper* les raccoucis désirés.
Les raccourcis correspondant à copier • coller et couper agissent sur l'intégralité du texte. C'est pourquoi ils sont **désactivés lorsque l'éditeur a le focus**. Cela permet à l'utilisateur de faire ces actions dans son texte.

## Le design
> ![Logo Zeste](/public/favicon32.png) Les logos et les images ont été réalisés avec le logiciel de courbes Adobe Illustrator.

La police principale est **QuickSand**, et la police pour les titres ou les mots spéciaux est **RozhaOne**.

Le thème de l'agrume est venu lors de la réflexion sur le projet, sur l'application [Trello](https://trello.com/fr) : j'avais illustré une des listes avec l'image d'une orange dont la peau avait sa couleur complémentaire bleue. Cela m'évoquait la dualité des majuscules et des minuscules qui sont opposées. Ce symbole a construit l'identité du programme.

Pour trancher avec la couleur orange, le thème principale est donc kaki, et la couleur secondaire est du bleu klein.

## Le développeur
La développeuse, plutôt !

Mes études se sont passées en Lorraine et dans le Nord de la France :
* Licence de Psychologie
* [Développeur web et web mobile](https://www.francecompetences.fr/recherche/rncp/37674/)
* [Concepteur Développeur d'Application](https://www.francecompetences.fr/recherche/rncp/37873/)

Consultante SAP module PI/PO, j'ai conçu l'outil Zeste d'abord pour mon usage professionnel.
Bénévole à mes heures perdues pour aider les associations à maintenir leur site.

J'aime partager mon travail alors parcourez les fichiers de Zeste si cela vous rend curieux.