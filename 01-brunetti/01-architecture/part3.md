# Partie 3 — Architecture et logique des commandes

## Navigation

[← Retour à l'index du chapitre Architecture](index.md)

[← Partie 2 — Architecture des canaux](part2.md)

[→ Partie 4 — Organisation de la chaîne de signal](part4.md)

---

## 1. Introduction

Le Brunetti XL R-EVO II possède un ensemble de commandes permettant d'agir sur le gain, l'équilibre tonal, le voicing et le comportement général de l'amplificateur.

Ces commandes ne jouent pas toutes le même rôle.

Certaines sont directement associées aux canaux, tandis que d'autres interviennent plus globalement dans le fonctionnement de l'amplificateur.

Cette partie présente leur organisation et leur logique générale.

Elle ne cherche pas encore à établir des réglages destinés à reproduire un territoire sonore particulier.

---

## 2. Les commandes principales

Les principales commandes étudiées dans cette documentation sont :

- **Gain**
- **Bass**
- **Mid**
- **Edge**
- **Master**
- **Bright**
- **Focus**
- **Level**
- **Depth**

Elles peuvent être regroupées en plusieurs fonctions :

| Fonction | Commandes |
|---|---|
| Gain et saturation | Gain |
| Égalisation | Bass, Mid, Edge |
| Voicing | Bright, Focus |
| Volume | Master, Level |
| Réponse globale | Depth |

Cette classification est une manière pratique d'organiser la documentation.

Elle ne signifie pas que chaque commande agit de manière totalement indépendante des autres.

Au contraire, leurs interactions constituent une caractéristique importante du Brunetti.

---

## 3. Gain

Le **Gain** contrôle le niveau de signal envoyé dans la section de préamplification et influence donc directement la quantité de saturation obtenue.

Son action ne doit toutefois pas être interprétée uniquement comme un réglage de quantité de distorsion.

Lorsque le gain augmente, le comportement du son peut également évoluer en termes de :

- compression ;
- dynamique ;
- densité ;
- attaque ;
- définition.

Le niveau de gain approprié dépend donc du canal utilisé et du résultat recherché.

Un niveau de gain élevé n'est pas nécessairement synonyme d'un son plus efficace.

Pour les réglages du ToneLab, le gain devra être déterminé en fonction du caractère recherché plutôt qu'en fonction de la position du potentiomètre.

---

## 4. Bass

La commande **Bass** agit sur le registre grave de l'égalisation.

Elle participe directement à l'équilibre tonal du préamplificateur.

Son réglage influence notamment la perception :

- du poids du son ;
- de la quantité de grave ;
- de la sensation de corps ;
- de la définition des parties graves lorsque la saturation est importante.

Il faut cependant distinguer Bass de Depth.

Les deux commandes peuvent influencer la perception du registre grave, mais elles ne doivent pas être considérées comme deux réglages équivalents.

Cette distinction sera particulièrement importante lorsque nous étudierons plus précisément le fonctionnement de Depth.

---

## 5. Mid

La commande **Mid** agit sur le registre médium.

Elle joue un rôle particulièrement important dans la perception du caractère de l'amplificateur.

Les médiums influencent notamment :

- la présence ;
- la lisibilité ;
- la sensation de corps ;
- la position du son dans le mix ;
- le caractère général de la saturation.

Dans notre méthode de réglage, Mid ne devra donc pas être considéré comme une simple commande permettant d'ajouter ou de retirer des fréquences.

Sa position peut modifier profondément la perception globale du son.

C'est notamment pour cette raison que les réglages du Brunetti devront être évalués dans leur contexte plutôt qu'en recherchant systématiquement une position « neutre ».

---

## 6. Edge

**Edge** constitue l'une des particularités importantes du XL R-EVO II.

Il ne doit pas être considéré comme un simple équivalent du réglage **Treble** que l'on retrouve sur de nombreux amplificateurs.

Les informations déjà réunies dans la documentation indiquent que son action se situe dans une zone très élevée du spectre, autour de 10 kHz selon les données disponibles.

Son rôle doit donc être compris en termes de sensation de haut du spectre plutôt que comme une simple commande générale d'aigus.

Il peut notamment influencer la perception :

- de la brillance ;
- de l'ouverture ;
- du mordant ;
- de la définition ;
- de l'agressivité du haut du spectre.

Cette caractéristique est essentielle lorsque l'on compare le Brunetti à d'autres amplificateurs.

Un réglage d'Edge ne doit pas être traduit directement par un réglage de Treble sur un autre ampli.

---

## 7. Master

La commande **Master** agit sur le niveau de sortie du canal.

Elle doit être distinguée du Gain.

Le Gain intervient principalement dans la construction du signal de préamplification et de sa saturation.

Le Master permet ensuite d'ajuster le niveau de sortie correspondant au canal.

Cette distinction est importante dans la recherche de réglages.

Modifier le Gain pour obtenir davantage de volume ne produit pas le même résultat que modifier le Master.

De même, diminuer le Gain uniquement parce que le son est trop fort peut modifier inutilement le caractère de la saturation.

---

## 8. Bright

**Bright** constitue une commande particulière du canal Clean.

Elle doit être distinguée de Edge.

Les deux commandes concernent le haut du spectre, mais elles ne doivent pas être considérées comme deux versions du même réglage.

Les informations disponibles indiquent que Bright agit plus bas dans le spectre que Edge, autour de 5 kHz selon les données documentées.

Bright intervient donc dans la sensation de brillance du canal Clean.

Cette commande doit être étudiée en tenant compte :

- du canal utilisé ;
- de la guitare ;
- des micros ;
- du niveau de gain ;
- du cabinet.

---

## 9. Focus

**Focus** fait partie des commandes qui participent au voicing du Brunetti.

Il ne doit pas être traité comme une simple commande supplémentaire d'égalisation.

Son action doit être considérée en relation avec les autres paramètres du préamplificateur.

Dans le cadre du ToneLab, Focus devra donc être étudié notamment en interaction avec :

- Gain ;
- Bass ;
- Mid ;
- Edge ;
- Depth ;
- le canal utilisé.

Cette interaction explique pourquoi une position donnée de Focus ne peut pas être déclarée universellement optimale.

Son intérêt réside précisément dans la possibilité d'affiner le comportement général du son.

---

## 10. Level

**Level** doit être distingué de Master.

Même si les deux commandes interviennent sur le niveau sonore, elles ne doivent pas être considérées comme deux copies du même contrôle.

Master est associé au réglage de niveau du canal.

Level intervient plus globalement dans l'organisation de l'amplificateur.

Cette distinction sera reprise lorsque nous étudierons plus précisément la chaîne du signal et la relation entre préamplification et section de puissance.

---

## 11. Depth

**Depth** constitue une autre particularité importante du Brunetti.

Il ne doit pas être considéré comme un deuxième réglage de Bass.

Les informations disponibles indiquent que Depth intervient dans la section de puissance et agit sur les graves et les bas médiums.

Cette différence est fondamentale.

Bass permet de construire l'équilibre tonal du signal.

Depth intervient davantage dans la sensation de profondeur et dans la réponse globale de l'amplificateur.

Il est donc parfaitement possible que deux réglages produisant une quantité de grave comparable ne donnent pas la même sensation sonore selon la combinaison utilisée.

Cette distinction devra être conservée dans toutes les futures fiches de réglage.

---

## 12. Commandes individuelles et commandes communes

Une distinction importante doit être faite entre les commandes associées aux différents canaux et celles qui participent au fonctionnement global de l'amplificateur.

Cette organisation explique pourquoi certains réglages suivent le changement de canal alors que d'autres restent communs.

Pour documenter correctement un réglage, il faudra donc toujours préciser :

- le canal utilisé ;
- les commandes propres à ce canal ;
- les commandes communes ;
- les éventuels effets placés dans la boucle.

Cette règle évitera de créer des fiches de réglage ambiguës.

---

## 13. Les commandes ne doivent pas être réglées isolément

Une erreur fréquente consiste à considérer chaque potentiomètre indépendamment.

Or le résultat sonore dépend de leur interaction.

Par exemple :

- augmenter Gain peut modifier la perception des médiums ;
- augmenter Bass peut modifier la précision d'une saturation importante ;
- modifier Mid peut changer la perception du gain ;
- modifier Edge peut modifier la sensation de présence ;
- modifier Depth peut changer la perception du grave sans simplement augmenter Bass.

Il faut donc raisonner en termes de **combinaisons de réglages**.

Cela ne signifie pas qu'il faut modifier toutes les commandes simultanément.

Au contraire, une bonne méthode consiste à modifier un paramètre à la fois afin d'identifier son influence.

---

## 14. Méthode de lecture des commandes

Pour les futurs réglages du ToneLab, chaque commande devra idéalement être décrite selon quatre éléments :

1. **Fonction générale**
2. **Zone ou section concernée**
3. **Influence perceptible**
4. **Interactions importantes**

Cette méthode permettra de conserver une documentation cohérente lorsque nous aborderons les réglages pratiques.

Elle permettra également de distinguer les informations techniques des observations réalisées sur le matériel.

---

## 15. À retenir

Les principales caractéristiques à retenir sont :

- **Gain** agit principalement sur le niveau et le comportement de la préamplification ;
- **Bass** construit l'équilibre du registre grave ;
- **Mid** joue un rôle majeur dans le caractère et la présence ;
- **Edge** ne doit pas être assimilé à un Treble classique ;
- **Master** contrôle le niveau associé au canal ;
- **Bright** intervient sur le canal Clean ;
- **Focus** participe au voicing ;
- **Level** doit être distingué de Master ;
- **Depth** agit différemment de Bass et intervient dans la réponse de l'amplificateur.

La compréhension de ces différences constitue la base nécessaire pour étudier ensuite la chaîne de signal.

---

## Navigation

[← Partie 2 — Architecture des canaux](part2.md)

[↑ Retour à l'index du chapitre Architecture](index.md)

[→ Partie 4 — Organisation de la chaîne de signal](part4.md)

[↑ Retour à l'index Brunetti XL R-EVO II](../index.md)