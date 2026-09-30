# Chapitre 04 - Le pedalboard et ses interactions avec le Brunetti

## Partie 2 - Les pédales de dynamique et de saturation

## Navigation

[Index du chapitre 4](index.md)  
[Partie 1 - Philosophie du pedalboard](part1.md)  
[Partie 3 - Les égaliseurs](part3.md)

---

## Sommaire

1. [Introduction](#1-introduction)
2. [Comprendre dynamique et saturation](#2-comprendre-dynamique-et-saturation)
3. [Le Fender The Pelt](#3-le-fender-the-pelt)
4. [La Tube Screamer Analogman Silver Mod](#4-la-tube-screamer-analogman-silver-mod)
5. [Complémentarité Pelt / Tube Screamer](#5-complémentarité-pelt--tube-screamer)
6. [Interaction avec le préamplificateur du Brunetti](#6-interaction-avec-le-préamplificateur-du-brunetti)
7. [Niveau, impédance et ordre des pédales](#7-niveau-impédance-et-ordre-des-pédales)
8. [Conséquences spectrales et dynamiques](#8-conséquences-spectrales-et-dynamiques)
9. [Applications au rig ToneLab](#9-applications-au-rig-tonelab)
10. [Méthode expérimentale](#10-méthode-expérimentale)
11. [À retenir](#11-à-retenir)

---

## 1. Introduction

Les pédales de saturation occupent une place particulière dans le pedalboard ToneLab, car elles peuvent transformer simultanément le niveau, la dynamique, le spectre, les transitoires et le contenu harmonique du signal.

Deux pédales constituent le cœur de cette partie :

- le **Fender The Pelt**, fuzz à transistors au silicium ;
- la **Tube Screamer modifiée par Analogman avec la Silver Mod**, utilisée dans ToneLab avec un niveau élevé et peu de Drive.

Dans la chaîne de référence, elles sont placées dans cet ordre :

```text
Guitare
   |
   v
Mooer Graphic G
   |
   v
Fender The Pelt
   |
   v
Tube Screamer Analogman Silver Mod
   |
   v
MXR 6 Band EQ
   |
   v
Brunetti XL R-EVO II
```

Cette partie ne cherche donc pas seulement à décrire deux pédales. Elle cherche à comprendre :

- ce que fait réellement chaque commande ;
- comment les deux pédales transforment le signal ;
- pourquoi leur ordre importe ;
- comment elles réagissent avec Clean, Crunch et XLead ;
- comment transformer les observations en expériences reproductibles.

---

## 2. Comprendre dynamique et saturation

### 2.1. Gain et non-linéarité

Dans un système linéaire idéal, augmenter le gain multiplie l'amplitude du signal sans en changer la forme :

```text
y(t) = G x x(t)
```

Une pédale de saturation cesse précisément de se comporter comme un système strictement linéaire lorsque certaines parties du signal sont comprimées ou écrêtées.

Le processus peut être représenté simplement :

```text
Signal guitare
     |
     v
Gain / filtrage
     |
     v
Non-linéarité
     |
     +--> écrêtage
     +--> compression
     +--> nouvelles harmoniques
     +--> transitoires modifiées
     |
     v
Signal saturé
```

### 2.2. Saturation et dynamique

Une saturation peut réduire l'écart entre une attaque faible et une attaque forte. Elle peut donc modifier :

- la sensation sous les doigts ;
- l'attaque du médiator ;
- le sustain apparent ;
- la densité ;
- la lisibilité des accords ;
- la réaction des palm-mutes.

Le résultat final dépend ensuite des autres étages non linéaires de la chaîne, notamment le préamplificateur du Brunetti.

### 2.3. Deux saturations en série

Lorsque The Pelt est suivie de la Tube Screamer, la seconde pédale ne reçoit plus directement le signal de la guitare :

```text
Guitare
   |
   v
The Pelt
   |
   v
Signal déjà saturé
   |
   v
Tube Screamer
   |
   v
Signal à nouveau transformé
```

C'est cette succession de transformations qui rend leur complémentarité plus intéressante qu'une simple addition de quantités de gain.

---

## 3. Le Fender The Pelt

### 3.1. Architecture fonctionnelle

Fender décrit The Pelt comme une fuzz flexible pilotée par des **transistors au silicium**, allant d'un mur de fuzz à un drive plus doux et riche en harmoniques.

La pédale propose :

- **Level** ;
- **Tone** ;
- **Bloom** ;
- **Fuzz** ;
- un commutateur **Thick** ;
- un commutateur **Mid à trois positions**.

Ces commandes ne sont pas de simples variantes d'un même réglage. Elles permettent d'agir sur plusieurs dimensions différentes : quantité de saturation, niveau de sortie, aigus, attaque, médiums et contenu grave.

### 3.2. Fuzz : quantité de saturation

Fender indique que le contrôle **Fuzz** règle le niveau de fuzz et augmente la saturation lorsqu'il est tourné dans le sens horaire.

Il faut le distinguer du Level :

```text
FUZZ
   |
   +--> quantité / intensité de saturation

LEVEL
   |
   +--> niveau de sortie de la pédale
```

Augmenter Fuzz ne revient donc pas simplement à rendre la pédale plus forte.

Dans ToneLab, ce contrôle est à observer sur :

- la densité harmonique ;
- la compression ;
- la définition des accords ;
- la réaction des notes graves ;
- la sensation de sustain.

### 3.3. Level : niveau envoyé à l'étage suivant

**Level** règle le niveau de sortie lorsque la fuzz est engagée.

Dans notre chaîne, l'étage suivant est la Tube Screamer :

```text
The Pelt
[Level]
   |
   v
Tube Screamer
```

Cela signifie qu'un changement de Level peut avoir deux conséquences à distinguer :

1. modifier le volume du signal ;
2. modifier le niveau avec lequel la Tube Screamer est attaquée.

Si la Tube Screamer est active, le Level de The Pelt devient donc une variable d'interaction entre les deux circuits.

### 3.4. Tone : contrôle des hautes fréquences

La documentation Fender est explicite : **Tone contrôle les hautes fréquences présentes dans le signal**.

Fender indique également que :

- en position haute, la plage fréquentielle complète de l'instrument est conservée ;
- en réduisant Tone, les aigus sont adoucis.

On peut donc représenter son rôle ainsi :

```text
Tone élevé
    |
    +--> davantage de contenu aigu conservé

Tone réduit
    |
    +--> aigus adoucis
```

Tone doit être évalué en contexte. Une position adaptée avec The Pelt seule peut ne plus être optimale lorsque la Tube Screamer, le MXR ou un autre canal du Brunetti est ajouté.

### 3.5. Bloom : contrôle de l'attaque

**Bloom est l'une des commandes les plus caractéristiques de The Pelt.**

Fender indique qu'elle contrôle **l'attaque de l'effet de fuzz**.

Son axe est décrit de **Soft** vers **Hard** :

```text
                 BLOOM
                   |
        +----------+----------+
        |                     |
        v                     v
      SOFT                   HARD
        |                     |
        v                     v
attaque plus douce       attaque plus abrupte
et progressive           saturation plus éclatée
```

Fender décrit le côté Soft comme produisant une attaque plus lisse, proche d'une attaque de violon, tandis que le côté Hard produit un caractère plus abrupt et plus "splattered".

Cette commande mérite donc d'être étudiée indépendamment de Fuzz.

Deux réglages produisant une quantité de fuzz proche peuvent présenter des sensations de jeu très différentes selon Bloom.

#### Expériences utiles autour de Bloom

À réglage identique des autres commandes :

- comparer Soft, centre et Hard ;
- jouer des notes isolées ;
- comparer des accords ;
- tester des palm-mutes ;
- écouter la première fraction de seconde de chaque note ;
- observer si l'effet reste aussi perceptible lorsque le Brunetti est déjà saturé.

### 3.6. Thick : laisser passer davantage de grave

Fender précise que le commutateur **Thick laisse davantage de fréquences graves traverser le circuit** afin d'épaissir le son de fuzz.

```text
THICK OFF
    |
    v
référence

THICK ON
    |
    v
davantage de grave traverse le circuit
    |
    v
fuzz potentiellement plus épaisse
```

Le point important pour ToneLab est de ne pas transformer immédiatement cette fonction en jugement de valeur.

Avec le Drop C#, davantage de grave peut :

- apporter la masse recherchée ;
- ou réduire la définition selon les autres réglages.

La question expérimentale devient donc :

> Thick améliore-t-il la masse sans détériorer la lisibilité dans cette configuration précise ?

La documentation publique Fender décrit l'effet général mais ne donne pas, dans la source utilisée ici, de fréquence de coupure précise. ToneLab ne lui attribue donc pas de fréquence arbitraire.

### 3.7. Mid : Cut / Flat / Boost

Le commutateur **Mid** possède trois positions.

Fender indique qu'il agit sur les médiums en permettant de les renforcer ou de les réduire, tandis que la position centrale les laisse inchangés.

```text
                  MID
                   |
          +--------+--------+
          |        |        |
          v        v        v
         CUT      FLAT     BOOST
          |        |        |
          v        v        v
       médiums   médiums   médiums
       réduits   inchangés renforcés
```

Fender associe ce réglage au **punch** et à la **présence**.

Cette commande est particulièrement intéressante au regard d'une observation déjà faite dans ToneLab : The Pelt seule sur Clean peut sembler manquer de présence, alors que l'ajout de la Tube Screamer apporte davantage de présence.

Avant d'attribuer cette différence à une seule cause, il est donc pertinent de comparer :

```text
Pelt seule
Mid CUT / FLAT / BOOST
        |
        v
comparaison
```

puis :

```text
Pelt + Tube Screamer
        |
        v
comparaison
```

La documentation Fender utilisée ici ne fournit pas de fréquence centrale ni de valeur de boost/cut pour Mid. Ces valeurs ne doivent donc pas être inventées.

### 3.8. Interaction entre Bloom, Thick et Mid

Ces trois fonctions travaillent sur des dimensions différentes :

```text
Bloom
  |
  +--> attaque

Thick
  |
  +--> quantité de grave traversant le circuit

Mid
  |
  +--> forme générale des médiums
```

Elles peuvent donc être combinées.

Mais pour comprendre leurs interactions, ToneLab doit d'abord les étudier séparément.

Une expérience pertinente consiste par exemple à fixer Fuzz, Tone et Level, puis à modifier uniquement Mid. On revient ensuite à la référence avant de tester Thick, puis Bloom.

Ce n'est qu'après cette étape que des combinaisons comme **Thick ON + Mid Boost + Bloom Hard** deviennent réellement interprétables.

---

## 4. La Tube Screamer Analogman Silver Mod

### 4.1. Identifier précisément l'objet étudié

La pédale de ToneLab est une **Tube Screamer Maxon modifiée par Analogman avec la Silver Mod**.

Il faut distinguer trois niveaux d'information :

```text
Famille Tube Screamer
        |
        +--> comportement général

Modèle Maxon de base
        |
        +--> caractéristiques du modèle concerné

Analogman Silver Mod
        |
        +--> modifications / intention documentées par Analogman
```

Cette distinction est importante : les affirmations relatives à une TS9 Ibanez standard ne doivent pas être transférées automatiquement à l'exemplaire ToneLab.

### 4.2. Les trois commandes

La Tube Screamer utilisée dans ToneLab expose trois commandes principales :

- **Drive** ;
- **Tone** ;
- **Level**.

Dans l'usage de référence actuellement documenté :

```text
Drive : environ 8 h
Tone  : environ 11 h
Level : environ 14 à 15 h
```

Cette configuration suggère un usage dans lequel la saturation interne n'est pas poussée au maximum et où le niveau de sortie joue un rôle important.

Il ne faut toutefois pas réduire la pédale à un simple "boost de volume" : son circuit transforme également le signal.

### 4.3. Drive

Drive agit sur la contribution de l'overdrive propre à la pédale.

Lorsqu'il est faible, la pédale peut être utilisée principalement pour transformer le signal et augmenter le niveau envoyé à l'étage suivant.

Lorsqu'il augmente, la contribution de sa saturation interne devient plus importante.

Dans ToneLab, il faut donc distinguer :

```text
Drive faible
    |
    +--> faible contribution de saturation interne
    +--> rôle du Level particulièrement important

Drive plus élevé
    |
    +--> contribution plus importante de l'overdrive
```

### 4.4. Tone

Tone contrôle la coloration fréquentielle de la Tube Screamer.

Dans notre chaîne, cette commande reçoit parfois un signal déjà transformé par The Pelt :

```text
The Pelt
   |
   v
Signal riche en harmoniques
   |
   v
Tube Screamer [Tone]
```

Le même réglage de Tone peut donc être perçu différemment selon que The Pelt est active ou non.

### 4.5. Level

Level règle le niveau transmis à l'étage suivant.

Dans la chaîne de référence :

```text
Tube Screamer
   |
   v
MXR 6 Band EQ
   |
   v
Brunetti
```

Avec un Level assez élevé, la pédale peut modifier le niveau présenté au préamplificateur du Brunetti.

Cela doit être distingué du Gain du Brunetti :

```text
Level Tube Screamer
      |
      +--> niveau envoyé au préampli

Gain Brunetti
      |
      +--> comportement du préampli lui-même
```

### 4.6. Ce qu'Analogman documente sur la Silver Mod

Analogman présente la Silver Mod comme une modification ajoutée à sa modification TS-808 / Brown habituelle.

L'objectif annoncé est de conserver le drive et la chaleur d'une Tube Screamer tout en **colorant moins le signal**.

Analogman indique notamment que la Silver Mod présente **moins de bosse dans les médiums qu'une Tube Screamer normale** et décrit le résultat comme plus transparent.

C'est particulièrement important pour ToneLab : la Tube Screamer utilisée ici ne doit donc pas être décrite exactement comme une TS standard dont le caractère serait uniquement une forte accentuation des médiums.

La logique devient plutôt :

```text
Tube Screamer classique
        |
        +--> caractère médium marqué

Silver Mod
        |
        +--> bosse médium moins prononcée
        +--> transformation annoncée comme plus transparente
```

Analogman indique également que la modification utilise plusieurs composants différents, mais la documentation publique consultée ne fournit pas une nomenclature complète permettant de reconstruire précisément notre exemplaire. ToneLab doit donc rester au niveau des modifications explicitement documentées plutôt que d'inventer des valeurs de composants.

### 4.7. Conséquence pour l'utilisation ToneLab

La combinaison actuelle :

```text
Drive bas
Tone modéré
Level élevé
```

est particulièrement intéressante à étudier avec la Silver Mod, car elle permet de rechercher une transformation du signal et une interaction avec l'étage suivant sans chercher nécessairement à produire l'essentiel de la saturation dans la Tube Screamer elle-même.

Il faut toutefois le vérifier expérimentalement avec notre exemplaire plutôt que de transformer ce principe en règle générale.

---

## 5. Complémentarité Pelt / Tube Screamer

### 5.1. Deux fonctions différentes

The Pelt et la Tube Screamer sont toutes deux capables de produire de la saturation, mais leur place dans ToneLab n'est pas identique.

```text
THE PELT
   |
   +--> texture de fuzz
   +--> attaque via Bloom
   +--> médiums via Mid
   +--> grave via Thick

TUBE SCREAMER SILVER MOD
   |
   +--> overdrive
   +--> niveau envoyé en aval
   +--> coloration fréquentielle
   +--> Silver Mod moins marquée dans les médiums qu'une TS normale
```

### 5.2. Pelt puis Tube Screamer

La chaîne de référence est :

```text
The Pelt
   |
   v
Tube Screamer
```

La Tube Screamer traite donc un signal déjà saturé et coloré par The Pelt.

Elle peut alors modifier :

- le niveau transmis au Brunetti ;
- l'équilibre spectral du signal de fuzz ;
- la quantité totale de saturation ;
- la dynamique du signal combiné.

### 5.3. Pourquoi l'ordre compte

L'ordre inverse répondrait à une autre question :

```text
Tube Screamer
   |
   v
The Pelt
```

Dans ce cas, The Pelt recevrait un signal déjà transformé par la Tube Screamer.

Les deux ordres ne doivent donc pas être considérés comme deux façons équivalentes d'obtenir "Pelt + TS".

### 5.4. L'observation de présence

Une observation déjà notée dans ToneLab est que The Pelt seule sur Clean peut sembler manquer de présence, alors que l'activation de la Tube Screamer apporte une présence supplémentaire.

Cette observation doit maintenant être décomposée plutôt que simplement répétée.

Plusieurs variables peuvent être testées :

```text
Pelt seule - Mid FLAT
Pelt seule - Mid BOOST
Pelt seule - variation Tone
Pelt + TS - Level égalisé
Pelt + TS - niveau réel d'usage
```

Le but est de distinguer autant que possible :

- l'effet du commutateur Mid de The Pelt ;
- l'effet de Tone ;
- la coloration de la Silver Mod ;
- l'effet du Level de la Tube Screamer ;
- la réaction du canal du Brunetti au niveau supplémentaire.

---

## 6. Interaction avec le préamplificateur du Brunetti

### 6.1. Le Brunetti est un étage supplémentaire

Le pedalboard ne produit pas un son "terminé" avant d'entrer dans l'ampli.

```text
The Pelt
   |
   v
Tube Screamer
   |
   v
EQ
   |
   v
Préampli Brunetti
```

Le canal sélectionné constitue donc un nouvel étage de transformation.

### 6.2. Clean

Clean est particulièrement utile pour entendre le caractère propre des pédales et comparer :

```text
Brunetti Clean

Pelt -> Clean

TS -> Clean

Pelt -> TS -> Clean
```

Il ne faut cependant pas supposer que le comportement observé sur Clean sera identique sur Crunch ou XLead.

### 6.3. Crunch

Avec Crunch, le signal issu des pédales rencontre un préampli dont le comportement de saturation est déjà plus important.

Il faut alors surveiller :

- l'accumulation de gain ;
- la compression ;
- la lisibilité ;
- la conservation de l'attaque ;
- la manière dont Bloom reste perceptible ou non.

### 6.4. XLead

XLead constitue le contexte où le risque d'accumulation de saturation est le plus évident.

L'objectif ne doit donc pas être automatiquement :

```text
Fuzz + OD + beaucoup de Gain = son plus massif
```

Une approche plus utile consiste à rechercher :

```text
Texture
  +
Attaque
  +
Densité
  +
Définition
  =
Son exploitable
```

La Tube Screamer peut alors être testée comme élément de transformation et de niveau plutôt que comme simple source de gain supplémentaire.

---

## 7. Niveau, impédance et ordre des pédales

### 7.1. Niveau électrique et perception

Une configuration légèrement plus forte peut être perçue comme plus présente ou plus détaillée.

Les comparaisons critiques doivent donc distinguer :

- différence de volume ;
- différence de saturation ;
- différence de dynamique ;
- différence de spectre.

Lorsque l'objectif est de comparer deux timbres, une comparaison à niveau perçu proche peut être utile.

Lorsque l'objectif est au contraire d'étudier l'effet du Level sur le Brunetti, il faut conserver la différence de niveau, puisqu'elle constitue précisément la variable testée.

### 7.2. Impédance

Les pédales présentent une impédance d'entrée et une impédance de sortie. Leur position peut donc avoir des conséquences électriques en plus de leur fonction musicale apparente.

Dans ToneLab, l'impédance doit surtout être considérée comme une variable technique à documenter lorsqu'elle explique un comportement réel. Elle ne doit pas servir à fabriquer une explication sans mesure ou documentation adaptée.

### 7.3. Une chaîne, pas une collection

Le point fondamental reste :

```text
étage A
   |
   v
transforme le signal
   |
   v
étage B reçoit ce nouveau signal
   |
   v
étage C reçoit le résultat de A + B
```

C'est pourquoi l'ordre des pédales est une partie du réglage sonore lui-même.

---

## 8. Conséquences spectrales et dynamiques

### 8.1. Génération d'harmoniques

La saturation modifie la forme du signal et génère de nouvelles composantes harmoniques.

Cela explique pourquoi une correction d'EQ avant la saturation ne produit pas le même résultat qu'une correction après saturation.

Cette question est développée dans la Partie 3 consacrée aux égaliseurs.

### 8.2. Grave et Drop C#

Le Drop C# rend particulièrement importante l'observation du registre grave.

Avec The Pelt, plusieurs paramètres peuvent agir sur sa perception :

- Fuzz ;
- Thick ;
- Tone ;
- Bloom, via la perception de l'attaque ;
- le pré-EQ ;
- la Tube Screamer ;
- le post-EQ ;
- le canal du Brunetti.

Le but n'est donc pas simplement d'avoir "plus de grave", mais de chercher un compromis entre :

```text
Masse
  +
Séparation
  +
Attaque
  +
Lisibilité
```

### 8.3. Attaque et Bloom

Bloom rend particulièrement visible une idée importante : la sensation de précision n'est pas uniquement une question d'EQ.

Une attaque plus progressive ou plus abrupte peut modifier fortement la perception du son sans que l'on ait simplement "ajouté des aigus".

Cette distinction sera utile pour éviter de demander à l'EQ de corriger un problème qui relève en réalité de l'enveloppe ou de la dynamique.

---

## 9. Applications au rig ToneLab

### 9.1. Gibson Les Paul Classic DC

Les essais doivent chercher à conserver le caractère propre de la Gibson plutôt qu'à appliquer automatiquement un réglage conçu pour la Gretsch.

Avec The Pelt, les variables les plus intéressantes à comparer seront notamment :

- Mid ;
- Thick ;
- Bloom ;
- interaction avec la Tube Screamer ;
- réaction des trois canaux du Brunetti.

### 9.2. Gretsch John Gourley Broadkaster

La Gretsch doit également conserver son identité propre.

Avec le Drop C#, l'attention portera notamment sur :

- la tenue du grave ;
- la définition des accords ;
- Thick ON / OFF ;
- la relation Bloom / attaque ;
- le rôle de la Tube Screamer dans la présence et la définition.

### 9.3. Ne pas corriger trop tôt

Si une combinaison semble trop sombre, trop dense ou trop floue, ToneLab doit éviter de modifier immédiatement plusieurs éléments.

La séquence de questionnement peut être :

1. Le problème apparaît-il avec The Pelt seule ?
2. Dépend-il de Mid ?
3. Dépend-il de Thick ?
4. Dépend-il de Bloom ?
5. Apparaît-il seulement lorsque la Tube Screamer est activée ?
6. Est-il lié au niveau transmis au Brunetti ?
7. Faut-il finalement intervenir avec le pré-EQ ou le post-EQ ?

Cette approche permet de chercher la cause avant la correction.

---

## 10. Méthode expérimentale

### 10.1. Construire une référence

Commencer par une configuration clairement identifiée :

```text
Guitare
   |
   v
Brunetti
```

Puis introduire les éléments progressivement.

### 10.2. Étudier The Pelt seule

```text
Guitare
   |
   v
The Pelt
   |
   v
Brunetti
```

Fixer d'abord Fuzz, Tone et Level, puis étudier séparément :

1. Bloom ;
2. Mid ;
3. Thick.

Ensuite seulement, tester leurs interactions.

### 10.3. Étudier la Tube Screamer seule

```text
Guitare
   |
   v
Tube Screamer
   |
   v
Brunetti
```

Comparer au minimum :

- réglage de référence ToneLab ;
- Level ramené vers l'unité ;
- variation du Drive ;
- variation du Tone.

Le but est de distinguer la contribution de la pédale de l'effet du simple changement de niveau.

### 10.4. Combiner Pelt et Tube Screamer

```text
Guitare
   |
   v
The Pelt
   |
   v
Tube Screamer
   |
   v
Brunetti
```

Comparer :

- Pelt seule ;
- TS seule ;
- Pelt + TS ;
- si l'expérience le justifie, ordre inverse.

### 10.5. Documenter le test

Les données détaillées peuvent être conservées dans ToneLab Profiles et les exports de tests.

Une expérience utile doit conserver au minimum :

```text
Guitare :
Micro :
Accordage :

Canal Brunetti :
Gain :
Bass :
Mid :
Edge :
Master :
Bright / Focus :

The Pelt :
Level :
Tone :
Bloom :
Fuzz :
Mid : CUT / FLAT / BOOST
Thick : OFF / ON

Tube Screamer :
Drive :
Tone :
Level :

EQ actifs :
Baffle :
Niveau de test :

Observation :
Interprétation :
Décision :
```

La documentation Markdown conserve ensuite les principes, les résultats reproductibles et les conclusions suffisamment solides pour être utiles au reste de ToneLab.

---

## 11. À retenir

The Pelt et la Tube Screamer Silver Mod ne doivent pas être réduites à deux quantités de saturation mises en série.

The Pelt possède plusieurs leviers distincts :

```text
Fuzz  -> quantité de saturation
Level -> niveau de sortie
Tone  -> hautes fréquences
Bloom -> attaque Soft <-> Hard
Mid   -> Cut / Flat / Boost des médiums
Thick -> davantage de grave dans le circuit
```

La Silver Mod documentée par Analogman vise de son côté une Tube Screamer moins colorée et présentant une bosse dans les médiums moins prononcée qu'une Tube Screamer normale.

Dans la chaîne ToneLab :

```text
Guitare
   |
   v
PRE-EQ
   |
   v
THE PELT
texture / attaque / médiums / grave
   |
   v
TUBE SCREAMER SILVER MOD
transformation / niveau / overdrive
   |
   v
POST-EQ
   |
   v
BRUNETTI
```

L'objectif n'est donc pas de chercher le maximum de gain, mais de comprendre comment répartir les transformations pour obtenir un son massif, défini et reproductible.

---

## Sources techniques

- Fender, **The Pelt** : manuel constructeur. Il documente les transistors au silicium et les fonctions de Level, Tone, Bloom, Fuzz, Thick et du commutateur Mid trois positions.
- Analogman, **Tube Screamer Silver Mod** : documentation officielle de la modification. Analogman la décrit comme plus transparente et présentant moins de bosse dans les médiums qu'une Tube Screamer normale.
- Maxon, **OD9** : documentation constructeur utilisée comme référence générale pour les commandes Drive, Tone et Level et le comportement du modèle de base lorsque cela correspond à l'exemplaire concerné.

---

## Navigation

[Index du chapitre 4](index.md)  
[Partie 1 - Philosophie du pedalboard](part1.md)  
[Partie 3 - Les égaliseurs](part3.md)
