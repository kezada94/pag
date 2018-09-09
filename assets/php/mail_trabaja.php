<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

    // Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the form fields and remove whitespace.
    $nombre = strip_tags(trim($_POST["nombre"]));
    $nombre = str_replace(array("\r", "\n"), array(" ", " "), $nombre);

    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    $mensaje = trim($_POST["mensaje"]);

    $upload_folder = "../../uploads/";

    $name_of_uploaded_file = basename($_FILES['file']['name']);

    $type_of_uploaded_file = pathinfo($name_of_uploaded_file, PATHINFO_EXTENSION);

    $size_of_uploaded_file = $_FILES["file"]["size"] / 1024;//size in KBs
        
    //Settings
    $max_allowed_file_size = 5000; // size in KB
    $allowed_extensions = array("doc", "docx", "pdf");

    //------ Validate the file extension -----
    $allowed_ext = false;
    for ($i = 0; $i < sizeof($allowed_extensions); $i++) {
        if (strcasecmp($allowed_extensions[$i], $type_of_uploaded_file) == 0) {
            $allowed_ext = true;
        }
    }

    if (!$allowed_ext) {
        http_response_code(403);
        echo "La extensión del archivo no esta permitida. Utilice doc, docx o pdf.";
        exit();
    } else if ($size_of_uploaded_file > $max_allowed_file_size) {
        http_response_code(405);
        echo "Archivo demasiado grande. Tamaño máximo 5MB.";
        exit();
    }
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
        
        // Set the recipient email address.
        $recipient = "contacto@seguriaxion.cl";

        // Set the email subject.
    $subject = "Curriculum de $nombre, desde seguriaxion.cl";

        // Build the email content.
    $email_content = "Nombre: $nombre\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Descripcion:\n$mensaje\n";

    //copy the temp. uploaded file to uploads folder
    $path_of_uploaded_file = $upload_folder . $name_of_uploaded_file;
    $tmp_path = $_FILES["file"]["tmp_name"];




    move_uploaded_file($tmp_path, $path_of_uploaded_file);

    $mail = new PHPMailer();

    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true;  // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = 'seguriaxion.cl';
    $mail->Port = 465;
    $mail->Username = '_mainaccount@seguriaxion.cl';
    $mail->Password = 'MBDM9VfJMreN';

    $mail->From = "seguljhu@seguriaxion.cl";
    $mail->AddAddress($recipient);
    $mail->Subject = $subject;
    $mail->Body = $email_content;
    $mail->addAttachment($path_of_uploaded_file);

        
        // Send the email.
    if ($mail->send()) {
            // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Gracias! Tu solicitud será revisada por el equipo.";
    } else {
            // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Ops! Algo ocurrió, no se pudo enviar el mensaje.";
    }


}
?>