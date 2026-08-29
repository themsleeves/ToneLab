# Partie 9 — Évolution vers l'application ToneLab

<a id="part9-introduction"></a>

## Navigation

[← Partie 8 — Organisation des expérimentations](part8.md)

[↑ Retour à l'index du chapitre Profils sonores](index.md)

[→ Partie 10 — Conclusion du chapitre](part10.md)

[→ Retour au chapitre Brunetti XL R-EVO II](../index.md)

---

## Sommaire de la partie

* [1. Introduction](#part9-introduction)
* [2. De la documentation à l'outil](#part9-outil)
* [3. Le catalogue de matériel](#part9-catalogue)
* [4. Le test comme unité d'expérimentation](#part9-test)
* [5. Une architecture devenue générique](#part9-generique)
* [6. Le Brunetti comme référence actuelle](#part9-brunetti)
* [7. Documentation et données](#part9-documentation)
* [8. Une application au service de la recherche](#part9-recherche)
* [9. À retenir](#part9-a-retenir)

---

<a id="part9-outil"></a>

## 2. De la documentation à l'outil

La construction des profils sonores a progressivement fait apparaître un besoin pratique.

La documentation permet de conserver les connaissances acquises, mais elle n'est pas nécessairement le moyen le plus pratique pour enregistrer chaque expérimentation.

C'est cette constatation qui a conduit à la création de **ToneLab Profiles**.

L'application a pour objectif de faciliter la saisie, la consultation et la conservation des configurations utilisées pendant les recherches sonores.

Elle constitue donc un prolongement pratique de la méthode définie dans ce chapitre.

---

<a id="part9-catalogue"></a>

## 3. Le catalogue de matériel

L'application distingue désormais le **matériel** des **configurations dans lesquelles ce matériel est utilisé**.

Le catalogue constitue la bibliothèque des éléments disponibles.

Il peut notamment contenir :

* des amplificateurs ;
* des pédales ;
* des guitares ;
* des cabinets.

Les amplificateurs et les pédales peuvent également être décrits au moyen de paramètres configurables.

Cette approche permet de représenter un matériel sans avoir à recopier sa définition à chaque expérimentation.

Le catalogue décrit donc :

> **ce qu'est le matériel.**

---

<a id="part9-test"></a>

## 4. Le test comme unité d'expérimentation

Une expérimentation correspond à une utilisation concrète du matériel.

Le test peut notamment enregistrer :

* la référence musicale recherchée ;
* la guitare ;
* l'accordage ;
* le pickup ;
* le cabinet ;
* l'amplificateur ;
* le canal ;
* les réglages ;
* les pédales ;
* les observations ;
* l'objectif ;
* le statut du test.

Le test décrit donc :

> **comment le matériel a été utilisé lors d'une expérimentation.**

Cette distinction permet notamment de réaliser plusieurs essais avec le même matériel sans dupliquer les informations du catalogue.

---

<a id="part9-generique"></a>

## 5. Une architecture devenue générique

ToneLab a initialement été conçu autour du Brunetti XL R-EVO II et du matériel utilisé dans le cadre de ce projet.

L'application a depuis évolué vers une architecture plus générale.

Il est désormais possible de définir différents modèles d'amplificateurs et de pédales, avec leurs canaux et leurs paramètres.

Les catalogues ne sont donc plus limités au matériel actuellement utilisé.

Cette évolution permet à ToneLab de devenir progressivement un outil utilisable avec différentes configurations matérielles.

Elle ne modifie cependant pas l'objectif de cette documentation.

---

<a id="part9-brunetti"></a>

## 6. Le Brunetti comme référence actuelle

Même si l'application est devenue générique, les recherches documentées dans ce projet restent actuellement centrées sur le **Brunetti XL R-EVO II**.

Il constitue notre amplificateur de référence.

Les profils et expérimentations présentés dans ce chapitre doivent donc être compris dans ce contexte.

L'architecture générique de ToneLab représente une possibilité d'évolution.

Elle ne signifie pas que nous devons immédiatement documenter tous les amplificateurs susceptibles d'être ajoutés à l'application.

Le travail actuel reste volontairement centré sur le matériel réellement utilisé.

---

<a id="part9-documentation"></a>

## 7. Documentation et données

La documentation Markdown et les données de ToneLab ont des rôles complémentaires.

La documentation conserve principalement :

* les principes ;
* la méthode ;
* les connaissances acquises ;
* les conclusions ;
* les profils retenus.

ToneLab conserve davantage le détail des expérimentations :

* les configurations ;
* les réglages ;
* les observations ;
* les statuts ;
* les différentes tentatives.

Cette séparation évite de transformer la documentation en journal exhaustif de chaque essai.

Elle permet également de conserver les expérimentations sans alourdir inutilement les chapitres Markdown.

---

<a id="part9-recherche"></a>

## 8. Une application au service de la recherche

ToneLab n'a donc pas vocation à remplacer la documentation.

L'application sert principalement à **faciliter la recherche et la conservation des expérimentations**.

La documentation sert ensuite à formaliser ce qui a été appris.

La relation peut être résumée ainsi :

> **expérimenter → observer → conserver → comparer → valider → documenter**

Cette organisation permet de conserver à la fois :

* l'historique de la recherche ;
* les connaissances acquises ;
* les configurations retenues.

L'application devient ainsi un véritable outil de travail pour la construction progressive des profils sonores.

---

<a id="part9-a-retenir"></a>

## 9. À retenir

L'évolution vers ToneLab Profiles constitue une conséquence directe de la méthode développée dans ce chapitre.

Les principes essentiels sont :

* le catalogue décrit le matériel ;
* le test décrit une expérimentation ;
* plusieurs tests peuvent utiliser le même matériel ;
* les données conservent le détail des essais ;
* la documentation conserve les connaissances et les conclusions ;
* l'application est désormais conçue pour pouvoir gérer différents matériels ;
* le Brunetti reste actuellement notre amplificateur de référence.

## ToneLab permet ainsi de passer d'une recherche sonore ponctuelle à une démarche structurée et reproductible.

## Navigation

[← Partie 8 — Organisation des expérimentations](part8.md)

[↑ Retour à l'index du chapitre Profils sonores](index.md)

[→ Partie 10 — Conclusion du chapitre](part10.md)

[→ Retour au chapitre Brunetti XL R-EVO II](../index.md)
