<?php
  require './config.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  require '../vendor/autoload.php';

  header('Content-Type: application/json');

  $errors = [];
  $name = '';
  $email = '';
  $subject = '';
  $message = '';

  if (!empty($_POST)) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);
    $website = trim($_POST['website'] ?? '');

    if ($website !== '') {
      echo json_encode([
        'status' => 'success',
        'message' => 'Message sent'
      ]);
      exit;
    }

    if (empty($name)) {
      $errors[] = 'Name is empty';
    }

    if (empty($email)) {
      $errors[] = 'Email is empty';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors[] = 'Email is invalid';
    }

    if (empty($subject)) {
      $errors[] = 'Subject is empty';
    }

    if (empty($message)) {
      $errors[] = 'Message is empty';
    }

    if (!empty($errors)) {
      echo json_encode([
        'status' => 'error',
        'message' => $errors
      ]);
      exit;
    }
  }

  $mail = new PHPMailer(true);

  // SERVER SETTINGS
  $mail -> isSMTP();
  $mail -> Host = 'smtp-relay.brevo.com'; // Your SMTP server
  $mail -> SMTPAuth = true;
  $mail -> Username = $_ENV['BREVO_USERNAME'];    // SMTP username
  $mail -> Password = $_ENV['BREVO_PASSWORD'];    // SMTP password
  $mail -> SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail -> Port = (int) $_ENV['BREVO_PORT'];
  $mail -> Timeout = 10;

  // Sender and recipient settings
  $mail -> setFrom($_ENV['BREVO_FROM_EMAIL'], $_ENV['BREVO_FROM_NAME']);
  $mail -> addReplyTo($email, $name);
  $mail -> addAddress($_ENV['BREVO_TO_EMAIL'], $_ENV['BREVO_TO_NAME']);

  // Sending plain text email
  $mail -> isHTML(false); // Set email format to plain text
  $mail -> Subject = $subject;
  $mail -> Body = 
    "Name: $name\n" .
    "Email: $email\n" .
    "Subject: $subject\n" .
    "Message:\n\n$message";

  // Send the email
  try {
    $mail -> send();

    echo json_encode([
      'status' => 'success',
      'message' => 'Message sent'
    ]);
    exit;
  } catch (Exception $e) {
    echo json_encode([
      'status' => 'error',
      'message' => $mail -> ErrorInfo
    ]);
    exit;
  }
?>