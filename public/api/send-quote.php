<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Leer el cuerpo de la petición
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validación básica
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit();
}

$name = htmlspecialchars($data['name']);
$company = isset($data['company']) ? htmlspecialchars($data['company']) : '';
$email = htmlspecialchars($data['email']);
$serviceType = htmlspecialchars($data['serviceType']);
$message = htmlspecialchars($data['message']);

// Mapeo de tipos de servicio
$serviceTypeMap = [
    'web' => 'Desarrollo Web',
    'mobile' => 'Desarrollo Móvil',
    'ai' => 'Inteligencia Artificial',
    'custom' => 'Solución Personalizada'
];
$serviceTypeName = isset($serviceTypeMap[$serviceType]) ? $serviceTypeMap[$serviceType] : $serviceType;

// Cargar configuración
// Intenta cargar desde archivo config.php (más seguro)
$configPath = __DIR__ . '/../../config.php';
if (file_exists($configPath)) {
    require_once $configPath;
    $resendApiKey = RESEND_API_KEY;
    $recipientEmail = RECIPIENT_EMAIL;
    $fromEmail = FROM_EMAIL;
    $fromEmailConfirmation = FROM_EMAIL_CONFIRMATION;
}
else {
    // Fallback: usar variable de entorno o valor por defecto
    $resendApiKey = getenv('RESEND_API_KEY') ?: 're_tu_api_key_aqui';
    $recipientEmail = 'jorge.jimenez@samval.org';
    $fromEmail = 'SAMVAL Cotizaciones <cotizaciones@samval.org>';
    $fromEmailConfirmation = 'SAMVAL <contacto@samval.org>';
}


// Preparar el email para el equipo de SAMVAL
$emailToTeam = [
    'from' => $fromEmail,
    'to' => [$recipientEmail],
    'subject' => "Nueva Cotización: {$serviceTypeName} - {$name}",
    'html' => "
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset='utf-8'>
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
            <div class='header'>
              <h1>🎯 Nueva Solicitud de Cotización</h1>
            </div>
            <div class='content'>
              <div class='field'>
                <div class='field-label'>👤 Nombre del Cliente</div>
                <div class='field-value'>{$name}</div>
              </div>
              " . ($company ? "
              <div class='field'>
                <div class='field-label'>🏢 Empresa</div>
                <div class='field-value'>{$company}</div>
              </div>
              " : "") . "
              <div class='field'>
                <div class='field-label'>📧 Email de Contacto</div>
                <div class='field-value'>{$email}</div>
              </div>
              <div class='field'>
                <div class='field-label'>💼 Tipo de Servicio</div>
                <div class='field-value'>{$serviceTypeName}</div>
              </div>
              <div class='message-box'>
                <div class='field-label'>📝 Descripción del Proyecto</div>
                <div class='field-value' style='margin-top: 10px; white-space: pre-wrap;'>{$message}</div>
              </div>
              <div class='footer'>
                <p>📅 Recibido el " . date('d/m/Y H:i:s') . "</p>
                <p style='margin-top: 10px;'>Este correo fue enviado automáticamente desde el formulario de cotizaciones de SAMVAL</p>
              </div>
            </div>
          </body>
        </html>
    "
];

// Preparar el email de confirmación para el cliente
$emailToClient = [
    'from' => $fromEmailConfirmation,
    'to' => [$email],
    'subject' => '✅ Hemos recibido tu solicitud de cotización',
    'html' => "
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset='utf-8'>
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
            <div class='header'>
              <h1>¡Gracias por contactarnos! 🎉</h1>
            </div>
            <div class='content'>
              <p>Hola <strong>{$name}</strong>,</p>
              <p>Hemos recibido tu solicitud de cotización para <strong>{$serviceTypeName}</strong>.</p>
              <div class='highlight'>
                <p style='margin: 0;'><strong>📋 Resumen de tu solicitud:</strong></p>
                <p style='margin: 10px 0 0 0;'>{$message}</p>
              </div>
              <p>Nuestro equipo revisará tu solicitud y te contactará en un plazo máximo de <strong>24-48 horas hábiles</strong> para discutir los detalles de tu proyecto.</p>
              <p>Mientras tanto, si tienes alguna pregunta adicional, no dudes en responder a este correo.</p>
              <p style='margin-top: 30px;'>Saludos cordiales,<br>
              <strong>El equipo de SAMVAL</strong><br>
              Fundación para el Desarrollo Social y Tecnológico</p>
              <div class='footer'>
                <p>🌐 <a href='https://samval.org' style='color: #667eea;'>www.samval.org</a></p>
                <p>📧 contacto@samval.org</p>
              </div>
            </div>
          </body>
        </html>
    "
];

// Función para enviar email con Resend
function sendResendEmail($apiKey, $emailData)
{
    $ch = curl_init('https://api.resend.com/emails');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'response' => json_decode($response, true),
        'httpCode' => $httpCode
    ];
}

// Enviar email al equipo
$resultTeam = sendResendEmail($resendApiKey, $emailToTeam);

if ($resultTeam['httpCode'] !== 200) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el email',
        'details' => $resultTeam['response']
    ]);
    exit();
}

// Enviar email de confirmación al cliente
$resultClient = sendResendEmail($resendApiKey, $emailToClient);

// Responder con éxito
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Cotización enviada exitosamente',
    'emailId' => $resultTeam['response']['id'] ?? null
]);
?>
