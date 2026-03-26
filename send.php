<?php

header("Content-Type: application/json");

// JSON取得
$data = json_decode(file_get_contents("php://input"), true);

// 必須チェック
if (!$data) {
  echo json_encode(["status" => "error", "message" => "データが取得できません"]);
  exit;
}

$company = $data['company'] ?? '';
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$tel = $data['tel'] ?? '';
$inquiry = $data['inquiry'] ?? '';

// 必須項目チェック
if (!$company || !$name || !$email || !$inquiry) {
  echo json_encode(["status" => "error", "message" => "必須項目不足"]);
  exit;
}

// Slack Webhook（※必ず自分の新しいやつにする）
$webhook = "https://hooks.slack.com/services/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";

// メッセージ作成
$message =
"【LPお問い合わせ】\n"
. "会社名: {$company}\n"
. "名前: {$name}\n"
. "メール: {$email}\n"
. "電話: {$tel}\n\n"
. "内容:\n{$inquiry}";

// Slack用payload
$payload = json_encode([
  "text" => $message
], JSON_UNESCAPED_UNICODE);

// POST送信
$options = [
  "http" => [
    "method" => "POST",
    "header" => "Content-Type: application/json",
    "content" => $payload,
    "ignore_errors" => true // ←重要（エラーでも取得できる）
  ]
];

$result = file_get_contents($webhook, false, stream_context_create($options));

// Slack側エラー検知
if ($result === FALSE) {
  echo json_encode(["status" => "error", "message" => "Slack送信失敗"]);
  exit;
}

// 成功
echo json_encode(["status" => "ok"]);