# 📄 CV Basile Malin - Portfolio Professionnel

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)]
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)]

---

## 👋 À propos

Ce dépôt contient mon **CV interactif et professionnel** au format web, conçu pour mettre en valeur mes compétences, expériences et réalisations en tant que **Développeur Fullstack Junior**. 

Le CV est entièrement **responsive**, **imprimable** et propose un **mode sombre** pour une lecture confortable.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---------------|-------------|
| 🎨 **Design Moderne** | Mise en page professionnelle avec gradient et animations subtiles |
| 🌓 **Mode Sombre** | Bouton de bascule pour passer du mode clair au mode sombre |
| 📱 **Responsive** | Adapté aux écrans desktop, tablette et mobile |
| 🖨️ **Impression** | Optimisé pour l'impression PDF avec conservation des couleurs |
| 🌍 **Multilingue** | Contenu entièrement en français |
| 📞 **Liens cliquables** | Emails (`mailto:`), téléphones (`tel:`), adresses (Google Maps) |
| 🔗 **Intégration sociale** | Liens directs vers GitHub, LinkedIn, portfolio |
| ⚡ **Chargement dynamique** | Données chargées depuis un fichier JSON pour une maintenance facile |

---

## 📸 Aperçu

### Interface Principale
- **En-tête** avec photo, nom, poste et résumé
- **Expériences professionnelles** détaillées avec responsabilités, réalisations et technologies utilisées
- **Formation** avec diplômes, écoles et cours suivis
- **Compétences** classées par catégorie avec niveaux (Débutant → Expert)
- **Projets** avec liens vers les démonstrations et code source
- **Certifications** avec organismes émetteurs
- **Expériences associatives** et bénévolat
- **Langues** maîtrisées
- **Centres d'intérêt**
- **Contact** complet avec tous les moyens de me joindre

### Captures d'écran

> *Note: Ajoutez vos captures d'écran dans un dossier `screenshots/` pour illustrer votre CV.*

---

## 🛠 Technologies Utilisées

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure sémantique du document |
| **CSS3** | Styles, animations, responsive design |
| **JavaScript (ES6+)** | Logique d'affichage dynamique, gestion du thème |
| **Font Awesome 6** | Icônes vectorielles |
| **JSON** | Stockage et gestion des données du CV |

---

## 📥 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Node.js (optionnel, pour utiliser le générateur)
- Python ou PHP (pour lancer un serveur local)

### Cloner le dépôt

```bash
git clone https://github.com/Bazmati/basile-malin-cv.git
cd basile-malin-cv
```

---

## 🚀 Utilisation

### Méthode 1 : Utiliser le CV existant (Recommandé)

1. Placez votre photo (`2026-04-19-175126.jpg`) dans le dossier `basile-cv/`
2. Lancez un serveur local :

```bash
cd basile-cv
python3 -m http.server 8000
```

