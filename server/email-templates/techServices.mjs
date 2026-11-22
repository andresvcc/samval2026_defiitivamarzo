import { getRecordLanguage, pickCopy, renderAutoresponder, renderTemplate } from './shared.mjs';

const translations = {
  de: {
    subject: '[SAMVAL] Neue Anfrage fuer Tech Services',
    preheader: 'Ein Unternehmen oder Partner hat Informationen zu technologischen Services angefordert.',
    badge: 'Technologische Services',
    intro: 'Neue kommerzielle Anfrage von der Tech-Services-Seite.',
    fields: {
      company: 'Unternehmen / Organisation',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      message: 'Bedarf / Nachricht',
      consentData: 'Akzeptiert Datenverarbeitung',
      consentComms: 'Akzeptiert Kommunikation',
    },
    autoresponder: {
      subject: 'Ihre Tech-Anfrage ist eingegangen | SAMVAL',
      preheader: 'Danke fuer Ihre Anfrage zu unseren technologischen Services.',
      badge: 'Anfrage erhalten',
      intro: 'Danke fuer Ihr Interesse an SAMVAL Tech Services.',
      body: [
        'Unser Team hat Ihre Anfrage erhalten und wird die Informationen pruefen.',
        'Wir melden uns, um den Bedarf, den Umfang und die naechsten Schritte zu besprechen.',
      ],
      footer: 'Fundacion SAMVAL',
    },
  },
  en: {
    subject: '[SAMVAL] New tech services quote request',
    preheader: 'A company or partner requested information about technology services.',
    badge: 'Technology services',
    intro: 'New business request received from the tech services page.',
    fields: {
      company: 'Company or organization',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      message: 'Need / message',
      consentData: 'Accepted data processing',
      consentComms: 'Accepted communications',
    },
    autoresponder: {
      subject: 'Your tech request was received | SAMVAL',
      preheader: 'Thank you for asking about our technology services.',
      badge: 'Request received',
      intro: 'Thank you for your interest in SAMVAL Tech Services.',
      body: [
        'Our team has received your request and will review the information.',
        'We will contact you to discuss the need, scope, and next steps.',
      ],
      footer: 'SAMVAL Foundation',
    },
  },
  es: {
    subject: '[SAMVAL] Nueva solicitud de cotizacion tech',
    preheader: 'Una empresa o aliado solicito informacion sobre servicios tecnologicos.',
    badge: 'Servicios tecnologicos',
    intro: 'Nueva solicitud comercial recibida desde la pagina de servicios tech.',
    fields: {
      company: 'Empresa u organizacion',
      firstName: 'Nombre',
      lastName: 'Apellidos',
      email: 'Correo',
      phone: 'Telefono',
      message: 'Necesidad / mensaje',
      consentData: 'Acepta tratamiento de datos',
      consentComms: 'Acepta comunicaciones',
    },
    autoresponder: {
      subject: 'Recibimos tu solicitud tech | SAMVAL',
      preheader: 'Gracias por consultar nuestros servicios tecnologicos.',
      badge: 'Solicitud recibida',
      intro: 'Gracias por tu interes en los servicios tech de SAMVAL.',
      body: [
        'Nuestro equipo recibio tu solicitud y revisara la informacion enviada.',
        'Nos pondremos en contacto para entender la necesidad, alcance y siguientes pasos.',
      ],
      footer: 'Fundacion SAMVAL',
    },
  },
  fr: {
    subject: '[SAMVAL] Nouvelle demande de devis tech',
    preheader: 'Une entreprise ou un partenaire a demande des informations sur les services technologiques.',
    badge: 'Services technologiques',
    intro: 'Nouvelle demande commerciale recue depuis la page des services tech.',
    fields: {
      company: 'Entreprise ou organisation',
      firstName: 'Prenom',
      lastName: 'Nom',
      email: 'E-mail',
      phone: 'Telephone',
      message: 'Besoin / message',
      consentData: 'Accepte le traitement des donnees',
      consentComms: 'Accepte les communications',
    },
    autoresponder: {
      subject: 'Votre demande tech a ete recue | SAMVAL',
      preheader: 'Merci pour votre demande concernant nos services technologiques.',
      badge: 'Demande recue',
      intro: 'Merci pour votre interet pour les services tech de SAMVAL.',
      body: [
        'Notre equipe a recu votre demande et examinera les informations envoyees.',
        'Nous vous contacterons pour discuter du besoin, du perimetre et des prochaines etapes.',
      ],
      footer: 'Fondation SAMVAL',
    },
  },
};

const fieldOrder = ['company', 'firstName', 'lastName', 'email', 'phone', 'message', 'consentData', 'consentComms'];

export const techServicesTemplate = (record) => {
  const language = getRecordLanguage(record);
  const copy = pickCopy(translations, language);

  return renderTemplate({
    subject: copy.subject,
    preheader: copy.preheader,
    badge: copy.badge,
    intro: copy.intro,
    record,
    fieldLabels: copy.fields,
    fieldOrder,
    language,
  });
};

export const techServicesAutoresponder = (record) => {
  const language = getRecordLanguage(record);
  const copy = pickCopy(translations, language).autoresponder;

  return renderAutoresponder(copy);
};
