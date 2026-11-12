import { getRecordLanguage, pickCopy, renderAutoresponder, renderTemplate } from './shared.mjs';

const translations = {
  de: {
    subject: '[SAMVAL] Neue Kontaktanfrage von der Website',
    preheader: 'Eine Person hat das allgemeine Kontaktformular gesendet.',
    badge: 'Kontaktformular',
    intro: 'Neue Anfrage von der SAMVAL-Kontaktseite.',
    fields: {
      empresa: 'Unternehmen / Organisation',
      correo: 'E-Mail',
      nombre: 'Vorname',
      apellidos: 'Nachname',
      movil: 'Mobiltelefon',
      pais: 'Land',
      estado: 'Region',
      ciudad: 'Stadt',
      mensaje: 'Nachricht',
    },
    autoresponder: {
      subject: 'Wir haben Ihre Nachricht erhalten | SAMVAL',
      preheader: 'Danke, dass Sie SAMVAL kontaktiert haben.',
      badge: 'Nachricht erhalten',
      intro: 'Danke, dass Sie uns geschrieben haben.',
      body: [
        'Unser Team hat Ihre Nachricht erhalten und wird sie pruefen.',
        'Wenn Ihre Anfrage dringend ist, koennen Sie uns auch ueber WhatsApp kontaktieren.',
      ],
      footer: 'Fundacion SAMVAL',
    },
  },
  en: {
    subject: '[SAMVAL] New website contact',
    preheader: 'Someone submitted the general contact form.',
    badge: 'Contact form',
    intro: 'New request received from the SAMVAL contact page.',
    fields: {
      empresa: 'Company or organization',
      correo: 'Email',
      nombre: 'First name',
      apellidos: 'Last name',
      movil: 'Mobile',
      pais: 'Country',
      estado: 'State / region',
      ciudad: 'City',
      mensaje: 'Message',
    },
    autoresponder: {
      subject: 'We received your message | SAMVAL',
      preheader: 'Thank you for contacting SAMVAL.',
      badge: 'Message received',
      intro: 'Thank you for writing to us.',
      body: [
        'Our team has received your message and will review it shortly.',
        'If your request is urgent, you can also contact us through WhatsApp.',
      ],
      footer: 'SAMVAL Foundation',
    },
  },
  es: {
    subject: '[SAMVAL] Nuevo contacto desde el sitio',
    preheader: 'Una persona envio el formulario general de contacto.',
    badge: 'Formulario de contacto',
    intro: 'Nueva solicitud recibida desde la pagina de contacto de SAMVAL.',
    fields: {
      empresa: 'Empresa u organizacion',
      correo: 'Correo',
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      movil: 'Movil',
      pais: 'Pais',
      estado: 'Estado / region',
      ciudad: 'Ciudad',
      mensaje: 'Mensaje',
    },
    autoresponder: {
      subject: 'Recibimos tu mensaje | SAMVAL',
      preheader: 'Gracias por contactar a SAMVAL.',
      badge: 'Mensaje recibido',
      intro: 'Gracias por escribirnos.',
      body: [
        'Nuestro equipo recibio tu mensaje y lo revisara pronto.',
        'Si tu solicitud es urgente, tambien puedes contactarnos por WhatsApp.',
      ],
      footer: 'Fundacion SAMVAL',
    },
  },
  fr: {
    subject: '[SAMVAL] Nouveau contact depuis le site',
    preheader: 'Une personne a envoye le formulaire de contact general.',
    badge: 'Formulaire de contact',
    intro: 'Nouvelle demande recue depuis la page de contact de SAMVAL.',
    fields: {
      empresa: 'Entreprise ou organisation',
      correo: 'E-mail',
      nombre: 'Prenom',
      apellidos: 'Nom',
      movil: 'Mobile',
      pais: 'Pays',
      estado: 'Region',
      ciudad: 'Ville',
      mensaje: 'Message',
    },
    autoresponder: {
      subject: 'Nous avons recu votre message | SAMVAL',
      preheader: 'Merci de contacter SAMVAL.',
      badge: 'Message recu',
      intro: 'Merci de nous avoir ecrit.',
      body: [
        'Notre equipe a recu votre message et va l examiner prochainement.',
        'Si votre demande est urgente, vous pouvez aussi nous contacter via WhatsApp.',
      ],
      footer: 'Fondation SAMVAL',
    },
  },
};

const fieldOrder = ['empresa', 'correo', 'nombre', 'apellidos', 'movil', 'pais', 'estado', 'ciudad', 'mensaje'];

export const contactTemplate = (record) => {
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

export const contactAutoresponder = (record) => {
  const language = getRecordLanguage(record);
  const copy = pickCopy(translations, language).autoresponder;

  return renderAutoresponder(copy);
};
