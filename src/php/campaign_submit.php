<?php
// Configuración de seguridad y headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejo de preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo aceptar POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error", 
        "message" => "Método no permitido. Solo se acepta POST."
    ]);
    exit();
}

try {
    // Obtener y decodificar datos JSON
    $rawInput = file_get_contents('php://input');
    $formData = json_decode($rawInput, true);

    // Validar que se recibieron datos
    if (empty($formData)) {
        throw new Exception("No se recibieron datos del formulario.");
    }

    // Validar campos requeridos para formulario de campaña
    $requiredFields = ['campaignName', 'objectives', 'targetAudience', 'duration'];
    $missingFields = [];

    foreach ($requiredFields as $field) {
        if (empty($formData[$field])) {
            $missingFields[] = $field;
        }
    }

    if (!empty($missingFields)) {
        throw new Exception("Campos requeridos faltantes: " . implode(', ', $missingFields));
    }

    // Sanitizar datos
    $sanitizedData = [];
    foreach ($formData as $key => $value) {
        if (is_array($value)) {
            $sanitizedData[$key] = array_map(function($item) {
                return htmlspecialchars(trim($item), ENT_QUOTES, 'UTF-8');
            }, $value);
        } else {
            $sanitizedData[$key] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
        }
    }

    // Validaciones específicas
    if (!empty($sanitizedData['budget']) && !is_numeric(str_replace(['$', ',', ' '], '', $sanitizedData['budget']))) {
        throw new Exception("El formato del presupuesto no es válido.");
    }

    // Generar HTML para email
    $emailHtml = generateCampaignEmailHtml($sanitizedData);

    // Aquí se podría agregar envío de email
    // mail($to, $subject, $emailHtml, $headers);

    // Log de datos (opcional, para debugging)
    error_log("Formulario de campaña recibido: " . json_encode($sanitizedData));

    // Respuesta exitosa
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Campaña personalizada enviada correctamente.",
        "data" => $sanitizedData,
        "timestamp" => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    // Manejo de errores
    error_log("Error en campaign_submit.php: " . $e->getMessage());
    
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
        "timestamp" => date('Y-m-d H:i:s')
    ]);
}

/**
 * Genera HTML formateado para el email de campaña
 */
function generateCampaignEmailHtml($data) {
    $html = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6;'>";
    $html .= "<h2 style='color: #8B5CF6;'>Nueva Campaña Personalizada - Stream Boosters</h2>";
    
    $html .= "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
    $html .= "<h3 style='color: #333; margin-top: 0;'>Detalles de la Campaña</h3>";
    $html .= "<p><strong>Nombre de la Campaña:</strong> " . $data['campaignName'] . "</p>";
    $html .= "<p><strong>Objetivos:</strong> " . $data['objectives'] . "</p>";
    $html .= "<p><strong>Audiencia Objetivo:</strong> " . $data['targetAudience'] . "</p>";
    $html .= "<p><strong>Duración:</strong> " . $data['duration'] . "</p>";
    
    if (!empty($data['budget'])) {
        $html .= "<p><strong>Presupuesto:</strong> " . $data['budget'] . "</p>";
    }
    
    if (!empty($data['streamerPreferences']) && is_array($data['streamerPreferences'])) {
        $html .= "<p><strong>Preferencias de Streamers:</strong> " . implode(', ', $data['streamerPreferences']) . "</p>";
    }
    
    if (!empty($data['platforms']) && is_array($data['platforms'])) {
        $html .= "<p><strong>Plataformas:</strong> " . implode(', ', $data['platforms']) . "</p>";
    }
    
    if (!empty($data['specialRequirements'])) {
        $html .= "<h3 style='color: #333;'>Requisitos Especiales</h3>";
        $html .= "<p style='background: white; padding: 15px; border-left: 4px solid #8B5CF6;'>" . nl2br($data['specialRequirements']) . "</p>";
    }
    $html .= "</div>";
    
    $html .= "<p style='color: #666; font-size: 12px;'>Enviado desde Stream Boosters el " . date('d/m/Y H:i:s') . "</p>";
    $html .= "</body></html>";
    
    return $html;
}
?>
