<?php
// ============================================
// CONFIGURACIÓN DE RESEND - EJEMPLO
// ============================================
// INSTRUCCIONES:
// 1. Copia este archivo y renómbralo a "config.php"
// 2. Reemplaza los valores de ejemplo con tus datos reales
// 3. NO subas config.php a GitHub (ya está en .gitignore)

// Tu API Key de Resend
// Obtén tu API Key en: https://resend.com/api-keys
define('RESEND_API_KEY', 're_TU_API_KEY_AQUI');

// Email donde recibirás las cotizaciones
define('RECIPIENT_EMAIL', 'jorge.jimenez@samval.org');

// Email de remitente (debe estar verificado en Resend)
define('FROM_EMAIL', 'SAMVAL Cotizaciones <cotizaciones@samval.org>');
define('FROM_EMAIL_CONFIRMATION', 'SAMVAL <contacto@samval.org>');
?>
