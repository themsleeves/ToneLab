# Partie 6 — Interactions entre les sections

## Navigation

[← Retour à l'index du chapitre Architecture](index.md)

[← Partie 5 — Boucle d'effets](part5.md)

[→ Retour à l'index du chapitre Brunetti](../index.md)

---

## 1. Introduction

Les différentes sections du Brunetti XL R-EVO II ne fonctionnent pas indépendamment les unes des autres.

Le résultat obtenu dépend de leur interaction.

Cette caractéristique est essentielle à garder à l'esprit lorsqu'on cherche à construire un réglage.

Une modification apportée à une commande peut modifier la perception d'autres paramètres, même si ceux-ci n'ont pas été changés.

Cette partie présente donc les principales interactions à prendre en compte.

---

## 2. Le canal comme point de départ

Le choix du canal constitue une première interaction importante.

Les commandes de gain et d'égalisation ne produisent pas exactement le même résultat selon que l'on utilise le Clean, le Boost ou le XLead.

Il faut donc toujours considérer un réglage dans le contexte du canal utilisé.

Un réglage ne doit pas être considéré comme une combinaison universelle de positions de potentiomètres.

Il constitue plutôt une combinaison de paramètres adaptée à un canal donné.

---

## 3. Gain et égalisation

Le Gain et l'égalisation sont fortement liés dans la perception du son.

Lorsque le niveau de saturation augmente, l'équilibre entre les graves, les médiums et les hautes fréquences peut être perçu différemment.

Une augmentation du Gain peut notamment donner l'impression :

- que les médiums sont plus présents ;
- que le grave devient plus dense ;
- que l'attaque change ;
- que le haut du spectre devient plus ou moins agressif.

Cela signifie qu'un réglage d'égalisation ne doit pas être évalué indépendamment du niveau de Gain.

Pour cette raison, la recherche d'un réglage doit généralement commencer par déterminer une quantité de gain cohérente avec le résultat recherché, avant d'affiner l'équilibre tonal.

---

## 4. Bass, Mid et Edge

Les trois commandes d'égalisation principales interagissent dans la perception de l'équilibre général.

Modifier une seule bande peut changer la perception des autres.

Par exemple, augmenter les graves peut donner l'impression que les médiums sont moins présents.

À l'inverse, augmenter les médiums peut donner l'impression que le grave et le haut du spectre sont moins importants.

Edge doit être considéré séparément des commandes Bass et Mid.

Comme indiqué dans la [Partie 3 — Architecture et logique des commandes](part3.md), Edge ne correspond pas simplement à un réglage Treble classique.

Il intervient donc dans une zone différente de l'équilibre tonal.

---

## 5. Gain et réponse des pédales

Les pédales placées avant l'entrée de l'amplificateur interagissent directement avec la préamplification.

Une modification du niveau ou de l'équilibre du signal fourni par une pédale peut donc modifier la manière dont le canal réagit.

C'est notamment le cas d'un overdrive utilisé comme boost.

Dans cette configuration, la pédale ne sert pas nécessairement uniquement à ajouter sa propre saturation.

Elle peut également modifier le signal qui attaque le préamplificateur.

Il faut donc toujours considérer ensemble :

- le réglage de la pédale ;
- le niveau de sortie de la pédale ;
- le Gain de l'amplificateur ;
- le canal utilisé.

---

## 6. Préamplification et boucle d'effets

La position d'un effet dans la chaîne modifie également son interaction avec l'amplificateur.

Un effet placé avant l'entrée agit sur le signal qui attaque le préamplificateur.

Un effet placé dans la boucle intervient plus tard dans la chaîne.

Cette différence est particulièrement importante pour les effets temporels.

Une réverbération ou un délai placé avant une forte saturation peut voir son signal traité par cette saturation.

Le même effet placé dans la boucle produira une relation différente avec la saturation du préamplificateur.

C'est l'une des principales raisons pour lesquelles certains effets sont plus naturellement utilisés dans la boucle.

---

## 7. Bass et Depth

Bass et Depth constituent une interaction particulièrement importante dans la compréhension du Brunetti.

Ces deux commandes peuvent influencer la perception du registre grave, mais elles ne remplissent pas la même fonction.

**Bass** intervient dans l'équilibre tonal.

**Depth** intervient plus globalement dans la réponse de l'amplificateur et doit être associé à la section de puissance plutôt qu'à un simple deuxième réglage de grave.

Il faut donc éviter une méthode consistant à utiliser Depth uniquement pour compenser un manque de Bass.

La bonne approche consiste d'abord à déterminer l'équilibre tonal avec Bass, puis à utiliser Depth pour ajuster la réponse globale recherchée.

---

## 8. Volume et perception du son

Les commandes de niveau participent également à la perception du résultat.

Le comportement d'un amplificateur à lampes peut être perçu différemment selon le niveau auquel il fonctionne.

Il faut donc distinguer :

- le niveau de Gain ;
- le niveau du canal ;
- le niveau général ;
- le niveau réellement envoyé au cabinet.

Un réglage qui semble équilibré à faible volume peut nécessiter des ajustements lorsqu'il est utilisé à un niveau beaucoup plus important.

C'est une raison supplémentaire pour laquelle les profils ToneLab devront indiquer, lorsque cela est pertinent, les conditions dans lesquelles ils ont été validés.

---

## 9. Guitare et niveau d'entrée

L'amplificateur ne reçoit pas toujours le même signal.

La guitare utilisée, les micros sélectionnés et le niveau de sortie influencent le signal entrant.

Un même réglage du Brunetti peut donc réagir différemment avec deux guitares.

Cette observation est particulièrement importante pour notre configuration, puisque plusieurs guitares peuvent être utilisées avec le même amplificateur.

Il ne faut donc pas modifier immédiatement l'amplificateur lorsqu'un réglage semble différent avec une autre guitare.

Il faut d'abord déterminer si la différence provient du signal entrant.

---

## 10. Cabinet et perception finale

Le cabinet constitue la dernière partie importante de la chaîne de reproduction.

Le son perçu dépend donc non seulement du réglage de l'amplificateur, mais également du cabinet et des haut-parleurs utilisés.

Un réglage développé avec un cabinet donné ne doit pas être considéré comme automatiquement reproductible à l'identique avec un autre.

Dans le ToneLab, le cabinet fait donc partie intégrante du contexte du réglage.

---

## 11. Une méthode pour éviter les réglages incohérents

Lorsque plusieurs paramètres semblent devoir être modifiés simultanément, il est préférable de procéder progressivement.

Une méthode simple consiste à :

1. choisir le canal ;
2. déterminer le niveau de Gain ;
3. établir un équilibre général avec Bass, Mid et Edge ;
4. ajuster les paramètres de voicing ;
5. régler les niveaux ;
6. vérifier le comportement avec les pédales ;
7. vérifier le résultat avec la guitare et le cabinet utilisés.

Cette méthode permet d'identifier plus facilement l'origine d'une modification.

Elle évite également de modifier plusieurs paramètres en même temps sans savoir lequel est responsable du résultat obtenu.

---

## 12. Les réglages doivent être considérés comme des systèmes

Un réglage du Brunetti ne doit donc pas être réduit à une simple liste de positions de potentiomètres.

Il correspond à un ensemble cohérent comprenant notamment :

- un canal ;
- des réglages de préamplification ;
- un équilibre tonal ;
- des réglages de voicing ;
- des niveaux ;
- éventuellement des pédales ;
- une guitare ;
- un cabinet ;
- des conditions d'utilisation.

Cette approche sera particulièrement importante lorsque nous commencerons à construire les profils sonores du ToneLab.

---

## 13. À retenir

Les principales interactions à retenir sont les suivantes :

- le choix du canal influence le comportement de tous les réglages associés ;
- Gain et égalisation doivent être considérés ensemble ;
- Bass, Mid et Edge interagissent dans la perception de l'équilibre tonal ;
- les pédales placées avant l'entrée peuvent modifier la réaction du préamplificateur ;
- les effets placés dans la boucle interagissent différemment avec la préamplification ;
- Bass et Depth ne doivent pas être considérés comme deux commandes équivalentes ;
- le niveau de fonctionnement influence la perception du réglage ;
- la guitare et ses micros influencent le signal entrant ;
- le cabinet participe au résultat final.

---

## 14. Conclusion du chapitre Architecture

Les six parties de ce chapitre permettent maintenant de disposer d'une vue cohérente de l'organisation du Brunetti XL R-EVO II.

Nous avons successivement étudié :

1. [l'architecture générale](part1.md) ;
2. [l'architecture des canaux](part2.md) ;
3. [la logique des commandes](part3.md) ;
4. [l'organisation de la chaîne de signal](part4.md) ;
5. [la boucle d'effets](part5.md) ;
6. [les interactions entre les sections](part6.md).

Cette architecture constitue la base technique nécessaire pour aborder les chapitres consacrés aux réglages et à la construction des profils sonores.

La prochaine étape pourra donc quitter progressivement la description de l'amplificateur pour entrer dans son utilisation pratique.

---

## Navigation

[← Partie 5 — Boucle d'effets](part5.md)

[↑ Retour à l'index du chapitre Architecture](index.md)

[→ Retour à l'index Brunetti XL R-EVO II](../index.md)