const Validators = {

  validateRegistration: function(data) {

    if (!data.name) {
      throw new Error("Nama wajib diisi");
    }

    if (!data.email || !data.email.includes("@")) {
      throw new Error("Email tidak valid");
    }

  }

};
