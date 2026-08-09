# Partie 5 — Boucle d'effets

## Navigation

[← Retour à l'index du chapitre Architecture](index.md)

[← Partie 4 — Organisation de la chaîne de signal](part4.md)

[→ Partie 6 — Interactions entre les sections](part6.md)

---

## 1. Introduction

Le Brunetti XL R-EVO II dispose d'une boucle d'effets permettant d'insérer des effets externes à un emplacement différent de celui utilisé par les pédales placées entre la guitare et l'entrée de l'amplificateur.

Cette possibilité est particulièrement importante dans notre configuration, puisque certains effets sont destinés à être utilisés dans la boucle.

L'objectif de cette partie est de comprendre :

- le rôle de la boucle ;
- sa place dans l'organisation générale de l'amplificateur ;
- la différence entre une pédale placée avant l'amplificateur et une pédale placée dans la boucle ;
- les conséquences pratiques pour notre configuration.

---

## 2. Pourquoi utiliser une boucle d'effets ?

Toutes les pédales ne réagissent pas de la même manière lorsqu'elles sont placées avant l'amplificateur ou dans sa boucle d'effets.

Une pédale placée entre la guitare et l'entrée agit sur le signal **avant la préamplification**.

Une pédale placée dans la boucle intervient à un autre endroit de la chaîne.

Cette différence est particulièrement importante avec les effets dont le fonctionnement dépend fortement du signal déjà préamplifié.

La boucle permet donc de choisir plus précisément l'endroit où certains effets interviennent dans la chaîne audio.

---

## 3. Différence entre l'entrée et la boucle

Dans notre configuration, il faut distinguer deux grandes catégories d'effets.

### Effets placés avant l'amplificateur

Ces effets reçoivent directement le signal provenant de la guitare et modifient celui-ci avant son entrée dans le préamplificateur.

C'est notamment le cas des effets utilisés pour :

- modifier le niveau d'entrée ;
- pousser le préamplificateur ;
- modifier le signal avant saturation ;
- changer la réponse de l'amplificateur.

La Tube Screamer et l'égaliseur utilisés dans notre configuration appartiennent notamment à cette logique lorsqu'ils sont placés avant l'entrée.

### Effets placés dans la boucle

Les effets placés dans la boucle interviennent à un autre endroit de la chaîne.

Cette position est particulièrement intéressante pour les effets dont on souhaite conserver le caractère après la génération de la saturation du préamplificateur.

C'est notamment le cas de certains :

- délais ;
- réverbérations ;
- modulations.

---

## 4. Les effets temporels

La boucle d'effets présente un intérêt particulier pour les effets temporels.

Un délai ou une réverbération placé avant un préamplificateur fortement saturé peut voir ses répétitions ou sa queue de réverbération subir à leur tour le traitement de la saturation.

Le résultat peut alors être sensiblement différent de celui obtenu lorsque l'effet intervient après la préamplification.

Dans notre configuration, cette distinction explique l'intérêt de placer les effets de type délai ou réverbération dans la boucle lorsque l'objectif est de conserver des répétitions et des ambiances plus clairement séparées du signal saturé.

Cela ne signifie pas qu'un délai ou une réverbération doit toujours être placé dans une boucle.

Le choix dépend du résultat recherché.

---

## 5. Les effets de modulation

La boucle peut également être utilisée pour certains effets de modulation.

Dans notre configuration, le tremolo fait partie des effets qui peuvent être placés dans cette section.

L'intérêt dépend toutefois du type de modulation et du comportement recherché.

Comme pour les effets temporels, la position de l'effet dans la chaîne modifie le résultat final.

Il est donc préférable de considérer la boucle comme un **emplacement de traitement supplémentaire**, et non comme une catégorie d'effets obligatoire.

---

## 6. La boucle dans notre configuration

Notre configuration utilise notamment la boucle du Brunetti pour les effets qui doivent intervenir après la partie principale de préamplification.

La logique retenue est notamment adaptée à :

- la réverbération ;
- le délai ;
- le tremolo.

À l'inverse, certains effets sont volontairement conservés avant l'entrée de l'amplificateur.

Cette séparation permet de conserver des fonctions différentes :

- les effets placés avant l'entrée participent à la construction du signal qui attaque le préamplificateur ;
- les effets placés dans la boucle interviennent plus tard dans la chaîne.

Cette distinction est fondamentale pour comprendre notre pedalboard.

---

## 7. La boucle et le caractère du son

La boucle d'effets ne constitue pas à elle seule un élément permettant de modifier le caractère fondamental d'un canal.

Elle intervient plutôt dans la manière dont les effets externes sont intégrés au son produit par l'amplificateur.

Il faut donc distinguer deux situations.

### Modifier le signal avant la saturation

Une pédale placée avant l'entrée peut modifier la manière dont le préamplificateur réagit.

Elle peut notamment influencer :

- le niveau d'attaque ;
- la quantité de saturation ;
- l'équilibre du signal entrant ;
- la réponse du préamplificateur.

### Ajouter un effet après la préamplification

Une pédale placée dans la boucle intervient après cette construction principale du son.

Elle permet notamment d'ajouter :

- une ambiance ;
- des répétitions ;
- une modulation ;

sans demander au préamplificateur de traiter ces éléments de la même manière que le signal de guitare initial.

---

## 8. Conséquence pour les réglages du ToneLab

La position d'un effet doit toujours être indiquée lorsque nous documentons un réglage.

Un profil sonore ne doit donc pas uniquement préciser :

- le canal ;
- le Gain ;
- Bass ;
- Mid ;
- Edge ;
- Focus ;
- Depth.

Il doit également préciser, lorsque cela a une influence sur le résultat :

- les pédales placées avant l'amplificateur ;
- les effets utilisés dans la boucle ;
- leur ordre ;
- leurs réglages principaux.

Cette information est nécessaire pour pouvoir reproduire réellement un réglage.

---

## 9. La boucle ne doit pas être considérée isolément

Le comportement de la boucle dépend du reste de la chaîne.

Une même pédale peut produire un résultat différent selon :

- le canal utilisé ;
- le niveau de gain ;
- le volume ;
- la guitare ;
- le cabinet ;
- les autres pédales présentes dans la chaîne.

Il faut donc éviter de définir un réglage universel de la boucle.

Dans le cadre du ToneLab, nous chercherons plutôt à documenter les configurations réellement utilisées et validées.

---

## 10. Principe de séparation des fonctions

Pour notre configuration, une règle simple permet de conserver une organisation cohérente :

- **avant l'entrée** : les effets qui doivent agir sur le signal avant la préamplification ;
- **dans la boucle** : les effets qui doivent intervenir après cette partie de la chaîne.

Cette règle n'est pas absolue.

Elle constitue néanmoins un bon point de départ pour organiser le pedalboard et comprendre les différences de comportement.

Les essais pourront ensuite justifier des exceptions.

---

## 11. À retenir

La boucle d'effets du Brunetti constitue un point d'insertion supplémentaire dans la chaîne audio.

Elle permet notamment :

- de placer certains effets après la préamplification ;
- de séparer les effets qui attaquent le préamplificateur de ceux qui interviennent plus tard ;
- d'intégrer efficacement certains délais et réverbérations ;
- d'utiliser certaines modulations à un autre endroit de la chaîne.

Pour le ToneLab, la position d'un effet est donc une information aussi importante que son modèle et son réglage.

---

## Navigation

[← Partie 4 — Organisation de la chaîne de signal](part4.md)

[↑ Retour à l'index du chapitre Architecture](index.md)

[→ Partie 6 — Interactions entre les sections](part6.md)

[↑ Retour à l'index Brunetti XL R-EVO II](../index.md)