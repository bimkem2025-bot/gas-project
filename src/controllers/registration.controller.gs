const RegistrationController = {

  getClients: function() {
    const data = RegistrationService.getClientList();
    return ResponseUtil.json(data);
  },

  register: function(e) {
    const data = JSON.parse(e.postData.contents);
    const result = RegistrationService.register(data);
    return ResponseUtil.json(result);
  }

};
