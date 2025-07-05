<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and prepare data
    $formData = json_decode(file_get_contents('php://input'), true);

    $to = "tu-correo@dominio.com"; // IMPORTANT: Replace with your email address
    $subject = "Nueva Propuesta de Campaña Personalizada";
    $headers = "From: no-reply@stream-boosters.com" . "\r\n" .
               "Reply-To: no-reply@stream-boosters.com" . "\r\n" .
               "Content-Type: text/html; charset=UTF-8" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $message = "<html><body>";
    $message .= "<h1>Detalles de la Propuesta</h1>";

    if (!empty($formData)) {
        foreach ($formData as $key => $value) {
            $key_formatted = ucwords(str_replace('_', ' ', $key));
            $value_formatted = htmlspecialchars($value);
            $message .= "<p><strong>" . $key_formatted . ":</strong> " . $value_formatted . "</p>";
        }
    } else {
        $message .= "<p>No se recibieron datos del formulario.</p>";
    }

    $message .= "</body></html>";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Propuesta enviada con éxito."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>