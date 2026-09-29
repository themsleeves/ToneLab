# Chapitre 04 - Le pedalboard et ses interactions avec le Brunetti

## Partie 3 - Les egaliseurs

## Navigation

[Index du chapitre 4](index.md)  
[Partie 2 - Pedales de dynamique et de saturation](part2.md)  
[Partie 4 - Modulation](part4.md)

---

## Sommaire

1. [Introduction](#1-introduction)
2. [Comprendre le role d'un egaliseur](#2-comprendre-le-role-dun-egaliseur)
3. [Le Mooer Graphic G](#3-le-mooer-graphic-g)
4. [Le MXR 6 Band EQ](#4-le-mxr-6-band-eq)
5. [Pourquoi utiliser deux egaliseurs](#5-pourquoi-utiliser-deux-egaliseurs)
6. [Pre-EQ : egaliser avant la saturation](#6-pre-eq--egaliser-avant-la-saturation)
7. [Post-EQ : egaliser apres la saturation](#7-post-eq--egaliser-apres-la-saturation)
8. [Interaction avec le Brunetti](#8-interaction-avec-le-brunetti)
9. [Applications dans ToneLab](#9-applications-dans-tonelab)
10. [Methode experimentale](#10-methode-experimentale)
11. [A retenir](#11-a-retenir)

---

## 1. Introduction

Les egaliseurs occupent une position particuliere dans le pedalboard ToneLab.

Contrairement a une fuzz, une overdrive, un tremolo ou une reverb, leur fonction premiere n'est pas de produire un effet immediatement identifiable. Ils permettent de modifier l'equilibre frequentiel du signal et, selon leur emplacement dans la chaine, d'influencer la maniere dont les autres etages vont reagir.

Deux egaliseurs sont actuellement presents dans le pedalboard :

- le Mooer Graphic G ;
- le MXR 6 Band EQ.

Leur presence ne doit pas etre comprise comme une duplication de la meme fonction. Ils sont places a deux endroits differents :

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

Le Mooer agit donc avant les principaux etages de saturation, tandis que le MXR agit sur le signal qui en ressort.

Cette distinction constitue le point central de cette partie.

L'objectif n'est pas de definir des courbes d'egalisation universelles, mais de comprendre comment le placement des deux EQ permet d'agir sur des etapes differentes de la construction du son.

---

## 2. Comprendre le role d'un egaliseur

### 2.1. Modifier l'equilibre frequentiel

Un egaliseur permet d'augmenter ou d'attenuer certaines zones du spectre.

Dans un egaliseur graphique, plusieurs bandes sont accessibles independamment. Chaque curseur agit autour d'une zone frequentielle determinee par la conception de la pedale.

Le principe peut etre represente simplement :

```text
Signal d'entree
      |
      v
 Egalisation
      |
      +--> certaines zones attenuees
      |
      +--> certaines zones renforcees
      |
      v
Signal reequilibre
```

Un egaliseur ne doit donc pas etre considere uniquement comme un outil permettant d'ajouter des graves, des mediums ou des aigus.

Dans un pedalboard comportant des etages non lineaires, il peut egalement modifier le signal que ces etages vont recevoir.

### 2.2. Boost et attenuation

Lorsque l'on augmente une bande, davantage de cette zone frequentielle est presente dans le signal transmis a l'etage suivant.

```text
Bande renforcee
      |
      v
Davantage de cette zone
transmise a l'etage suivant
```

Lorsqu'on la reduit :

```text
Bande attenuee
      |
      v
Moins de cette zone
transmise a l'etage suivant
```

La consequence depend donc fortement de ce que l'on trouve apres l'EQ.

### 2.3. Le placement change la fonction

Cette distinction est fondamentale :

```text
EQ
 |
 v
Saturation
```

ne remplit pas exactement la meme fonction que :

```text
Saturation
    |
    v
   EQ
```

Dans le premier cas, l'EQ modifie le signal qui va entrer dans l'etage de saturation.

Dans le second, l'EQ modifie un signal dont le contenu harmonique et la dynamique ont deja ete transformes.

C'est cette difference qui justifie l'etude separee du Mooer Graphic G et du MXR 6 Band EQ.

---

## 3. Le Mooer Graphic G

### 3.1. Fonction generale

Le Mooer Graphic G est un egaliseur graphique cinq bandes avec controle general de niveau.

Dans le pedalboard ToneLab, il est place avant le Fender The Pelt :

```text
Guitare
   |
   v
Mooer Graphic G
   |
   v
Fender The Pelt
```

Cette position lui donne principalement un role de **pre-EQ**.

Il peut modifier le signal provenant de la guitare avant que celui-ci ne rencontre les principaux etages de saturation.

### 3.2. Bandes disponibles

Les cinq centres de frequence du Graphic G sont :

- 100 Hz ;
- 250 Hz ;
- 630 Hz ;
- 1,6 kHz ;
- 4 kHz.

Chaque bande permet une correction allant jusqu'a +/-18 dB. La pedale dispose egalement d'un controle de niveau general.

On peut visualiser la repartition des bandes ainsi :

```text
100 Hz   250 Hz   630 Hz   1.6 kHz   4 kHz
  |         |        |         |        |
  +---------+--------+---------+--------+
              spectre guitare
```

Cette representation sert uniquement a visualiser l'ordre des frequences. Elle ne doit pas etre interpretee comme une separation stricte entre graves, mediums et aigus.

### 3.3. Role dans ToneLab

Le Graphic G peut etre utilise pour preparer le signal avant saturation.

Il peut notamment servir a experimenter :

- l'influence du grave envoye dans la fuzz ;
- l'influence des bas-mediums sur la densite ;
- la reaction des saturations aux mediums ;
- la perception des attaques ;
- l'adaptation ponctuelle d'une guitare ou d'un accordage a un profil donne.

Son utilisation ne doit cependant pas devenir automatique.

L'objectif n'est pas de corriger systematiquement la personnalite de la guitare, mais d'utiliser l'EQ lorsqu'un besoin sonore a ete identifie.

---

## 4. Le MXR 6 Band EQ

### 4.1. Fonction generale

Le MXR 6 Band EQ est place apres le Fender The Pelt et la Tube Screamer Analogman Silver Mod.

```text
The Pelt
   |
   v
Tube Screamer
   |
   v
MXR 6 Band EQ
   |
   v
Brunetti
```

Il recoit donc un signal qui peut deja avoir subi :

- de l'ecretage ;
- de la compression ;
- une modification du contenu harmonique ;
- une modification de la dynamique ;
- une coloration frequentielle.

Son role est ainsi different de celui du Graphic G.

### 4.2. Bandes disponibles

Les six bandes du MXR sont :

- 100 Hz ;
- 200 Hz ;
- 400 Hz ;
- 800 Hz ;
- 1,6 kHz ;
- 3,2 kHz.

Chaque curseur permet une correction allant jusqu'a +/-18 dB.

```text
100    200    400    800    1.6k    3.2k
 |      |      |      |       |       |
 +------+------+------+-------+-------+
            six bandes de correction
```

Il est important de conserver les frequences reelles du modele utilise dans ToneLab et de ne pas leur substituer celles d'un autre egaliseur.

### 4.3. Role dans ToneLab

Dans sa position actuelle, le MXR intervient principalement comme **post-EQ par rapport aux pedales de saturation**.

Cela signifie qu'il ne change pas ce que The Pelt et la Tube Screamer ont deja fait au signal.

Il permet en revanche de remodeler le signal resultant avant son entree dans le Brunetti.

Il peut donc etre utilise pour observer l'influence de differentes zones sur :

- la densite generale ;
- la lisibilite ;
- la presence ;
- le comportement des attaques ;
- l'equilibre du grave et des bas-mediums ;
- l'integration du son dans le contexte musical.

---

## 5. Pourquoi utiliser deux egaliseurs

La presence de deux egaliseurs devient coherente lorsqu'on considere leur emplacement plutot que leur seule fonction apparente.

```text
              PRE-EQ
                 |
                 v
Guitare -> Graphic G
                 |
                 v
              The Pelt
                 |
                 v
           Tube Screamer
                 |
                 v
           MXR 6 Band EQ
                 |
                 v
              POST-EQ
                 |
                 v
              Brunetti
```

Le premier agit sur **ce qui va etre sature**.

Le second agit sur **le resultat des saturations avant son entree dans le Brunetti**.

On peut resumer leur fonction de travail ainsi :

```text
Graphic G
   |
   v
PREPARER le signal
   |
   v
Saturations
   |
   v
MXR 6 Band
   |
   v
SCULPTER le resultat
```

Cette distinction ne signifie pas que chaque EQ doit toujours etre actif.

Une configuration peut utiliser :

- aucun EQ ;
- uniquement le Graphic G ;
- uniquement le MXR ;
- les deux simultanement.

Le choix depend du profil et du probleme que l'on cherche a resoudre.

---

## 6. Pre-EQ : egaliser avant la saturation

### 6.1. Principe

Le Graphic G est place avant The Pelt.

Lorsqu'une bande est modifiee, la fuzz recoit donc un signal different.

```text
Signal guitare
     |
     v
Graphic G
     |
     v
Spectre modifie
     |
     v
The Pelt
     |
     v
Signal sature
```

Le pre-EQ ne consiste donc pas uniquement a modifier le timbre entendu avant la fuzz.

Il peut modifier la maniere dont les differentes composantes du signal participent a la transformation non lineaire.

### 6.2. Exemple conceptuel sur le grave

Prenons volontairement une seule bande comme variable d'experience : 100 Hz.

Reference :

```text
Graphic G : 100 Hz a 0
        |
        v
The Pelt
```

Comparaison :

```text
Graphic G : 100 Hz attenue
        |
        v
The Pelt
```

Il faut ensuite observer le resultat sans supposer a l'avance qu'il sera meilleur.

Les criteres peuvent etre :

- definition des notes graves ;
- comportement des palm-mutes ;
- densite ;
- attaque ;
- lisibilite des accords ;
- sensation de compression.

### 6.3. Application au Drop C#

L'accordage en Drop C# constitue un contexte particulierement interessant pour le pre-EQ.

Le but n'est pas de partir du principe qu'il faut automatiquement reduire le grave.

Il faut plutot determiner si le contenu transmis aux saturations permet d'obtenir le compromis recherche entre :

```text
Masse
  +
Definition
  +
Attaque
  +
Lisibilite
```

Une correction ne doit etre conservee que si elle produit un resultat utile avec le rig reel.

### 6.4. Adapter sans uniformiser les guitares

Le Graphic G peut egalement servir a adapter ponctuellement le signal provenant des deux guitares principales de ToneLab.

Mais l'objectif n'est pas :

```text
Gretsch -> faire ressembler a la Gibson
```

ou :

```text
Gibson -> faire ressembler a la Gretsch
```

Il est preferable de conserver leur identite et d'utiliser le pre-EQ pour atteindre un objectif sonore determine lorsque cela est necessaire.

---

## 7. Post-EQ : egaliser apres la saturation

### 7.1. Principe

Le MXR est place apres The Pelt et la Tube Screamer.

```text
The Pelt
   |
   v
Tube Screamer
   |
   v
Signal sature
   |
   v
MXR 6 Band EQ
   |
   v
Brunetti
```

Il travaille donc sur un signal dont le spectre et la dynamique ont deja ete profondement modifies.

Une correction appliquee ici ne peut pas annuler la transformation produite en amont.

Elle permet en revanche de modifier l'equilibre du signal qui sera presente au preamplificateur du Brunetti.

### 7.2. Zones d'observation du MXR

Les bandes du MXR constituent autant de variables experimentales.

#### 100 Hz

Observer principalement l'influence sur le bas du spectre, la masse et la tenue des notes graves.

#### 200 Hz

Observer l'influence sur la densite du grave et du bas-medium ainsi que sur la lisibilite lorsque le son est deja tres dense.

#### 400 Hz

Observer les modifications de densite et de lisibilite dans le registre medium inferieur.

#### 800 Hz

Observer les changements de caractere dans les mediums et leur influence sur la perception du son dans un mix.

#### 1,6 kHz

Observer notamment l'influence sur la presence, la definition et la perception des attaques.

#### 3,2 kHz

Observer l'influence sur la definition, le tranchant et une eventuelle agressivite des attaques.

Ces descriptions constituent des **zones d'observation**, et non des conclusions definitives.

La reaction reelle dependra de la guitare, des saturations actives, du canal du Brunetti, du baffle et du niveau d'ecoute.

---

## 8. Interaction avec le Brunetti

### 8.1. Le MXR reste avant le preamplificateur

L'expression "post-EQ" utilisee dans cette partie signifie **apres les pedales de saturation**.

Elle ne signifie pas "apres l'amplificateur".

Dans l'architecture actuelle :

```text
Graphic G
   |
   v
Saturations
   |
   v
MXR
   |
   v
PREAMPLIFICATEUR BRUNETTI
```

Le MXR modifie donc encore le signal qui va attaquer le preamplificateur.

Le resultat dependra du canal selectionne.

### 8.2. Clean

Sur Clean, les EQ peuvent etre etudies avec une contribution plus faible de la saturation du preamplificateur.

Ce contexte peut etre utile pour isoler plus clairement :

- le caractere des guitares ;
- l'action du Graphic G ;
- l'action de The Pelt ;
- l'action de la Tube Screamer ;
- l'action du MXR.

### 8.3. Crunch

Sur Crunch, le signal egalise rencontre un preamplificateur dont le fonctionnement est deja plus marque par le gain.

La question devient alors :

> Comment le pre-EQ, les saturations et le post-EQ interagissent-ils avec le caractere propre du canal Crunch ?

Il faudra notamment observer si les corrections conservent la dynamique et la lisibilite recherchees.

### 8.4. XLead

Sur XLead, l'accumulation possible des saturations devient particulierement importante.

Le but n'est pas necessairement d'ajouter davantage de gain.

Les EQ peuvent devenir des outils permettant d'etudier :

- la precision du grave ;
- la definition des attaques ;
- la presence ;
- la densite ;
- la lisibilite des accords ;
- le comportement du Drop C#.

Pour les profils modernes recherches dans ToneLab, le critere reste musical : obtenir un son massif tout en conservant suffisamment de definition pour fonctionner dans le groupe.

### 8.5. Une autre position experimentale possible pour le MXR

Le MXR 6 Band EQ peut egalement etre utilise dans une boucle d'effets d'amplificateur.

Cette possibilite ouvre une experience differente de sa position actuelle :

```text
CONFIGURATION A

MXR
 |
 v
Entree Brunetti
```

contre :

```text
CONFIGURATION B

Preampli Brunetti
       |
       v
Boucle FX -> MXR
       |
       v
Suite de l'amplification
```

Ces deux positions ne doivent pas etre considerees comme equivalentes.

ToneLab pourra les comparer si un besoin sonore precis justifie cette experimentation. La configuration de reference reste toutefois celle documentee dans le pedalboard actuel.

---

## 9. Applications dans ToneLab

### 9.1. Corriger un probleme, pas une theorie

L'egalisation doit partir d'une observation.

Exemple :

```text
Observation
    |
    v
Le grave perd en definition
avec cette combinaison
    |
    v
Hypothese
    |
    v
Tester une modification ciblee
    |
    v
Comparer
```

Il faut eviter la demarche inverse : appliquer une correction simplement parce qu'une recette generale affirme qu'une guitare accordee bas devrait etre egalisee d'une certaine maniere.

### 9.2. Conserver l'identite des guitares

Les deux guitares principales doivent pouvoir conserver leurs differences.

```text
Gibson Les Paul Classic DC
          |
          +--> identite propre

Gretsch John Gourley Broadkaster
          |
          +--> identite propre
```

L'EQ devient un moyen d'adaptation, pas un outil d'uniformisation.

### 9.3. Construire un son massif mais lisible

Pour les sons lourds, plusieurs objectifs peuvent entrer en tension :

```text
Masse <----------> Definition

Densite <--------> Dynamique

Grave <----------> Lisibilite
```

L'interet des deux EQ est de pouvoir agir a deux moments differents du processus sans supposer qu'une seule courbe pourra resoudre tous les problemes.

### 9.4. Quelques questions utiles

Lorsqu'une correction semble necessaire, ToneLab peut poser successivement les questions suivantes :

1. Le probleme existe-t-il deja avec la guitare branchee directement dans le Brunetti ?
2. Apparait-il lorsque The Pelt est activee ?
3. Apparait-il lorsque la Tube Screamer est ajoutee ?
4. Faut-il agir avant la saturation ou sur son resultat ?
5. La correction fonctionne-t-elle toujours au niveau sonore utilise en repetition ?
6. Fonctionne-t-elle avec le baffle et le canal concernes ?
7. Le resultat reste-t-il interessant dans le contexte du groupe ?

Ces questions permettent de choisir l'EQ en fonction de sa position et non simplement en fonction du nombre de bandes disponibles.

---

## 10. Methode experimentale

### 10.1. Commencer a plat

La position de reference doit etre simple :

```text
Graphic G : toutes les bandes a 0
MXR       : toutes les bandes a 0
```

Cette reference permet de comparer les modifications suivantes.

### 10.2. Tester le pre-EQ seul

```text
Graphic G : une seule bande modifiee
MXR       : plat
```

Conserver :

- la meme guitare ;
- le meme micro ;
- le meme passage joue ;
- les memes saturations ;
- le meme canal ;
- les memes commandes du Brunetti ;
- le meme baffle ;
- un niveau d'ecoute comparable.

L'objectif est d'observer la consequence de la modification **avant saturation**.

### 10.3. Tester le post-EQ seul

Revenir a la reference puis modifier une bande du MXR :

```text
Graphic G : plat
MXR       : une seule bande modifiee
```

Cela permet d'observer plus clairement l'action de l'EQ sur le signal deja transforme par les saturations.

### 10.4. Comparer pre-EQ et post-EQ

Une experience importante consiste a comparer une correction dans une zone proche avant et apres les saturations.

Par exemple :

```text
TEST A
Graphic G modifie
      |
      v
Saturations
      |
      v
MXR a plat
```

puis :

```text
TEST B
Graphic G a plat
      |
      v
Saturations
      |
      v
MXR modifie
```

Les frequences disponibles n'etant pas identiques entre les deux pedales, cette comparaison ne constitue pas necessairement une comparaison mathematique exacte.

Elle permet cependant d'etudier la difference fonctionnelle entre une correction appliquee avant et apres les saturations.

### 10.5. Combiner les deux EQ

Ce n'est qu'apres avoir compris leur effet separement qu'il devient pertinent de construire une combinaison :

```text
Graphic G
   |
   v
Saturations
   |
   v
MXR
```

L'objectif doit rester identifiable.

Par exemple :

```text
Graphic G
   |
   +--> preparer le signal pour la fuzz

MXR
   |
   +--> ajuster le resultat avant le Brunetti
```

### 10.6. Documenter le resultat

Lorsqu'une combinaison semble interessante, les informations suivantes doivent etre conservees :

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

Graphic G :
100 Hz :
250 Hz :
630 Hz :
1.6 kHz :
4 kHz :
Level :

The Pelt :
Reglages :

Tube Screamer :
Reglages :

MXR 6 Band :
100 Hz :
200 Hz :
400 Hz :
800 Hz :
1.6 kHz :
3.2 kHz :

Baffle :
Niveau de test :

Observation :
Interpretation :
Decision :
```

La documentation Markdown n'a pas vocation a conserver chaque essai intermediaire.

Les tests detailles peuvent rester dans les outils de suivi prevus a cet effet. La documentation doit surtout conserver les connaissances acquises, les comportements reproductibles et les configurations retenues.

---

## 11. A retenir

Les deux egaliseurs du pedalboard ToneLab ne remplissent pas exactement la meme fonction.

Le Mooer Graphic G est place avant The Pelt et agit principalement comme pre-EQ.

Le MXR 6 Band EQ est place apres The Pelt et la Tube Screamer et agit principalement comme post-EQ par rapport a ces saturations.

La logique generale peut etre resumee ainsi :

```text
Guitare
   |
   v
Mooer Graphic G
   |
   v
PREPARER
le signal
   |
   v
The Pelt
   |
   v
Tube Screamer
   |
   v
MXR 6 Band EQ
   |
   v
SCULPTER
le signal resultant
   |
   v
Brunetti
```

Le premier EQ participe donc a determiner **ce qui entre dans les saturations**.

Le second participe a determiner **l'equilibre du signal qui en ressort avant son entree dans le Brunetti**.

Cette architecture permet d'experimenter avec davantage de precision sans imposer de correction permanente a la guitare ou au profil sonore.

Dans ToneLab, une egalisation ne devra donc pas etre retenue parce qu'elle correspond a une recette theorique, mais parce qu'elle repond a un besoin identifie et produit un resultat reproductible avec le rig reel.

---

## Navigation

[Index du chapitre 4](index.md)  
[Partie 2 - Pedales de dynamique et de saturation](part2.md)  
[Partie 4 - Modulation](part4.md)
