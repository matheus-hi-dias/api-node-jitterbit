export function healthCheck(req, res) {
  res.json({
    status: 'ok',
    message: 'API running',
  });
}