3. Ouvrez votre navigateur à l'adresse :
   
   [https://bazmati.github.io/basile-malin-cv-2026/](https://bazmati.github.io/basile-malin-cv-2026/)

---

### Méthode 2 : Générer un nouveau CV avec vos données

1. Modifiez le fichier `basile-cv/data.json` avec vos informations
2. Ou utilisez le script de génération :

```bash
# À la racine du dépôt
node generate-cv.js
```

3. Répondez aux questions :
   - Chemin vers votre fichier JSON (ou collez-le directement)
   - Couleur principale de votre CV (ex: `#1e40af`)
   - Lien vers votre photo
   - Dossier de sortie

4. Un nouveau dossier sera créé avec votre CV personnalisé

---

## 📝 Structure des Données

Le CV utilise un fichier JSON structuré pour stocker toutes les informations. Voici la structure attendue :

```json
{
  "nom": "Votre Nom",
  "poste": "Votre Poste",
  "résumé": "Une brève description de votre profil",
  "photo": "nom-de-votre-photo.jpg",
  "couleur_primaire": "#1e40af",
  "contact": {
    "email": "votre@email.com",
    "téléphone": "+33 1 23 45 67 89",
    "github": "votre-username",
    "linkedin": "votre-profil",
    "site_web": "https://votre-site.com",
    "localisation": "Ville, Pays"
  },
  "expériences": [
    {
      "titre": "Poste",
      "poste": "Poste occupé",
      "entreprise": "Nom de l'entreprise",
      "date": "Mois Année - Présent",
      "lieu": "Localisation",
      "description": "Description du poste",
      "type_contrat": "CDI/Stage/Intérim",
      "responsabilités": ["Responsabilité 1", "Responsabilité 2"],
      "réalisations": ["Réalisation 1", "Réalisation 2"],
      "technos": ["Technologie 1", "Technologie 2"]
    }
  ],
  "formation": [
    {
      "diplôme": "Nom du diplôme",
      "école": "Nom de l'école",
      "date": "Année de début - Année de fin",
      "lieu": "Localisation"
    }
  ],
  "compétences": [
    {
      "nom": "Compétence",
      "niveau": "Expert/Intermédiaire/Débutant",
      "catégorie": "Backend/Frontend/Design",
      "icône": "nom-de-l-icone",
      "mots_clés": ["mot1", "mot2"]
    }
  ],
  "projets": [],
  "certifications": [],
  "associations": [],
  "langues": [],
  "centres_d_interêt": []
}
```

---

## 🎨 Personnalisation

### Changer la couleur principale

1. Modifiez la variable `--primary-color` dans `basile-cv/style.css`
2. Ou utilisez le générateur avec un code couleur hexadécimal (ex: `#3b82f6`, `#10b981`, `#8b5cf6`)

### Changer la photo

Remplacez simplement le fichier `2026-04-19-175126.jpg` par votre propre photo (même nom de fichier recommandé).

### Modifier les données

Éditez le fichier `basile-cv/data.json` avec vos propres informations.

---

## 📊 Sections Disponibles

| Section | Description | Obligatoire |
|---------|-------------|-------------|
| **En-tête** | Nom, poste, résumé, photo | ✅ |
| **Expériences** | Historique professionnel | ✅ |
| **Formation** | Parcours académique | ✅ |
| **Compétences** | Savoir-faire techniques | ✅ |
| **Projets** | Réalisations personnelles | ❌ |
| **Certifications** | Diplômes et attestations | ❌ |
| **Associations** | Engagement bénévole | ❌ |
| **Langues** | Compétences linguistiques | ❌ |
| **Centres d'intérêt** | Passions personnelles | ❌ |
| **Contact** | Coordonnées | ✅ |

---

## 🌐 Hébergement

### GitHub Pages (Gratuit)

1. Créez un dépôt GitHub avec le nom `username.github.io` (remplacez `username` par votre nom d'utilisateur)
2. Poussez le contenu du dossier `basile-cv/` dans ce dépôt
3. Votre CV sera accessible à : `https://username.github.io/`

### Netlify/Vercel

1. Déposez votre code sur GitHub
2. Connectez votre compte Netlify/Vercel à votre dépôt
3. Déployez en un clic

### Serveur Personnel

Copiez simplement le contenu du dossier `basile-cv/` sur votre serveur web.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce template :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📜 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📬 Contact

**Basile Malin** - Développeur Fullstack Junior

📧 Email : [basilemalin@gmx.fr](mailto:basilemalin@gmx.fr)

📱 Téléphone : [+33 6 88 67 69 46](tel:+33688676946)

🌐 Portfolio : [https://bazmati.github.io/basile-malin-cv/](https://bazmati.github.io/basile-malin-cv/)

💼 LinkedIn : [Profil LinkedIn](https://linkedin.com/in/)

🐙 GitHub : [@Bazmati](https://github.com/Bazmati)

---

## 🙏 Remerciements

- Un grand merci à tous ceux qui ont inspiré ce design
- Merci à la communauté open-source pour les outils utilisés
- Merci à vous de consulter mon travail !

---

*✨ Last update: Juillet 2026 ✨*
