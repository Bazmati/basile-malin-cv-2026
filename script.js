// ===== Icons Mapping =====
const iconMap = {
  javascript: '<i class="fab fa-js-square"></i>',
  react: '<i class="fab fa-react"></i>',
  nodejs: '<i class="fab fa-node-js"></i>',
  git: '<i class="fab fa-git-alt"></i>',
  typescript: '<i class="fab fa-js-square"></i>',
  html5: '<i class="fab fa-html5"></i>',
  css3: '<i class="fab fa-css3-alt"></i>',
  php: '<i class="fab fa-php"></i>',
  mysql: '<i class="fas fa-database"></i>',
  linux: '<i class="fab fa-linux"></i>',
  figma: '<i class="fab fa-figma"></i>',
  github: '<i class="fab fa-github"></i>',
  gitlab: '<i class="fab fa-gitlab"></i>',
  bootstrap: '<i class="fab fa-bootstrap"></i>',
  tailwind: '<i class="fas fa-wind"></i>',
  swift: '<i class="fab fa-swift"></i>',
  android: '<i class="fab fa-android"></i>',
  uml: '<i class="fas fa-project-diagram"></i>',
  symfony: '<i class="fab fa-php"></i>'
};

// ===== Configuration =====
const PRIMARY_COLOR = '#1e40af';
const PHOTO_URL = '2026-04-19-175126.jpg';

