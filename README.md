# gas-project

Repo ini sekarang mendukung 2 target:
1. **Preview web app di Codespaces** (Node server, port 3000).
2. **Deploy ke Google Apps Script** via `clasp` (folder `gas/`).

---

## 1) Menjalankan & preview web app di Codespaces

### Langkah cepat
```bash
npm install
npm start
```

Server jalan di `http://0.0.0.0:3000`.

### Buka preview
- Buka tab **Ports** di Codespaces.
- Cari port `3000`.
- Klik **Open in Browser** / ikon globe.

> Tips: file `.devcontainer/devcontainer.json` sudah mengatur auto-forward port 3000.

### Fitur yang bisa dites di browser
- Tambah task
- Checklist selesai/belum selesai
- Edit task
- Hapus task
- Filter (Semua / Belum Selesai / Selesai)
- Persist data dengan `localStorage`

### Validasi backend
Setelah server jalan, test endpoint health:
```bash
npm run health:check
```

---

## 2) Commit perubahan di Codespaces

```bash
git add .
git commit -m "pesan commit kamu"
git push
```

Kalau branch belum punya upstream:
```bash
git push -u origin <nama-branch>
```

---

## 3) Push ke Google Apps Script (clasp)

### Prasyarat
- Punya akun Google.
- Sudah install dependency project (`npm install`).
- Sudah membuat project Apps Script (atau script ID existing).

### Step-by-step
1. Login clasp dari Codespaces:
   ```bash
   npm run clasp:login
   ```
   Gunakan URL yang muncul, login Google, lalu paste code verifikasi.

2. Siapkan file `.clasp.json` dari template:
   ```bash
   cp .clasp.example.json .clasp.json
   ```

3. Isi `scriptId` pada `.clasp.json` dengan Script ID dari Apps Script project kamu.

4. Cek file yang akan dikirim:
   ```bash
   npm run clasp:status
   ```

5. Push ke Apps Script:
   ```bash
   npm run clasp:push
   ```

6. (Opsional) Buat deployment baru:
   ```bash
   npm run clasp:deploy
   ```

---

## Struktur penting
- `server.js` → server lokal untuk preview di Codespaces.
- `public/` → UI untuk mode preview lokal.
- `gas/` → source yang dipush ke Apps Script (`Code.gs`, `Index.html`).
- `.clasp.example.json` → template konfigurasi clasp.
