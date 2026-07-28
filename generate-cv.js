const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration des couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Questions pour l'utilisateur
const questions = [
  { name: 'jsonPath', message: 'Chemin vers ton fichier JSON existant (ou appuie sur Entrée pour le coller directement) : ' },
  { name: 'primaryColor', message: 'Couleur principale de ton CV (ex: #0066cc ou "blue") : ', default: '#1e40af' },
  { name: 'photoUrl', message: 'Lien vers ta photo d\'identité (URL ou chemin relatif) : ' },
  { name: 'outputDir', message: 'Dossier de sortie pour le template (ex: "mon-cv") : ', default: 'mon-cv' }
];

// Traduction des clés anglaises vers le français
const translations = {
  name: 'nom',
  firstName: 'prénom',
  lastName: 'nom',
  job: 'poste',
  title: 'titre',
  summary: 'résumé',
  experiences: 'expériences',
  skills: 'compétences',
  education: 'formation',
  contact: 'contact',
  email: 'email',
  phone: 'téléphone',
  github: 'github',
  linkedin: 'linkedin',
  website: 'site_web',
  description: 'description',
  date: 'date',
  company: 'entreprise',
  school: 'école',
  degree: 'diplôme',
  icon: 'icône',
  logo: 'logo',
  activity: 'activité',
  associations: 'associations',
  image: 'image',
  url: 'lien',
  location: 'lieu',
  city: 'ville',
  countryCode: 'pays',
  postalCode: 'code_postal',
  region: 'région',
  work: 'expériences',
  volunteer: 'associations',
  certificates: 'certifications',
  projects: 'projets',
  languages: 'langues',
  interests: 'centres_d_interêt',
  basics: 'basics',
  label: 'poste',
  startDate: 'date_debut',
  endDate: 'date_fin',
  position: 'poste',
  highlights: 'réalisations',
  responsibilities: 'responsabilités',
  achievements: 'réalisations',
  skills: 'compétences',
  keyword: 'mots_clés',
  level: 'niveau',
  fluency: 'niveau'
};

// Fonction pour traduire les clés d'un objet
function translateKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(translateKeys);
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const translatedKey = translations[key] || key;
      newObj[translatedKey] = translateKeys(value);
    }
    return newObj;
  }
  return obj;
}