// ===== Fonctions utilitaires =====
function formatDate(dateString) {
  if (!dateString) return '';
  
  if (dateString.includes(' ')) {
    return dateString;
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return month + ' ' + year;
}

function formatPeriod(startDate, endDate) {
  const start = formatDate(startDate);
  const end = endDate === 'now' || endDate === 'Présent' || endDate === 'présent' ? 'Présent' : formatDate(endDate);
  
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  
  return start + ' - ' + end;
}

function getIcon(iconName) {
  if (!iconName) return '';
  const icon = iconMap[iconName.toLowerCase()];
  if (icon) return icon;
  return '<i class="fas fa-star"></i>';
}

// ===== Charger le JSON =====
async function loadCV() {
  try {
    const response = await fetch('data.json');
    const cv = await response.json();
    renderCV(cv);
  } catch (error) {
    console.error('Erreur lors du chargement du CV:', error);
  }
}

// ===== Rendre le CV =====
function renderCV(cv) {
  // Photo
  const photoContainer = document.querySelector('.photo-container');
  if (cv.photo) {
    photoContainer.innerHTML = '<img src="' + cv.photo + '" alt="Photo de ' + cv.nom + '" class="profile-pic">';
  }

  // Expériences
  renderExperiences(cv);
  renderFormation(cv);
  renderCompetences(cv);
  renderProjets(cv);
  renderCertifications(cv);
  renderAssociations(cv);
  renderLangues(cv);
  renderCentresInteret(cv);
  renderContact(cv);
}

function renderExperiences(cv) {
  const list = document.getElementById('experiences-list');
  if (!list || !cv.expériences || cv.expériences.length === 0) return;
  
  cv.expériences.forEach(exp => {
    const div = document.createElement('div');
    div.className = 'experience';
    
    const period = formatPeriod(exp.date_debut || exp.startDate, exp.date_fin || exp.endDate || exp.date);
    const title = exp.titre || exp.poste || exp.name || exp.position || '';
    const company = exp.entreprise || exp.company || '';
    const location = exp.lieu || exp.location || '';
    const description = exp.description || exp.summary || '';
    const typeContrat = exp.type_contrat || '';
    
    let html = '<div class="experience-header"><div><div class="experience-title">' + title + '</div><div class="experience-company">' + company + (typeContrat ? ' - ' + typeContrat : '') + '</div></div><div class="experience-date">' + period + '</div></div>';
    
    if (location) {
      html += '<div class="experience-location"><i class="fas fa-map-marker-alt"></i> ' + location + '</div>';
    }
    
    if (description) {
      html += '<p class="experience-description">' + description + '</p>';
    }
    
    // Responsabilités
    if (exp.responsabilités && exp.responsabilités.length > 0) {
      html += '<div class="experience-details"><div class="experience-detail-title"><i class="fas fa-tasks"></i> Responsabilités</div><ul class="experience-detail-list">';
      exp.responsabilités.forEach(resp => {
        html += '<li>' + resp + '</li>';
      });
      html += '</ul></div>';
    }
    
    // Réalisations
    const realisations = exp.réalisations || exp.highlights || [];
    if (realisations.length > 0) {
      html += '<div class="experience-details"><div class="experience-detail-title"><i class="fas fa-trophy"></i> Réalisations</div><ul class="experience-detail-list">';
      realisations.forEach(real => {
        html += '<li>' + real + '</li>';
      });
      html += '</ul></div>';
    }
    
    // Compétences spécifiques
    if (exp.compétences && exp.compétences.length > 0) {
      html += '<div class="experience-details"><div class="experience-detail-title"><i class="fas fa-tools"></i> Compétences</div><ul class="experience-detail-list">';
      exp.compétences.forEach(comp => {
        html += '<li>' + comp + '</li>';
      });
      html += '</ul></div>';
    }
    
    // Technologies
    if (exp.technos && exp.technos.length > 0) {
      html += '<div class="experience-technos">';
      exp.technos.forEach(tech => {
        html += '<span class="tech-tag">' + getIcon(tech) + ' ' + tech + '</span>';
      });
      html += '</div>';
    }
    
    div.innerHTML = html;
    list.appendChild(div);
  });
}

function renderFormation(cv) {
  const list = document.getElementById('formation-list');
  if (!list || !cv.formation || cv.formation.length === 0) return;
  
  cv.formation.forEach(form => {
    const div = document.createElement('div');
    div.className = 'formation-item';
    
    const period = formatPeriod(form.date_debut || form.startDate, form.date_fin || form.endDate || form.date);
    const degree = form.diplôme || form.degree || form.area || '';
    const school = form.école || form.school || '';
    const location = form.lieu || form.location || '';
    const description = form.description || form.summary || '';
    const mention = form.mention || '';
    const moyenne = form.moyenne || form.score || '';
    
    let html = '<div class="formation-header"><div><div class="formation-degree">' + degree + '</div><div class="formation-school">' + school + '</div></div><div class="formation-date">' + period + '</div></div>';
    
    if (location) {
      html += '<div class="formation-location"><i class="fas fa-map-marker-alt"></i> ' + location + '</div>';
    }
    
    if (mention || moyenne) {
      html += '<div class="formation-mention">';
      if (mention) html += '<span>' + mention + (moyenne ? ' - ' : '') + '</span>';
      if (moyenne) html += '<span>Moyenne: ' + moyenne + '</span>';
      html += '</div>';
    }
    
    if (description) {
      html += '<p class="formation-description">' + description + '</p>';
    }
    
    // Cours
    if (form.cours && form.cours.length > 0) {
      html += '<div class="formation-courses"><div class="formation-detail-title"><i class="fas fa-book"></i> Cours principaux</div><div class="formation-courses-list">';
      form.cours.forEach(course => {
        const courseName = typeof course === 'string' ? course : (course.name || course);
        html += '<span class="course-tag">' + courseName + '</span>';
      });
      html += '</div></div>';
    }
    
    // Lien
    if (form.lien || form.url) {
      html += '<p class="formation-link"><a href="' + (form.lien || form.url) + '" target="_blank"><i class="fas fa-external-link-alt"></i> Voir la formation</a></p>';
    }
    
    div.innerHTML = html;
    list.appendChild(div);
  });
}

function renderCompetences(cv) {
  const list = document.getElementById('competences-list');
  if (!list || !cv.compétences || cv.compétences.length === 0) return;
  
  // Grouper par catégorie
  const categories = {};
  cv.compétences.forEach(comp => {
    const category = comp.catégorie || 'Autres';
    if (!categories[category]) categories[category] = [];
    categories[category].push(comp);
  });
  
  Object.entries(categories).forEach(([category, comps]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'competence-category';
    
    let html = '<div class="competence-category-title"><i class="fas fa-folder-open"></i> ' + category + '</div><div class="competence-grid">';
    
    comps.forEach(comp => {
      const name = comp.nom || comp.name || '';
      const level = comp.niveau || comp.level || 'Intermédiaire';
      const icon = getIcon(comp.icône || comp.icon || '');
      const keywords = comp.mots_clés || comp.keywords || [];
      
      html += '<div class="competence-item"><div class="competence-header"><span class="competence-name">' + icon + ' ' + name + '</span><span class="competence-level">' + level + '</span></div>';
      
      if (keywords.length > 0) {
        html += '<div class="competence-keywords">';
        keywords.forEach(keyword => {
          html += '<span class="keyword-tag">' + keyword + '</span>';
        });
        html += '</div>';
      }
      
      html += '</div>';
    });
    
    html += '</div>';
    categoryDiv.innerHTML = html;
    list.appendChild(categoryDiv);
  });
}

function renderProjets(cv) {
  const list = document.getElementById('projets-list');
  if (!list || !cv.projets || cv.projets.length === 0) return;
  
  cv.projets.forEach(projet => {
    const div = document.createElement('div');
    div.className = 'projet';
    
    const name = projet.nom || projet.name || '';
    const description = projet.description || '';
    const date = projet.date || formatPeriod(projet.date_debut, projet.date_fin) || '';
    const lien = projet.lien || projet.url || '';
    const github = projet.github || '';
    const technos = projet.technos || projet.technologies || [];
    const realisations = projet.réalisations || projet.highlights || [];
    
    let html = '<div class="projet-header"><div class="projet-name">' + name + (date ? ' <span class="projet-date">(' + date + ')</span>' : '') + '</div><div class="projet-links">';
    
    if (lien) {
      html += '<a href="' + lien + '" target="_blank" class="projet-link"><i class="fas fa-external-link-alt"></i> Site</a>';
    }
    if (github) {
      html += '<a href="' + github + '" target="_blank" class="projet-link"><i class="fab fa-github"></i> Code</a>';
    }
    
    html += '</div></div>';
    
    if (description) {
      html += '<p class="projet-description">' + description + '</p>';
    }
    
    if (realisations.length > 0) {
      html += '<div class="experience-details"><div class="experience-detail-title"><i class="fas fa-star"></i> Réalisation(s)</div><ul class="experience-detail-list">';
      realisations.forEach(real => {
        html += '<li>' + real + '</li>';
      });
      html += '</ul></div>';
    }
    
    if (technos.length > 0) {
      html += '<div class="projet-technos">';
      technos.forEach(tech => {
        html += '<span class="tech-tag">' + getIcon(tech) + ' ' + tech + '</span>';
      });
      html += '</div>';
    }
    
    div.innerHTML = html;
    list.appendChild(div);
  });
}

function renderCertifications(cv) {
  const list = document.getElementById('certifications-list');
  if (!list || !cv.certifications || cv.certifications.length === 0) return;
  
  cv.certifications.forEach(cert => {
    const div = document.createElement('div');
    div.className = 'certification';
    
    const name = cert.nom || cert.name || '';
    const organisme = cert.organisme || cert.issuer || '';
    const date = formatDate(cert.date);
    const lien = cert.lien || cert.url || '';
    
    let html = '<div class="certification-info"><div class="certification-name">' + name + '</div><div class="certification-organisme">' + organisme + '</div></div>';
    
    if (date) {
      html += '<div class="certification-date">' + date + '</div>';
    }
    
    if (lien) {
      html = '<a href="' + lien + '" target="_blank" style="color: inherit; text-decoration: none;">' + html + '</a>';
    }
    
    div.innerHTML = html;
    list.appendChild(div);
  });
}

function renderAssociations(cv) {
  const list = document.getElementById('associations-list');
  if (!list || !cv.associations || cv.associations.length === 0) return;
  
  cv.associations.forEach(assoc => {
    const div = document.createElement('div');
    div.className = 'association';
    
    const name = assoc.nom || assoc.organization || '';
    const poste = assoc.poste || assoc.position || '';
    const description = assoc.description || assoc.summary || '';
    const date = formatPeriod(assoc.date_debut || assoc.startDate, assoc.date_fin || assoc.endDate || assoc.date);
    const logo = assoc.logo || '';
    const lien = assoc.lien || assoc.url || '';
    
    let html = '<div class="association-header"><div><div class="association-name">' + name + (poste ? ' - ' + poste : '') + '</div></div>' + (date ? '<div class="association-date">' + date + '</div>' : '') + '</div>';
    
    if (description) {
      html += '<p class="association-description">' + description + '</p>';
    }
    
    if (logo) {
      html += '<img src="' + logo + '" alt="Logo de ' + name + '" class="association-logo">';
    }
    
    if (lien) {
      html += '<a href="' + lien + '" target="_blank" class="association-link"><i class="fas fa-external-link-alt"></i> Site web</a>';
    }
    
    div.innerHTML = html;
    list.appendChild(div);
  });
}

function renderLangues(cv) {
  const list = document.getElementById('langues-list');
  if (!list || !cv.langues || cv.langues.length === 0) return;
  
  cv.langues.forEach(lang => {
    const div = document.createElement('div');
    div.className = 'langue-item';
    
    const langue = lang.langue || lang.language || '';
    const niveau = lang.niveau || lang.fluency || '';
    
    div.innerHTML = '<div class="langue-name">' + langue + '</div><div class="langue-level">' + niveau + '</div>';
    list.appendChild(div);
  });
}

function renderCentresInteret(cv) {
  const list = document.getElementById('centres-interet-list');
  if (!list || !cv.centres_d_interêt || cv.centres_d_interêt.length === 0) return;
  
  cv.centres_d_interêt.forEach(centre => {
    const div = document.createElement('div');
    div.className = 'interet-category';
    
    const categorie = centre.catégorie || centre.name || '';
    const elements = centre.éléments || centre.keywords || [];
    
    let html = '<div class="interet-category-title"><i class="fas fa-tag"></i> ' + categorie + '</div><div class="interet-elements">';
    
    elements.forEach(el => {
      html += '<span class="interet-element">' + el + '</span>';
    });
    
    html += '</div>';
    div.innerHTML = html;
    list.appendChild(div);
  });
}

function renderContact(cv) {
  const list = document.getElementById('contact-list');
  if (!list || !cv.contact) return;
  
  const contact = cv.contact;
  const contactItems = [];
  
  if (contact.email) {
    contactItems.push({ icon: 'fa-envelope', value: '<a href="mailto:' + contact.email + '" class="contact-link">' + contact.email + '</a>' });
  }
  if (contact.téléphone) {
    const phoneNumber = contact.téléphone.replace(/\s+/g, '');
    contactItems.push({ icon: 'fa-phone', value: '<a href="tel:' + phoneNumber + '" class="contact-link">' + contact.téléphone + '</a>' });
  }
  if (contact.github) {
    contactItems.push({ icon: 'fab fa-github', value: '<a href="https://github.com/' + contact.github + '" class="contact-link" target="_blank">@' + contact.github + '</a>' });
  }
  if (contact.linkedin) {
    contactItems.push({ icon: 'fab fa-linkedin', value: '<a href="https://linkedin.com/in/' + contact.linkedin + '" class="contact-link" target="_blank">' + contact.linkedin + '</a>' });
  }
  if (contact.site_web) {
    contactItems.push({ icon: 'fa-globe', value: '<a href="' + contact.site_web + '" class="contact-link" target="_blank">' + contact.site_web + '</a>' });
  }
  if (contact.portfolio) {
    contactItems.push({ icon: 'fa-folder-open', value: '<a href="' + contact.portfolio + '" class="contact-link" target="_blank">' + contact.portfolio + '</a>' });
  }
  if (contact.localisation) {
    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(contact.localisation);
    contactItems.push({ icon: 'fa-map-marker-alt', value: '<a href="' + mapsUrl + '" class="contact-link" target="_blank">' + contact.localisation + '</a>' });
  }
  
  if (cv.réseaux_sociaux && cv.réseaux_sociaux.twitter && !contact.twitter) {
    contactItems.push({ icon: 'fab fa-twitter', value: '<a href="https://twitter.com/' + cv.réseaux_sociaux.twitter + '" target="_blank">@' + cv.réseaux_sociaux.twitter + '</a>' });
  }
  
  contactItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'contact-item-full';
    div.innerHTML = '<i class="' + item.icon + '"></i><span>' + item.value + '</span>';
    list.appendChild(div);
  });
}

// ===== Toggle thème =====
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark')) {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

// ===== Charger le CV au démarrage =====
loadCV();
