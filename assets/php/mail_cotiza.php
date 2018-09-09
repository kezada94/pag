<?php

    // Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
    $nombre = strip_tags(trim($_POST["nombre"]));
    $nombre = str_replace(array("\r", "\n"), array(" ", " "), $nombre);

    $afiliacion = strip_tags(trim($_POST["afiliacion"]));
    $afiliacion = str_replace(array("\r", "\n"), array(" ", " "), $afiliacion);

    $direccion = strip_tags(trim($_POST["direccion"]));
    $direccion = str_replace(array("\r", "\n"), array(" ", " "), $direccion);

    $comuna = strip_tags(trim($_POST["comuna"]));
    $comuna = str_replace(array("\r", "\n"), array(" ", " "), $comuna);

    $telefono = strip_tags(trim($_POST["telefono"]));
    $telefono = str_replace(array("\r", "\n"), array(" ", " "), $telefono);

    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    $mensaje = trim($_POST["mensaje"]);

        // Set the recipient email address.
        $recipient = "contacto@seguriaxion.cl";

        // Set the email subject.
    $subject = "$afiliacion solicita una cotizacion";

        // Build the email content.
    $email_content = "Nombre: $nombre\n";
    $email_content .= "Afiliacion: $afiliacion\n";
    $email_content .= "Dirección: $direccion\n";
    $email_content .= "Comuna: $comuna\n";
    $email_content .= "Telefono: $telefono\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensaje:\n$mensaje\n";

    $response = $_POST["g-recaptcha-response"];
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => '6Lcvq2wUAAAAALacbII5Tk9jimYRZkcIhk5twukY',
        'response' => $_POST["g-recaptcha-response"]
    );
    $options = array(
        'http' => array(
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);

    if ($captcha_success->success == false) {
        http_response_code(500);
        echo "Por favor, completa el captcha.";
        exit();
    } 
        // Build the email headers.

        // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Gracias! Tu mensaje ha sido enviado.";
    } else {
            // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Ops! Algo ocurrió, no se pudo enviar el mensaje.";
    }

} else {
        // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "Hubo un problema con tu petición, intente nuevamente.";
}

?>