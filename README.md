# Bienvenue sur le repository de Zeste
> Cet outil web est un convertisseur de casse, et permet également de remplacer en masse une sélection de caractères par d'autres caractères choisis.

## Convertir et remplacer
Vous pouvez remplacer la casse du **texte entier**, ou des **caractères sélectionnés**.
Si vous souhaitez modifier **divers endroits** du texte, il est possible de sélectionner des mots ou des caratères avec la fonctionnalité de **multi-sélection**.

## Comment ça marche
### L'interface à disposition
Saisissez le texte dans le __champs de l'éditeur__. Pour **modifier la casse**, choisissez un des boutons de modification à disposition. Pour **remplacer des caractères**, saisissez un texte en plus dans le __champs de remplacement__ ce qu'il faudra mettre.

Les **boutons pour la casse** 

Les **boutons d'action utilisateur**

Tous les boutons ont des raccourcies clavier associés.


### Le programme derrière

>>>
>>>

 site une page avec un éditeur de texte, des boutons et un champs de saisie.

Avec les boutons on peut modifier la casse du texte de l'éditeur, selon ce qu'on souhaite (majuscule, minuscule, camel case, pascal case, inversion de casse). Avec 4 autres boutons on peut copier, coller, réinitialiser, couper. Tous les boutons ont un raccourcie clavier dédiés
Le champs de saisie secondaire permet de remplacer du texte. Il faut d'abord faire une sélection dans l'éditeur, puis cliquer sur un bouton dédié au remplacement pour remplacer cette sélection par le texte inscrit dans le champs de saisie secondaire.

une fonctionnalité en plus est présente : la multi sélection. on peut switcher entre le mode de sélection simple (habituel), et le mode de sélection multiple. quand ce dernier mode est activé, toutes les sélections effectuées à partir de ce moment sont maintenues (techniquement, les index des caractères sont enregistrés dans une table), et il est possible de sélectionner plusieurs caractères à plusieurs endroits dans le texte.

quand des caractères sont sélectionnés, ce sont seulement eux qui vont être modifié par les boutons et le remplacement. si rien n'est sélectionné, alors le texte entier sera modifié, sauf pour le remplacement qui ne fonctionnera pas.