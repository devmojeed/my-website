<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// header("Content-Type: text/plain"); // Remove or comment out
// echo "PHP script is being accessed via POST."; // Remove or comment out
// exit(); // Remove or comment out

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $mail = new PHPMailer(true);

        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'devmojeed@gmail.com';
        $mail->Password = 'jkrimzgkcgqqqgfu';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Recipients
        $mail->setFrom('devmojeed@gmail.com', 'Cloaked Agency Web Form');
        $mail->addAddress('cloakedagency@gmail.com');

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Service Contact Form Submission';

        $body = '<p><strong>Full Name:</strong> ' . htmlspecialchars($_POST['full_name']) . '</p>';
        $body .= '<p><strong>Phone Number:</strong> ' . htmlspecialchars($_POST['phone_number']) . '</p>';
        $body .= '<p><strong>Date and Time:</strong> ' . date('Y-m-d H:i:s') . '</p>';
        if (isset($_SERVER['REMOTE_ADDR'])) {
            $body .= '<p><strong>IP Address:</strong> ' . $_SERVER['REMOTE_ADDR'] . '</p>';
        }
        if (isset($_SERVER['HTTP_REFERER'])) {
            $body .= '<p><strong>Submitted From:</strong> ' . htmlspecialchars($_SERVER['HTTP_REFERER']) . '</p>';
        }

        $mail->Body = $body;

        $mail->send();
        echo 'Thank you! Your message has been sent. We will be in touch with you soon.'; // No referer now, just success
    } catch (Exception $e) {
        echo 'error';
        error_log("PHPMailer Error: " . $mail->ErrorInfo);
    }
} else {
    echo 'error';
}
?>