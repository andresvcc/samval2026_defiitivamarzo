import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, email, serviceType, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Mapeo de tipos de servicio
    const serviceTypeMap: { [key: string]: string } = {
      web: 'Desarrollo Web',
      mobile: 'Desarrollo Móvil',
      ai: 'Inteligencia Artificial',
      custom: 'Solución Personalizada'
    };

    const serviceTypeName = serviceTypeMap[serviceType] || serviceType;

    // Enviar email al equipo de SAMVAL
    const { data, error } = await resend.emails.send({
      from: 'SAMVAL Cotizaciones <cotizaciones@samval.org>',
      to: ['jorge.jimenez@samval.org'], // Cambia esto por el email donde quieres recibir las cotizaciones
      subject: `Nueva Cotización: ${serviceTypeName} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
              }
              .field-label {
                font-weight: bold;
                color: #667eea;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .field-value {
                color: #333;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #764ba2;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎯 Nueva Solicitud de Cotización</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Nombre del Cliente</div>
                <div class="field-value">${name}</div>
              </div>
              
              ${company ? `
              <div class="field">
                <div class="field-label">🏢 Empresa</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="field-label">📧 Email de Contacto</div>
                <div class="field-value">${email}</div>
              </div>
              
              <div class="field">
                <div class="field-label">💼 Tipo de Servicio</div>
                <div class="field-value">${serviceTypeName}</div>
              </div>
              
              <div class="message-box">
                <div class="field-label">📝 Descripción del Proyecto</div>
                <div class="field-value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
              </div>
              
              <div class="footer">
                <p>📅 Recibido el ${new Date().toLocaleString('es-CO', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'America/Bogota'
      })}</p>
                <p style="margin-top: 10px;">Este correo fue enviado automáticamente desde el formulario de cotizaciones de SAMVAL</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return res.status(500).json({ error: 'Error al enviar el email' });
    }

    // Email de confirmación al cliente
    await resend.emails.send({
      from: 'SAMVAL <contacto@samval.org>',
      to: [email],
      subject: '✅ Hemos recibido tu solicitud de cotización',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .highlight {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>¡Gracias por contactarnos! 🎉</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${name}</strong>,</p>
              
              <p>Hemos recibido tu solicitud de cotización para <strong>${serviceTypeName}</strong>.</p>
              
              <div class="highlight">
                <p style="margin: 0;"><strong>📋 Resumen de tu solicitud:</strong></p>
                <p style="margin: 10px 0 0 0;">${message}</p>
              </div>
              
              <p>Nuestro equipo revisará tu solicitud y te contactará en un plazo máximo de <strong>24-48 horas hábiles</strong> para discutir los detalles de tu proyecto.</p>
              
              <p>Mientras tanto, si tienes alguna pregunta adicional, no dudes en responder a este correo.</p>
              
              <p style="margin-top: 30px;">Saludos cordiales,<br>
              <strong>El equipo de SAMVAL</strong><br>
              Fundación para el Desarrollo Social y Tecnológico</p>
              
              <div class="footer">
                <p>🌐 <a href="https://samval.org" style="color: #667eea;">www.samval.org</a></p>
                <p>📧 contacto@samval.org</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Cotización enviada exitosamente',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Error en el handler:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
