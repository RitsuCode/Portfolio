<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Autoload PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php'; // Adjust path if needed

// Read and decode input
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

// Validate JSON and inputs
if (
    !is_array($data) ||
    !isset($data['name'], $data['email'], $data['message']) ||
    !filter_var($data['email'], FILTER_VALIDATE_EMAIL)
) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input"]);
    exit;
}

// Extract domain and check for MX records
$domain = substr(strrchr($data['email'], "@"), 1);
if (!checkdnsrr($domain, "MX")) {
    http_response_code(400);
    echo json_encode(["message" => "Email domain is not valid or does not accept email"]);
    exit;
}


// Clean inputs
$name    = htmlspecialchars(trim($data['name']));
$email   = htmlspecialchars(trim($data['email']));
$message = htmlspecialchars(trim($data['message']));

// Send email with PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'zglennrichell06@gmail.com';
    $mail->Password   = 'puvzklqgmrlnwpzw';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Sender and recipient
    $mail->setFrom('no-reply@yourdomain.com', 'Contact Form');
    $mail->addAddress('zglennrichell06@gmail.com');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Message from $name in Your Portfolio";

    $mail->Body = "
    <div style=\"font-family: Arial, sans-serif; color: #333; line-height: 1.6;\">
        <h2 style=\"font-size: 20px; margin-bottom: 10px;\">📬 New Message From Your Portfolio</h2>
        <p><strong style=\"font-size: 16px;\">Name:</strong> <span style=\"font-size: 15px;\">$name</span></p>
        <p><strong style=\"font-size: 16px;\">Email:</strong> <span style=\"font-size: 15px;\">$email</span></p>
        <p><strong style=\"font-size: 16px;\">Message:</strong></p>
        <div style=\"font-size: 15px; border-left: 4px solid #ccc; padding-left: 10px; margin-top: 5px;\">
            " . nl2br($message) . "
        </div>
    </div>
    ";

    $mail->AltBody = "Name: $name\nEmail: $email\n\nMessage:\n$message"; // Fallback for plain text clients

    $mail->send();
    echo json_encode(["message" => "Message sent successfully!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Mailer error: " . $mail->ErrorInfo]);
}