// Fonction pour générer le template
function generateTemplate(data, primaryColor, photoUrl, outputDir) {
  // S'assurer que le dossier de sortie existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Sauvegarder le JSON (sans traduction, on garde les clés originales)
  const jsonOutput = {
    nom: data.nom || data.prénom || data.firstName || 'Nom Inconnu',
    poste: data.poste || data.label || data.job || 'Poste non spécifié',
    résumé: data.résumé || data.summary || '',
    photo: photoUrl || data.photo || data.image || '',
    couleur_primaire: primaryColor || '#1e40af',
    expériences: data.expériences || data.work || [],
    compétences: data.compétences || data.skills || [],
    formation: data.formation || data.education || [],
    associations: data.associations || data.volunteer || [],
    contact: data.contact || {},
    certifications: data.certifications || data.certificates || [],
    projets: data.projets || data.projects || [],
    langues: data.langues || data.languages || [],
    centres_d_interêt: data.centres_d_interêt || data.interests || []
  };

  fs.writeFileSync(path.join(outputDir, 'data.json'), JSON.stringify(jsonOutput, null, 2));

  // 2. Copier les fichiers statiques (index.html, style.css, script.js)
  const staticFiles = ['index.html', 'style.css', 'script.js'];
  
  staticFiles.forEach(file => {
    const sourcePath = path.join(__dirname, 'basile-cv', file);
    const destPath = path.join(outputDir, file);
    
    if (fs.existsSync(sourcePath)) {
      // Lire le fichier source
      let content = fs.readFileSync(sourcePath, 'utf8');
      
      // Remplacer la couleur primaire dans le CSS
      if (file === 'style.css' && primaryColor && primaryColor !== '#1e40af') {
        content = content.replace(/#1e40af/g, primaryColor);
        // Calculer les variantes
        const primaryDark = adjustColor(primaryColor, -30);
        const primaryLight = adjustColor(primaryColor, 30);
        content = content.replace(/#1a368f/g, primaryDark);
        content = content.replace(/#3b61d7/g, primaryLight);
      }
      
      // Remplacer les informations dans l'index.html
      if (file === 'index.html') {
        if (jsonOutput.nom) {
          content = content.replace(/Basile Malin/g, jsonOutput.nom);
        }
        if (jsonOutput.poste) {
          content = content.replace(/Développeur Fullstack Junior/g, jsonOutput.poste);
        }
        if (jsonOutput.résumé) {
          const oldSummary = 'Développeur Fullstack Junior, passionné par les technologies web et les applications innovantes. Spécialisé dans les applications web modernes avec PHP et Symfony, je suis toujours à la recherche de nouveaux défis pour enrichir mes compétences. Je travaille principalement entre Laval et Rennes.';
          content = content.replace(oldSummary, jsonOutput.résumé);
        }
        if (jsonOutput.photo) {
          content = content.replace(/2026-04-19-175126\.jpg/g, jsonOutput.photo);
        }
        if (jsonOutput.contact.email) {
          content = content.replace(/basilemalin@gmx\.fr/g, jsonOutput.contact.email);
        }
        if (jsonOutput.contact.téléphone) {
          content = content.replace(/\+33 6 88 67 69 46/g, jsonOutput.contact.téléphone);
        }
        if (jsonOutput.contact.localisation) {
          content = content.replace(/Balazé, Ille-et-Vilaine \(35\)/g, jsonOutput.contact.localisation);
        }
      }
      
      fs.writeFileSync(destPath, content);
    } else {
      console.warn(colors.yellow + '⚠️  Fichier source non trouvé: ' + file + colors.reset);
    }
  });

  console.log(colors.green + '\n✅ Template généré avec succès !' + colors.reset);
  console.log('');
  console.log(colors.cyan + '📁 Dossier de sortie :' + colors.reset + ' ' + colors.bright + '"' + outputDir + '"' + colors.reset);
  console.log('');
  console.log(colors.cyan + '📄 Fichiers générés :' + colors.reset);
  console.log('   - index.html');
  console.log('   - style.css');
  console.log('   - script.js');
  console.log('   - data.json');
  console.log('');
  console.log(colors.cyan + '🚀 Pour tester :' + colors.reset);
  console.log('   1. Ouvre "' + outputDir + '/index.html" dans ton navigateur');
  console.log('   2. Ou héberge le dossier sur GitHub Pages');
  console.log('');
  console.log(colors.yellow + '💡 Astuce :' + colors.reset + ' Utilise un serveur local (ex: python -m http.server) pour éviter les problèmes CORS');
}

// Fonction pour ajuster la couleur
function adjustColor(color, amount) {
  if (!color || !color.startsWith('#') || color.length !== 7) {
    return color;
  }
  
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Fonction pour poser les questions
function askQuestions(index = 0, answers = {}) {
  if (index >= questions.length) {
    const outputDir = answers.outputDir || questions.find(q => q.name === 'outputDir').default;
    const primaryColor = answers.primaryColor || questions.find(q => q.name === 'primaryColor').default;
    const photoUrl = answers.photoUrl || '';
    generateTemplate(answers.jsonData || {}, primaryColor, photoUrl, outputDir);
    return;
  }

  const question = questions[index];
  readline.question(question.message, (answer) => {
    if (answer.trim() === '' && question.default) {
      answer = question.default;
    }
    answers[question.name] = answer;

    if (question.name === 'jsonPath' && answer && !answer.includes('{') && fs.existsSync(answer)) {
      try {
        const jsonContent = fs.readFileSync(answer, 'utf8');
        answers.jsonData = translateKeys(JSON.parse(jsonContent));
        askQuestions(index + 1, answers);
      } catch (error) {
        console.error(colors.red + '\n❌ Erreur :' + colors.reset + ' Impossible de lire le fichier JSON');
        console.error(error.message);
        process.exit(1);
      }
    } else if (question.name === 'jsonPath' && answer.includes('{')) {
      try {
        answers.jsonData = translateKeys(JSON.parse(answer));
        askQuestions(index + 1, answers);
      } catch (error) {
        console.error(colors.red + '\n❌ Erreur :' + colors.reset + ' JSON invalide');
        console.error(error.message);
        process.exit(1);
      }
    } else {
      askQuestions(index + 1, answers);
    }
  });
}

// Démarrer
console.log(colors.cyan + '\n🚀 Générateur de CV Professionnel' + colors.reset);
console.log(colors.dim + '----------------------------' + colors.reset);
console.log(colors.yellow + 'Ce script va générer un CV moderne et professionnel à partir de vos données JSON.' + colors.reset);
console.log('');

askQuestions();
