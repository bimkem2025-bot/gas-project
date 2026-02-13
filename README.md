# gas-project

Web app sederhana untuk manajemen task yang siap dipakai di GitHub Codespaces.

## Fitur yang sudah bekerja
- Tambah task
- Checklist selesai/belum selesai
- Edit task
- Hapus task
- Filter: semua / belum selesai / selesai
- Penyimpanan otomatis di `localStorage`
- Endpoint health check di `/api/health`

## Jalankan lokal / di Codespaces
```bash
npm install
npm start
```

Aplikasi berjalan di port `3000` (atau nilai dari environment variable `PORT`).

## Preview di Codespaces
1. Buka terminal Codespaces.
2. Jalankan:
   ```bash
   npm install
   npm start
   ```
3. Saat muncul notifikasi port `3000`, klik **Make Public** (opsional) lalu **Open in Browser**.
4. Atau buka tab **Ports** dan klik ikon globe pada port `3000`.

## Testing
```bash
npm test
```
