const RegistrationRepository = {

  save: function(data, nomor) {

    const sheet = SpreadsheetApp
      .openById(CONFIG.SPREADSHEET_ID)
      .getSheetByName(CONFIG.SHEETS.ID);

    sheet.appendRow([
      nomor,
      data.nama,
      data.id,
      data.tempatLahir,
      data.tanggalLahir,
      data.jenisKelamin,
      data.noTelp
    ]);

  }

};
