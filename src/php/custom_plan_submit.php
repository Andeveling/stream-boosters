<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and prepare data
    $formData = json_decode(file_get_contents('php://input'), true);

    $message = "<html><body>";
    $message .= "<h1>Detalles de la Propuesta</h1>";

    if (!empty($formData)) {
        foreach ($formData as $key => $value) {
            $key_formatted = ucwords(str_replace('_', ' ', $key));
            $value_formatted = htmlspecialchars($value);
            $message .= "<p><strong>" . $key_formatted . ":</strong> " . $value_formatted . "</p>";
        }
        $message .= "</body></html>";
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Datos recibidos correctamente.",
            "data" => $formData,
            "html" => $message
        ]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No se recibieron datos del formulario."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>