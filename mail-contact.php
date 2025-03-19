<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $mail = new PHPMailer(true);

        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF; // Change to DEBUG_SERVER for debugging
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'devmojeed@gmail.com'; // Replace with your Gmail address
        $mail->Password = 'jkrimzgkcgqqqgfu'; // Replace with your app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        //Recipients
        $mail->setFrom($_POST['email'], $_POST['name']); // Use form data
        $mail->addAddress('cloakedagency@gmail.com'); // Your recipient email

        //Content
        $mail->isHTML(true); // Enable HTML
        $mail->Subject = $_POST['subject'];

        // Format the email body
        $body = "<b>Name:</b> " . htmlspecialchars($_POST['name']) . "<br>"; // Bold name
        $body .= "<b>Email:</b> " . htmlspecialchars($_POST['email']) . "<br>"; // Add email
        $body .= "<b>Service need:</b> " . htmlspecialchars($_POST['subject']) . "<br>"; // Subject with label
        $body .= "<b>Phone number:</b> " . htmlspecialchars($_POST['phone']) . "<br><br>"; // Phone number
        $body .= "<b>Note: </b><br>" . nl2br(htmlspecialchars($_POST['note'])); // Message body with line breaks

        $mail->Body = $body;


        $mail->send();
        echo 'success'; // Simple success message for AJAX
    } catch (Exception $e) {
        echo 'error'; // Simple error message for AJAX
        error_log("PHPMailer Error: " . $mail->ErrorInfo); // Log error
    }
} else {
    echo 'error'; // Handle direct access
}
?>