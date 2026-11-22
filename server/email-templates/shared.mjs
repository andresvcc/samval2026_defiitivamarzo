export const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const yesNo = {
  de: ['Ja', 'Nein'],
  en: ['Yes', 'No'],
  es: ['Si', 'No'],
  fr: ['Oui', 'Non'],
};

export const getRecordLanguage = (record) => {
  const language = String(record.context?.language || '').toLowerCase().slice(0, 2);
  return ['de', 'en', 'es', 'fr'].includes(language) ? language : 'es';
};

export const pickCopy = (translations, language) => translations[language] || translations.es;

export const booleanText = (value, language = 'es') => {
  if (typeof value === 'boolean') return value ? yesNo[language]?.[0] || yesNo.es[0] : yesNo[language]?.[1] || yesNo.es[1];
  return String(value ?? '');
};

export const renderFieldRows = (fields, fieldLabels, fieldOrder, language) => {
  const excludedFields = new Set(['website']);
  const orderedEntries = [
    ...fieldOrder
      .filter((key) => Object.prototype.hasOwnProperty.call(fields, key))
      .map((key) => [key, fields[key]]),
    ...Object.entries(fields).filter(([key]) => !fieldOrder.includes(key)),
  ];

  return orderedEntries
    .filter(([key, value]) => !excludedFields.has(key) && value !== undefined && value !== null && value !== '')
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:700;color:#3d3229;width:34%;">${escapeHtml(fieldLabels[key] || key)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#3d3229;white-space:pre-wrap;">${escapeHtml(booleanText(value, language))}</td>
        </tr>
      `
    )
    .join('');
};

export const renderTextFields = (fields, fieldLabels, fieldOrder, language) => {
  const excludedFields = new Set(['website']);
  const orderedEntries = [
    ...fieldOrder
      .filter((key) => Object.prototype.hasOwnProperty.call(fields, key))
      .map((key) => [key, fields[key]]),
    ...Object.entries(fields).filter(([key]) => !fieldOrder.includes(key)),
  ];

  return orderedEntries
    .filter(([key, value]) => !excludedFields.has(key) && value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${fieldLabels[key] || key}: ${booleanText(value, language)}`);
};

export const renderLayout = ({ title, preheader, badge, intro, record, rows }) => `
  <html>
    <body style="font-family:Arial,sans-serif;background:#f7f2ed;margin:0;padding:24px;color:#3d3229;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
      <div style="max-width:760px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eadfd5;">
        <div style="background:#801b1b;color:#fff;padding:22px 26px;">
          <div style="font-size:11px;letter-spacing:1.8px;text-transform:uppercase;opacity:.78;margin-bottom:10px;">${escapeHtml(badge)}</div>
          <h1 style="font-size:22px;line-height:1.25;margin:0;">${escapeHtml(title)}</h1>
          <p style="margin:10px 0 0;opacity:.86;">${escapeHtml(intro)}</p>
        </div>
        <div style="padding:24px 26px;">
          <p style="margin:0 0 6px;"><strong>ID:</strong> ${escapeHtml(record.id)}</p>
          <p style="margin:0 0 6px;"><strong>Fecha:</strong> ${escapeHtml(record.receivedAt)}</p>
          <p style="margin:0 0 18px;"><strong>Pagina:</strong> ${escapeHtml(record.context.pageUri || '')}</p>
          <table style="width:100%;border-collapse:collapse;margin-top:18px;">
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    </body>
  </html>
`;

export const renderAutoresponderLayout = ({ title, preheader, badge, intro, body, footer }) => `
  <html>
    <body style="font-family:Arial,sans-serif;background:#f7f2ed;margin:0;padding:24px;color:#3d3229;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
      <div style="max-width:720px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eadfd5;">
        <div style="background:#801b1b;color:#fff;padding:22px 26px;">
          <div style="font-size:11px;letter-spacing:1.8px;text-transform:uppercase;opacity:.78;margin-bottom:10px;">${escapeHtml(badge)}</div>
          <h1 style="font-size:22px;line-height:1.25;margin:0;">${escapeHtml(title)}</h1>
          <p style="margin:10px 0 0;opacity:.86;">${escapeHtml(intro)}</p>
        </div>
        <div style="padding:26px;font-size:15px;line-height:1.65;color:#3d3229;">
          ${body.map((paragraph) => `<p style="margin:0 0 16px;">${escapeHtml(paragraph)}</p>`).join('')}
          <p style="margin:24px 0 0;color:#7a6b5f;font-size:13px;">${escapeHtml(footer)}</p>
        </div>
      </div>
    </body>
  </html>
`;

export const renderAutoresponder = ({ subject, preheader, badge, intro, body, footer }) => ({
  subject,
  htmlContent: renderAutoresponderLayout({ title: subject, preheader, badge, intro, body, footer }),
  textContent: [subject, '', intro, '', ...body, '', footer].join('\n'),
});

export const renderTemplate = ({ subject, preheader, badge, intro, record, fieldLabels, fieldOrder, language }) => {
  const rows = renderFieldRows(record.fields, fieldLabels, fieldOrder, language);
  const textFields = renderTextFields(record.fields, fieldLabels, fieldOrder, language);

  return {
    subject,
    htmlContent: renderLayout({ title: subject, preheader, badge, intro, record, rows }),
    textContent: [
      subject,
      '',
      intro,
      '',
      `ID: ${record.id}`,
      `Fecha: ${record.receivedAt}`,
      `Pagina: ${record.context.pageUri || ''}`,
      '',
      ...textFields,
    ].join('\n'),
  };
};
