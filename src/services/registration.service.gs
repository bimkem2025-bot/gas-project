const RegistrationService = {

  /* ===============================
     GET LIST CLIENT (sheet cur)
     =============================== */
  getClientList: function() {

    const sheet = SpreadsheetApp
      .openById(CONFIG.SPREADSHEET_ID)
      .getSheetByName(CONFIG.SHEETS.CUR);

    const values = sheet.getRange("D2:E").getValues()
      .filter(r => r[1]);

    return values.map(r => ({
      registerNumber: r[0],
      name: r[1]
    }));
  },

  /* ===============================
     GET DETAIL CLIENT A:H
     =============================== */
  getClientDetail: function(name) {

    const sheet = SpreadsheetApp
      .openById(CONFIG.SPREADSHEET_ID)
      .getSheetByName(CONFIG.SHEETS.CUR);

    const data = sheet.getRange("A2:H").getValues();

    const row = data.find(r => r[4] === name);

    return row || null;
  },

  /* ===============================
     REGISTER CLIENT
     =============================== */
  register: function(data) {

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {

      const nomor = this.generateRegisterNumber(data.tanggalLahir);

      RegistrationRepository.save(data, nomor);

      return nomor;

    } finally {
      lock.releaseLock();
    }

  },

  /* ===============================
     GENERATE NOMOR REGISTER
     =============================== */
  generateRegisterNumber: function(tanggalLahir) {

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const age = this.calculateAge(new Date(tanggalLahir));

    let kategori = "";

    if (age < 12) kategori = "AB";
    else if (age < 18) kategori = "AN";
    else kategori = "DW";

    const romawi = [
      "", "I","II","III","IV","V","VI",
      "VII","VIII","IX","X","XI","XII"
    ];

    const nomorUrut = this.getNextNumber(kategori);

    return `${nomorUrut}/${kategori}/${romawi[month]}/${year}`;
  },

  /* ===============================
     HITUNG USIA
     =============================== */
  calculateAge: function(birthDate) {
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },

  /* ===============================
     AMBIL NOMOR URUT BERIKUTNYA
     =============================== */
  getNextNumber: function(kategori) {

    const sheet = SpreadsheetApp
      .openById(CONFIG.SPREADSHEET_ID)
      .getSheetByName(CONFIG.SHEETS.ID);

    const data = sheet.getRange("A2:A").getValues().flat();

    const filtered = data.filter(r => r && r.includes(`/${kategori}/`));

    const lastNumber = filtered.length
      ? Math.max(...filtered.map(r => parseInt(r.split("/")[0])))
      : 0;

    return String(lastNumber + 1).padStart(4, "0");
  }

};
