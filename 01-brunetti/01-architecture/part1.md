# Chapitre 01 — Architecture

## Partie 1 — Architecture générale du Brunetti XL R-EVO II

> Avant de chercher à reproduire un son, il faut comprendre la machine qui va le produire.

---

## Fil d'Ariane

[ToneLab](../../index.md)  
→ [Brunetti XL R-EVO II](../index.md)  
→ [Architecture](index.md)  
→ Partie 1 — Architecture générale

---

## Sommaire

- [1. Objectif](#1-objectif)
- [2. Le Brunetti comme système sonore](#2-le-brunetti-comme-système-sonore)
- [3. Une architecture à trois canaux](#3-une-architecture-à-trois-canaux)
- [4. Les trois identités de préamplification](#4-les-trois-identités-de-préamplification)
- [5. Organisation générale des commandes](#5-organisation-générale-des-commandes)
- [6. Les commandes propres aux canaux](#6-les-commandes-propres-aux-canaux)
- [7. Les commandes communes](#7-les-commandes-communes)
- [8. Bass, Mid et Edge](#8-bass-mid-et-edge)
- [9. Le rôle de Edge](#9-le-rôle-de-edge)
- [10. Le rôle de Bright](#10-le-rôle-de-bright)
- [11. Le rôle de Focus](#11-le-rôle-de-focus)
- [12. Le rôle de Depth](#12-le-rôle-de-depth)
- [13. Architecture et identité sonore](#13-architecture-et-identité-sonore)
- [14. Architecture et matériel externe](#14-architecture-et-matériel-externe)
- [15. Conséquences pour la méthode de réglage](#15-conséquences-pour-la-méthode-de-réglage)
- [16. Ce qui est établi et ce qui reste à vérifier](#16-ce-qui-est-établi-et-ce-qui-reste-à-vérifier)
- [17. Conclusion](#17-conclusion)
- [Navigation](#navigation)

---

# 1. Objectif

Cette première partie constitue la base technique du chapitre consacré à l'architecture du Brunetti XL R-EVO II.

L'objectif n'est pas encore de déterminer comment obtenir un son Mesa Boogie Dual Rectifier, Marshall, Diezel, EVH ou un son correspondant à un groupe particulier.

Ces recherches viendront ensuite.

Avant de chercher à rapprocher le Brunetti d'un autre territoire sonore, il faut comprendre précisément ce que nous avons entre les mains.

Cette partie cherche donc à documenter :

- l'organisation générale de l'amplificateur ;
- ses trois canaux ;
- l'organisation de ses commandes ;
- les commandes qui sont spécifiques à certains canaux ;
- les commandes qui interviennent de manière plus globale ;
- la logique générale de son voicing ;
- les éléments qui devront être pris en compte lors des futurs réglages.

Cette distinction est importante pour le ToneLab.

Un réglage de potentiomètres n'a de sens que si l'on comprend le rôle de ces potentiomètres et leur interaction avec le reste de l'amplificateur.

---

# 2. Le Brunetti comme système sonore

Le Brunetti XL R-EVO II ne doit pas être considéré comme une simple collection de potentiomètres indépendants.

Le son obtenu est le résultat de l'interaction de plusieurs éléments.

Dans notre configuration, il faut notamment prendre en compte :

- la guitare ;
- les micros ;
- le niveau du signal entrant ;
- le canal sélectionné ;
- le gain ;
- l'égalisation ;
- les commandes de voicing ;
- la boucle d'effets ;
- la section de puissance ;
- le volume de fonctionnement ;
- le cabinet ;
- les haut-parleurs ;
- les pédales placées avant l'amplificateur ;
- les effets placés dans la boucle.

Cela signifie qu'un réglage donné ne possède pas nécessairement une valeur absolue.

Un réglage qui fonctionne avec une guitare peut nécessiter une adaptation avec une autre.

De même, un réglage qui semble idéal à faible volume peut réagir différemment lorsque l'amplificateur est utilisé à un niveau plus important.

Dans le cadre du ToneLab, un profil sonore devra donc toujours être associé autant que possible à son contexte.

Un futur réglage documenté devra idéalement préciser :

- la guitare utilisée ;
- le micro utilisé ;
- le canal ;
- les réglages de l'amplificateur ;
- les pédales utilisées ;
- leur position dans la chaîne ;
- le cabinet utilisé ;
- les conditions d'écoute ;
- les observations réalisées.

Cette méthode nous permettra de distinguer un véritable réglage reproductible d'une simple impression subjective obtenue dans une configuration particulière.

---

# 3. Une architecture à trois canaux

Le XL R-EVO II est organisé autour de trois canaux.

Il est toutefois préférable de ne pas les considérer comme une simple progression :

    Clean
       ↓
    Crunch
       ↓
    Lead

Cette représentation est trop simplificatrice.

Les canaux possèdent chacun leur propre personnalité et leur propre voicing.

Le choix d'un canal ne dépend donc pas uniquement de la quantité de gain recherchée.

Il dépend également de la manière dont le canal présente le signal :

- densité ;
- attaque ;
- équilibre spectral ;
- présence des médiums ;
- quantité d'aigus ;
- définition ;
- compression ;
- sensation de profondeur ;
- réaction aux pédales.

Cette caractéristique est particulièrement importante pour notre projet.

Nous cherchons à utiliser le Brunetti pour explorer plusieurs territoires sonores très différents.

Il serait donc contre-productif de considérer un canal comme étant simplement « meilleur » qu'un autre.

Il faut plutôt déterminer **quel canal constitue le meilleur point de départ pour le son recherché**.

Cette approche sera particulièrement importante lorsque nous chercherons à approcher les territoires :

- Marshall ;
- Mesa Boogie ;
- Diezel ;
- EVH ;
- stoner rock ;
- hard rock ;
- metal moderne.

---

# 4. Les trois identités de préamplification

## 4.1 Canal Clean

Le canal Clean constitue le point de référence de l'amplificateur pour les sons à faible niveau de saturation.

Il permet notamment d'observer le comportement du système sans que la forte saturation des autres canaux masque certaines caractéristiques de la chaîne.

Il est particulièrement intéressant pour étudier :

- la réponse générale de l'égalisation ;
- l'influence de la guitare ;
- l'influence des micros ;
- la réaction aux pédales placées en amont ;
- le rôle de la commande Bright.

Il ne faut toutefois pas réduire son intérêt à l'obtention d'un son totalement propre.

Comme pour tout amplificateur à lampes, le comportement dépend également du niveau du signal entrant et du niveau de fonctionnement de l'amplificateur.

---

## 4.2 Canal Boost

Le canal Boost ne doit pas être interprété comme un simple « Clean avec plus de gain ».

Il possède sa propre identité sonore.

Dans les éléments déjà étudiés dans notre documentation, il est associé à un caractère riche en harmoniques, épais et dynamique.

Il constitue donc un véritable territoire sonore et non simplement une étape intermédiaire entre le Clean et le XLead.

Cette distinction est importante pour la suite du ToneLab.

Lorsque nous chercherons un son saturé, nous ne devrons pas automatiquement partir du XLead sous prétexte qu'il offre davantage de gain.

Le Boost pourra constituer un meilleur point de départ lorsque le caractère recherché nécessitera notamment :

- davantage d'épaisseur ;
- une réponse plus organique ;
- une saturation moins orientée vers le caractère incisif du XLead ;
- une dynamique particulière.

Ces critères devront néanmoins être vérifiés avec le matériel réel.

---

## 4.3 Canal XLead

Le XLead occupe une place particulièrement importante dans notre travail.

C'est le canal que nous avons notamment envisagé comme point de départ pour certaines recherches de sons modernes et fortement saturés.

Il serait cependant incorrect de le définir uniquement comme :

> le canal qui possède le plus de gain.

La quantité de gain n'est qu'une partie de son identité.

Le XLead possède également un voicing particulier.

Les informations déjà réunies dans notre documentation le décrivent comme plus incisif et davantage orienté vers les hauts médiums et les aigus que le Boost.

On peut donc retenir provisoirement :

    XLead ≠ Boost + davantage de gain

La différence concerne également :

- l'équilibre spectral ;
- l'attaque ;
- la sensation de présence ;
- la manière dont la saturation est présentée ;
- la réaction aux corrections d'égalisation.

Cette distinction sera essentielle lorsque nous étudierons les rapprochements avec les amplificateurs modernes.

Le XLead pourra être un excellent point de départ pour certaines recherches, mais il ne faut surtout pas partir du principe qu'il constitue automatiquement la meilleure solution pour tous les sons high-gain.

Le choix devra être déterminé par le territoire sonore recherché.

---

# 5. Organisation générale des commandes

Le Brunetti associe des commandes que l'on retrouve sur de nombreux amplificateurs à d'autres commandes plus particulières.

Parmi les commandes principales figurent notamment :

- Gain ;
- Bass ;
- Mid ;
- Edge ;
- Master.

D'autres commandes participent à la construction du voicing ou à la réponse globale :

- Bright ;
- Focus ;
- Level ;
- Depth.

Cette organisation est importante pour notre documentation car elle explique pourquoi il est difficile de traduire directement un réglage provenant d'un autre amplificateur.

Sur un amplificateur très classique, on pourrait par exemple raisonner avec :

    Gain
    Bass
    Middle
    Treble
    Master

Le Brunetti ne se limite pas à cette logique.

Il dispose de plusieurs commandes supplémentaires permettant d'agir sur la sensation produite par l'amplificateur.

Il faut donc éviter de chercher systématiquement un équivalent direct entre chaque commande du Brunetti et une commande connue sur un autre ampli.

C'est particulièrement vrai pour :

- Edge ;
- Focus ;
- Depth.

Ces commandes seront étudiées séparément dans les parties suivantes de ce chapitre.

---

# 6. Les commandes propres aux canaux

Le caractère d'un canal ne peut pas être séparé de la manière dont son égalisation agit.

Un réglage donné ne doit donc pas être interprété indépendamment du canal utilisé.

Par exemple, il serait dangereux de construire une règle universelle telle que :

> Mid à 6 = beaucoup de médiums.

La perception réelle dépend du contexte.

Elle peut varier en fonction :

- du canal ;
- du niveau de gain ;
- des autres réglages ;
- du volume ;
- du cabinet ;
- des haut-parleurs ;
- de la guitare ;
- des micros ;
- des pédales placées en amont.

Cette interaction explique pourquoi les futurs profils sonores devront être construits par expérimentation.

Nous pourrons utiliser des valeurs de potentiomètres comme points de départ, mais nous ne devons pas leur attribuer une signification universelle indépendamment du contexte.

C'est également la raison pour laquelle les futurs réglages de type :

    Mesa / Rectifier
    Marshall / Plexi
    Diezel
    EVH
    Stoner

devront être documentés comme des **profils de réglage du Brunetti**, et non comme des traductions littérales des réglages d'un autre amplificateur.

---

# 7. Les commandes communes

L'organisation du Brunetti implique également de distinguer deux niveaux de réglage.

Le premier concerne le caractère propre du canal sélectionné.

Le second concerne les paramètres qui participent à la réponse globale de l'amplificateur.

Cette distinction est particulièrement importante pour notre méthode de travail.

Un réglage destiné à produire un profil sonore peut donc être construit en plusieurs étapes :

1. choisir le canal ;
2. déterminer le niveau de gain ;
3. construire l'équilibre tonal principal ;
4. travailler le voicing ;
5. régler la profondeur et la réponse globale ;
6. vérifier le résultat avec le cabinet et la guitare utilisés.

Cette méthode évite de chercher à corriger simultanément tous les paramètres.

Elle permet également de mieux identifier la cause d'un problème sonore.

Par exemple, si un son manque de définition, il est préférable de déterminer d'abord si le problème vient :

- du canal choisi ;
- d'un excès de gain ;
- d'un excès de grave ;
- d'un manque de médiums ;
- d'un réglage de voicing ;
- du cabinet ;
- de la guitare ;
- d'une pédale.

Plutôt que de modifier plusieurs paramètres simultanément.

---

# 8. Bass, Mid et Edge

L'égalisation du Brunetti ne doit pas être interprétée comme une copie directe de l'égalisation d'un autre amplificateur.

Les trois commandes :

- Bass ;
- Mid ;
- Edge ;

ne doivent pas automatiquement être traduites comme :

- Bass ;
- Middle ;
- Treble.

Cette distinction est particulièrement importante pour **Edge**.

Le nom pourrait inciter à considérer cette commande comme un simple réglage d'aigus.

Ce n'est pas une interprétation suffisamment précise.

La fonction de Edge devra être comprise comme une commande spécifique du Brunetti, avec sa propre zone d'action et sa propre influence sur la sensation sonore.

C'est précisément ce type de différence qui explique pourquoi la transposition directe d'un réglage Mesa Boogie ou Marshall vers le Brunetti ne peut pas fonctionner simplement potentiomètre par potentiomètre.

---