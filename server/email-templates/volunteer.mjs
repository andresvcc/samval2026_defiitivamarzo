import { getRecordLanguage, pickCopy, renderAutoresponder, renderTemplate } from './shared.mjs';

const translations = {
  de: {
    subject: '[SAMVAL] Neue Freiwilligenbewerbung',
    preheader: 'Eine Person moechte sich als Freiwillige/r einbringen.',
    badge: 'Freiwilligenarbeit',
    intro: (area) => `Neue Bewerbung fuer den Bereich: ${area || 'Nicht angegeben'}.`,
    fields: {
      area: 'Freiwilligenbereich',
      name: 'Name',
      contact: 'WhatsApp / Kontakt',
      availability: 'Verfuegbarkeit',
    },
    areas: {
      communications: 'Kommunikation',
      education: 'Bildung',
      engineering: 'Ingenieurwesen',
      health: 'Gesundheit',
      social_impact: 'Soziale Wirkung',
    },
    autoresponder: {
      subject: 'Ihre Freiwilligenbewerbung ist eingegangen | SAMVAL',
      preheader: 'Danke, dass Sie sich als Freiwillige/r einbringen moechten.',
      badge: 'Bewerbung erhalten',
      intro: 'Danke, dass Sie sich bei SAMVAL engagieren moechten.',
      body: [
        'Wir haben Ihre Bewerbung erhalten und werden sie pruefen.',
        'Unser Team meldet sich, wenn wir Ihre Verfuegbarkeit und den passenden Einsatzbereich abstimmen koennen.',
      ],
      footer: 'Fundacion SAMVAL',
    },
  },
  en: {
    subject: '[SAMVAL] New volunteer application',
    preheader: 'Someone wants to join as a volunteer.',
    badge: 'Volunteering',
    intro: (area) => `New volunteer application for area: ${area || 'Not specified'}.`,
    fields: {
      area: 'Volunteer area',
      name: 'Name',
      contact: 'WhatsApp / contact',
      availability: 'Availability',
    },
    areas: {
      communications: 'Communications',
      education: 'Education',
      engineering: 'Engineering',
      health: 'Health',
      social_impact: 'Social impact',
    },
    autoresponder: {
      subject: 'Your volunteer application was received | SAMVAL',
      preheader: 'Thank you for wanting to join as a volunteer.',
      badge: 'Application received',
      intro: 'Thank you for wanting to contribute to SAMVAL.',
      body: [
        'We received your volunteer application and will review it.',
        'Our team will contact you when we can align your availability with the right area of support.',
      ],
      footer: 'SAMVAL Foundation',
    },
  },
  es: {
    subject: '[SAMVAL] Nueva postulacion de voluntariado',
    preheader: 'Una persona quiere sumarse como voluntaria.',
    badge: 'Voluntariado',
    intro: (area) => `Nueva postulacion para el area: ${area || 'No especificada'}.`,
    fields: {
      area: 'Area de voluntariado',
      name: 'Nombre',
      contact: 'WhatsApp / contacto',
      availability: 'Disponibilidad',
    },
    areas: {
      communications: 'Comunicaciones',
      education: 'Educacion',
      engineering: 'Ingenieria',
      health: 'Salud',
      social_impact: 'Impacto social',
    },
    autoresponder: {
      subject: 'Recibimos tu postulacion de voluntariado | SAMVAL',
      preheader: 'Gracias por querer sumarte como voluntario.',
      badge: 'Postulacion recibida',
      intro: 'Gracias por querer aportar a SAMVAL.',
      body: [
        'Recibimos tu postulacion de voluntariado y la revisaremos.',
        'Nuestro equipo te contactara cuando podamos cruzar tu disponibilidad con el area de apoyo adecuada.',
      ],
      footer: 'Fundacion SAMVAL',
    },
  },
  fr: {
    subject: '[SAMVAL] Nouvelle candidature benevole',
    preheader: 'Une personne souhaite rejoindre comme benevole.',
    badge: 'Benevolat',
    intro: (area) => `Nouvelle candidature pour le domaine : ${area || 'Non precise'}.`,
    fields: {
      area: 'Domaine de benevolat',
      name: 'Nom',
      contact: 'WhatsApp / contact',
      availability: 'Disponibilite',
    },
    areas: {
      communications: 'Communication',
      education: 'Education',
      engineering: 'Ingenierie',
      health: 'Sante',
      social_impact: 'Impact social',
    },
    autoresponder: {
      subject: 'Votre candidature benevole a ete recue | SAMVAL',
      preheader: 'Merci de vouloir rejoindre SAMVAL comme benevole.',
      badge: 'Candidature recue',
      intro: 'Merci de vouloir contribuer a SAMVAL.',
      body: [
        'Nous avons recu votre candidature benevole et nous allons l examiner.',
        'Notre equipe vous contactera lorsque nous pourrons aligner votre disponibilite avec le domaine de soutien approprie.',
      ],
      footer: 'Fondation SAMVAL',
    },
  },
};

const fieldOrder = ['area', 'name', 'contact', 'availability'];

export const volunteerTemplate = (record) => {
  const language = getRecordLanguage(record);
  const copy = pickCopy(translations, language);
  const translatedArea = copy.areas[record.fields.area] || record.fields.area;

  return renderTemplate({
    subject: copy.subject,
    preheader: copy.preheader,
    badge: copy.badge,
    intro: copy.intro(translatedArea),
    record: {
      ...record,
      fields: {
        ...record.fields,
        area: translatedArea,
      },
    },
    fieldLabels: copy.fields,
    fieldOrder,
    language,
  });
};

export const volunteerAutoresponder = (record) => {
  const language = getRecordLanguage(record);
  const copy = pickCopy(translations, language).autoresponder;

  return renderAutoresponder(copy);
};
