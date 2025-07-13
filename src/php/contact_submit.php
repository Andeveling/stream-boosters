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

    // Validar campos requeridos para formulario de contacto
    $requiredFields = ['name', 'email', 'company', 'projectType'];
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
        $sanitizedData[$key] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
    }

    // Validar email
    if (!filter_var($sanitizedData['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("El formato del email no es válido.");
    }

    // Generar HTML para email
    $emailHtml = generateContactEmailHtml($sanitizedData);

    // Aquí se podría agregar envío de email
    // mail($to, $subject, $emailHtml, $headers);

    // Log de datos (opcional, para debugging)
    error_log("Formulario de contacto recibido: " . json_encode($sanitizedData));

    // Respuesta exitosa
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Formulario de contacto enviado correctamente.",
        "data" => $sanitizedData,
        "timestamp" => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    // Manejo de errores
    error_log("Error en contact_submit.php: " . $e->getMessage());
    
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
        "timestamp" => date('Y-m-d H:i:s')
    ]);
}

/**
 * Genera HTML formateado para el email de contacto
 */
function generateContactEmailHtml($data) {
    $html = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6;'>";
    $html .= "<h2 style='color: #FF2D92;'>Nueva Consulta de Contacto - Stream Boosters</h2>";
    
    $html .= "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
    $html .= "<h3 style='color: #333; margin-top: 0;'>Información del Cliente</h3>";
    $html .= "<p><strong>Nombre:</strong> " . $data['name'] . "</p>";
    $html .= "<p><strong>Email:</strong> " . $data['email'] . "</p>";
    $html .= "<p><strong>Empresa:</strong> " . $data['company'] . "</p>";
    $html .= "<p><strong>Tipo de Proyecto:</strong> " . ucfirst($data['projectType']) . "</p>";
    
    if (!empty($data['budget'])) {
        $html .= "<p><strong>Presupuesto Estimado:</strong> " . $data['budget'] . "</p>";
    }
    
    if (!empty($data['description'])) {
        $html .= "<h3 style='color: #333;'>Descripción del Proyecto</h3>";
        $html .= "<p style='background: white; padding: 15px; border-left: 4px solid #FF2D92;'>" . nl2br($data['description']) . "</p>";
    }
    $html .= "</div>";
    
    $html .= "<p style='color: #666; font-size: 12px;'>Enviado desde Stream Boosters el " . date('d/m/Y H:i:s') . "</p>";
    $html .= "</body></html>";
    
    return $html;
}
?>
