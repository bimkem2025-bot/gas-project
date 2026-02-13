function doGet() {
  return HtmlService
    .createTemplateFromFile('views/index')
    .evaluate()
    .setTitle('Sistem Registrasi')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ===== GLOBAL BRIDGE FUNCTIONS (WAJIB untuk HtmlService) ===== */

function getClients() {
  return RegistrationService.getClientList();
}

function getClientDetail(name) {
  return RegistrationService.getClientDetail(name);
}

function register(data) {
  return RegistrationService.register(data);
}
