import { contactAutoresponder, contactTemplate } from './contact.mjs';
import { techServicesAutoresponder, techServicesTemplate } from './techServices.mjs';
import { volunteerAutoresponder, volunteerTemplate } from './volunteer.mjs';

const templates = {
  contact: contactTemplate,
  'tech-services': techServicesTemplate,
  volunteer: volunteerTemplate,
};

const autoresponders = {
  contact: contactAutoresponder,
  'tech-services': techServicesAutoresponder,
  volunteer: volunteerAutoresponder,
};

export const getSubmitterEmail = (record) => record.fields.correo || record.fields.email || '';

export const getSubmitterName = (record) =>
  [record.fields.nombre || record.fields.firstName || record.fields.name, record.fields.apellidos || record.fields.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

export const buildFormNotificationEmail = (record) => {
  const template = templates[record.type] || contactTemplate;
  return template(record);
};

export const buildSubmitterAutoresponderEmail = (record) => {
  const template = autoresponders[record.type] || contactAutoresponder;
  return template(record);
};
