/* ==========================================================================
   JadwalKu — Kelas X.4 SMAN 1 Kramat
   Vanilla JS. Real-time WIB, deteksi KBM, sinkronisasi deadline otomatis,
   tugas interaktif + localStorage, notifikasi deadline 24 jam.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. DATABASE JADWAL X.4  (Senin=1 ... Jumat=5)
     Diambil persis dari kolom "X-4" pada PDF jadwal SMAN 1 Kramat
     Semester 1 T.A. 2026/2027.
     tipe: "upacara" | "pelajaran" | "istirahat" | "berseri"
     ---------------------------------------------------------------------- */
  var JADWAL = {
    1: [
      // SENIN
      { jamKe: "U", mulai: "06:30", selesai: "07:00", mapel: "Upacara", tipe: "upacara" },
      { jamKe: 1, mulai: "07:00", selesai: "07:45", mapel: "Matematika", tipe: "pelajaran" },
      { jamKe: 2, mulai: "07:45", selesai: "08:30", mapel: "Matematika", tipe: "pelajaran" },
      { jamKe: 3, mulai: "08:30", selesai: "09:15", mapel: "Bahasa Jawa", tipe: "pelajaran" },
      { jamKe: 4, mulai: "09:15", selesai: "10:00", mapel: "Bahasa Jawa", tipe: "pelajaran" },
      { jamKe: "-", mulai: "10:00", selesai: "10:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 5, mulai: "10:15", selesai: "11:00", mapel: "Geografi", tipe: "pelajaran" },
      { jamKe: 6, mulai: "11:00", selesai: "11:45", mapel: "Geografi", tipe: "pelajaran" },
      { jamKe: "-", mulai: "11:45", selesai: "12:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 7, mulai: "12:15", selesai: "13:00", mapel: "PAI-BP", tipe: "pelajaran" },
      { jamKe: 8, mulai: "13:00", selesai: "13:45", mapel: "Ekonomi", tipe: "pelajaran" },
      { jamKe: 9, mulai: "13:45", selesai: "14:30", mapel: "KKA", tipe: "pelajaran" },
      { jamKe: 10, mulai: "14:30", selesai: "15:15", mapel: "KKA", tipe: "pelajaran" },
    ],
    2: [
      // SELASA
      { jamKe: 1, mulai: "07:00", selesai: "07:45", mapel: "Fisika", tipe: "pelajaran" },
      { jamKe: 2, mulai: "07:45", selesai: "08:30", mapel: "Fisika", tipe: "pelajaran" },
      { jamKe: 3, mulai: "08:30", selesai: "09:15", mapel: "Bahasa Inggris", tipe: "pelajaran" },
      { jamKe: 4, mulai: "09:15", selesai: "10:00", mapel: "Olahraga", tipe: "pelajaran" },
      { jamKe: "-", mulai: "10:00", selesai: "10:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 5, mulai: "10:15", selesai: "11:00", mapel: "Olahraga", tipe: "pelajaran" },
      { jamKe: 6, mulai: "11:00", selesai: "11:45", mapel: "Olahraga", tipe: "pelajaran" },
      { jamKe: "-", mulai: "11:45", selesai: "12:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 7, mulai: "12:15", selesai: "13:00", mapel: "BK", tipe: "pelajaran" },
      { jamKe: 8, mulai: "13:00", selesai: "13:45", mapel: "BK", tipe: "pelajaran" },
      { jamKe: 9, mulai: "13:45", selesai: "14:30", mapel: "Sosiologi", tipe: "pelajaran" },
      { jamKe: 10, mulai: "14:30", selesai: "15:15", mapel: "Sosiologi", tipe: "pelajaran" },
    ],
    3: [
      // RABU
      { jamKe: 1, mulai: "07:00", selesai: "07:45", mapel: "Bahasa Inggris", tipe: "pelajaran" },
      { jamKe: 2, mulai: "07:45", selesai: "08:30", mapel: "Bahasa Inggris", tipe: "pelajaran" },
      { jamKe: 3, mulai: "08:30", selesai: "09:15", mapel: "Informatika", tipe: "pelajaran" },
      { jamKe: 4, mulai: "09:15", selesai: "10:00", mapel: "Informatika", tipe: "pelajaran" },
      { jamKe: "-", mulai: "10:00", selesai: "10:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 5, mulai: "10:15", selesai: "11:00", mapel: "Bahasa Indonesia", tipe: "pelajaran" },
      { jamKe: 6, mulai: "11:00", selesai: "11:45", mapel: "Bahasa Indonesia", tipe: "pelajaran" },
      { jamKe: "-", mulai: "11:45", selesai: "12:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 7, mulai: "12:15", selesai: "13:00", mapel: "Ekonomi", tipe: "pelajaran" },
      { jamKe: 8, mulai: "13:00", selesai: "13:45", mapel: "Ekonomi", tipe: "pelajaran" },
      { jamKe: 9, mulai: "13:45", selesai: "14:30", mapel: "PAI-BP", tipe: "pelajaran" },
      { jamKe: 10, mulai: "14:30", selesai: "15:15", mapel: "PAI-BP", tipe: "pelajaran" },
    ],
    4: [
      // KAMIS
      { jamKe: 1, mulai: "07:00", selesai: "07:45", mapel: "Seni Budaya", tipe: "pelajaran" },
      { jamKe: 2, mulai: "07:45", selesai: "08:30", mapel: "Seni Budaya", tipe: "pelajaran" },
      { jamKe: 3, mulai: "08:30", selesai: "09:15", mapel: "Bahasa Indonesia", tipe: "pelajaran" },
      { jamKe: 4, mulai: "09:15", selesai: "10:00", mapel: "Bahasa Indonesia", tipe: "pelajaran" },
      { jamKe: "-", mulai: "10:00", selesai: "10:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 5, mulai: "10:15", selesai: "11:00", mapel: "PKn", tipe: "pelajaran" },
      { jamKe: 6, mulai: "11:00", selesai: "11:45", mapel: "PKn", tipe: "pelajaran" },
      { jamKe: "-", mulai: "11:45", selesai: "12:15", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 7, mulai: "12:15", selesai: "13:00", mapel: "Kimia", tipe: "pelajaran" },
      { jamKe: 8, mulai: "13:00", selesai: "13:45", mapel: "Kimia", tipe: "pelajaran" },
      { jamKe: 9, mulai: "13:45", selesai: "14:30", mapel: "Biologi", tipe: "pelajaran" },
      { jamKe: 10, mulai: "14:30", selesai: "15:15", mapel: "Biologi", tipe: "pelajaran" },
    ],
    5: [
      // JUMAT
      { jamKe: 1, mulai: "07:00", selesai: "07:40", mapel: "Jumat Berseri", tipe: "berseri" },
      { jamKe: 2, mulai: "07:40", selesai: "08:20", mapel: "Jumat Berseri", tipe: "berseri" },
      { jamKe: 3, mulai: "08:20", selesai: "09:00", mapel: "Sejarah", tipe: "pelajaran" },
      { jamKe: 4, mulai: "09:00", selesai: "09:40", mapel: "Sejarah", tipe: "pelajaran" },
      { jamKe: "-", mulai: "09:40", selesai: "09:55", mapel: "Istirahat", tipe: "istirahat" },
      { jamKe: 5, mulai: "09:55", selesai: "10:35", mapel: "Matematika", tipe: "pelajaran" },
      { jamKe: 6, mulai: "10:35", selesai: "11:15", mapel: "Matematika", tipe: "pelajaran" },
    ],
  };

  var NAMA_HARI = {
    0: "Minggu",
    1: "Senin",
    2: "Selasa",
    3: "Rabu",
    4: "Kamis",
    5: "Jumat",
    6: "Sabtu",
  };

  // Daftar mapel valid untuk dropdown (unik, dari jadwal + mapel umum kelas X).
  var DAFTAR_MAPEL = [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Bahasa Jawa",
    "PAI-BP",
    "PKn",
    "Sejarah",
    "Geografi",
    "Ekonomi",
    "Sosiologi",
    "Fisika",
    "Kimia",
    "Biologi",
    "Informatika",
    "KKA",
    "Seni Budaya",
    "Olahraga",
    "BK",
  ];

  var STORAGE_KEY = "jadwalku_x4_tugas_v1";
  var TZ = "Asia/Jakarta";

  /* ----------------------------------------------------------------------
     2. STATE + ELEMEN
     ---------------------------------------------------------------------- */
  var tugasList = [];
  var filterAktif = "aktif";
  var hariDipilih = null; // untuk tab jadwal
  var notifDiizinkan = false;
  var sudahDinotif = {}; // id -> true, agar tidak spam notifikasi browser

  var el = {};
  function grab() {
    el.jam = document.getElementById("jam-realtime");
    el.hari = document.getElementById("hari-realtime");

    el.cardStatus = document.getElementById("card-status");
    el.statusLabel = document.getElementById("status-label");
    el.statusJamKe = document.getElementById("status-jam-ke");
    el.statusMapel = document.getElementById("status-mapel");
    el.statusDetail = document.getElementById("status-detail");
    el.statusNext = document.getElementById("status-berikutnya");
    el.progWrap = document.getElementById("progress-wrap");
    el.progFill = document.getElementById("progress-fill");
    el.progText = document.getElementById("progress-text");

    el.banner = document.getElementById("banner-notifikasi");
    el.bannerTeks = document.getElementById("banner-teks");
    el.btnIzinNotif = document.getElementById("btn-izin-notif");

    el.daftarTugas = document.getElementById("daftar-tugas");
    el.tugasKosong = document.getElementById("tugas-kosong");
    el.ringkasan = document.getElementById("ringkasan-tugas");

    el.tabHari = document.getElementById("tab-hari");
    el.daftarJadwal = document.getElementById("daftar-jadwal");

    el.btnBuka = document.getElementById("btn-buka-modal");
    el.overlay = document.getElementById("modal-overlay");
    el.btnTutup = document.getElementById("btn-tutup-modal");
    el.btnBatal = document.getElementById("btn-batal");
    el.form = document.getElementById("form-tugas");
    el.inputMapel = document.getElementById("input-mapel");
    el.inputDetail = document.getElementById("input-detail");
    el.previewDeadline = document.getElementById("preview-deadline");
    el.formError = document.getElementById("form-error");

    el.toast = document.getElementById("toast");
  }

  /* ----------------------------------------------------------------------
     3. UTIL WAKTU (WIB / Asia/Jakarta)
     ---------------------------------------------------------------------- */

  // Ambil komponen waktu "sekarang" di zona Asia/Jakarta, apapun zona device.
  function nowWIB() {
    var parts = new Intl.DateTimeFormat("id-ID", {
      timeZone: TZ,
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(new Date());

    var map = {};
    parts.forEach(function (p) {
      map[p.type] = p.value;
    });

    // Cari indeks hari (0-6) dari label weekday id-ID.
    var dayIndex = 0;
    for (var i = 0; i < 7; i++) {
      if (NAMA_HARI[i].toLowerCase() === (map.weekday || "").toLowerCase()) {
        dayIndex = i;
        break;
      }
    }

    var jam = parseInt(map.hour, 10);
    if (jam === 24) jam = 0; // beberapa environment memakai 24 untuk tengah malam

    return {
      dayIndex: dayIndex,
      hari: NAMA_HARI[dayIndex],
      jam: jam,
      menit: parseInt(map.minute, 10),
      detik: parseInt(map.second, 10),
      tanggal: parseInt(map.day, 10),
      bulan: map.month,
      tahun: parseInt(map.year, 10),
      totalMenit: jam * 60 + parseInt(map.minute, 10),
    };
  }

  function jamKeMenit(hhmm) {
    var b = hhmm.split(":");
    return parseInt(b[0], 10) * 60 + parseInt(b[1], 10);
  }

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  /* ----------------------------------------------------------------------
     4. HEADER JAM REAL-TIME
     ---------------------------------------------------------------------- */
  function tickJam() {
    var n = nowWIB();
    el.jam.textContent = pad(n.jam) + ":" + pad(n.menit) + ":" + pad(n.detik);
    el.hari.textContent =
      n.hari + ", " + pad(n.tanggal) + "/" + n.bulan + "/" + n.tahun;
  }

  /* ----------------------------------------------------------------------
     5. STATUS KBM REAL-TIME
     ---------------------------------------------------------------------- */
  function updateStatusKBM() {
    var n = nowWIB();
    var jadwalHari = JADWAL[n.dayIndex] || null;

    // Reset
    el.cardStatus.classList.remove("is-active");
    el.progWrap.hidden = true;
    el.statusNext.textContent = "";

    if (!jadwalHari) {
      // Sabtu / Minggu
      el.statusLabel.textContent = "Libur";
      el.statusJamKe.textContent = "";
      el.statusMapel.textContent = "Hari Libur";
      el.statusDetail.textContent =
        "Tidak ada KBM untuk kelas X.4 di hari " + n.hari + ".";
      renderStatusNextHariLain(n.dayIndex);
      return;
    }

    var sekarang = n.totalMenit;
    var slotAktif = null;
    var slotBerikut = null;

    for (var i = 0; i < jadwalHari.length; i++) {
      var s = jadwalHari[i];
      var m1 = jamKeMenit(s.mulai);
      var m2 = jamKeMenit(s.selesai);
      if (sekarang >= m1 && sekarang < m2) {
        slotAktif = s;
        slotBerikut = jadwalHari[i + 1] || null;
        break;
      }
      if (sekarang < m1 && !slotBerikut) {
        slotBerikut = s;
      }
    }

    if (slotAktif) {
      var berlangsung =
        slotAktif.tipe === "pelajaran" ||
        slotAktif.tipe === "upacara" ||
        slotAktif.tipe === "berseri";

      if (berlangsung) {
        el.cardStatus.classList.add("is-active");
        el.statusLabel.textContent = "Sedang Berlangsung";
      } else {
        el.statusLabel.textContent = "Istirahat";
      }

      el.statusJamKe.textContent =
        typeof slotAktif.jamKe === "number"
          ? "Jam ke-" + slotAktif.jamKe
          : "";
      el.statusMapel.textContent = slotAktif.mapel;
      el.statusDetail.textContent =
        "Pukul " + slotAktif.mulai + " – " + slotAktif.selesai + " WIB";

      // Progress bar slot berjalan
      var m1a = jamKeMenit(slotAktif.mulai);
      var m2a = jamKeMenit(slotAktif.selesai);
      var totalDur = m2a - m1a;
      var lewat = sekarang - m1a;
      var persen = totalDur > 0 ? Math.min(100, Math.round((lewat / totalDur) * 100)) : 0;
      var sisa = Math.max(0, m2a - sekarang);
      el.progWrap.hidden = false;
      el.progFill.style.width = persen + "%";
      el.progText.textContent = "sisa " + sisa + " mnt";

      if (slotBerikut) {
        el.statusNext.innerHTML =
          "Berikutnya: <strong>" +
          escapeHtml(slotBerikut.mapel) +
          "</strong> (" +
          slotBerikut.mulai +
          ")";
      }
      return;
    }

    // Tidak ada slot aktif -> di luar jam KBM
    el.statusLabel.textContent = "Luar Jam KBM";
    el.statusMapel.textContent = "Tidak Ada KBM";
    el.statusJamKe.textContent = "";

    var jamPertama = jadwalHari[0];
    var jamTerakhir = jadwalHari[jadwalHari.length - 1];

    if (sekarang < jamKeMenit(jamPertama.mulai)) {
      el.statusDetail.textContent =
        "Belum ada KBM. Hari ini dimulai pukul " + jamPertama.mulai + " WIB.";
      el.statusNext.innerHTML =
        "Pelajaran pertama: <strong>" +
        escapeHtml(jamPertama.mapel) +
        "</strong> (" +
        jamPertama.mulai +
        ")";
    } else if (sekarang >= jamKeMenit(jamTerakhir.selesai)) {
      el.statusDetail.textContent =
        "KBM hari ini sudah selesai (berakhir " + jamTerakhir.selesai + " WIB).";
      renderStatusNextHariLain(n.dayIndex);
    } else {
      el.statusDetail.textContent = "Saat ini di luar jam pelajaran.";
      if (slotBerikut) {
        el.statusNext.innerHTML =
          "Berikutnya: <strong>" +
          escapeHtml(slotBerikut.mapel) +
          "</strong> (" +
          slotBerikut.mulai +
          ")";
      }
    }
  }

  function renderStatusNextHariLain(fromDayIndex) {
    // Cari hari KBM berikutnya (untuk info "pelajaran pertama besok/…")
    for (var add = 1; add <= 7; add++) {
      var d = (fromDayIndex + add) % 7;
      if (JADWAL[d] && JADWAL[d].length) {
        var label = add === 1 ? "Besok (" + NAMA_HARI[d] + ")" : NAMA_HARI[d];
        var first = JADWAL[d][0];
        el.statusNext.innerHTML =
          "KBM berikutnya: <strong>" +
          escapeHtml(label) +
          "</strong> mulai " +
          first.mulai +
          " – " +
          escapeHtml(first.mapel);
        return;
      }
    }
  }

  /* ----------------------------------------------------------------------
     6. SINKRONISASI DEADLINE OTOMATIS
     Cari kapan mapel berikutnya muncul di jadwal (mulai dari hari & jam ini).
     Kembalikan { hariIndex, mulai, selisihHari, selisihJamDari now, label }.
     ---------------------------------------------------------------------- */
  function cariDeadline(mapel) {
    var n = nowWIB();

    for (var add = 0; add <= 7; add++) {
      var dayIndex = (n.dayIndex + add) % 7;
      var jadwalHari = JADWAL[dayIndex];
      if (!jadwalHari) continue;

      for (var i = 0; i < jadwalHari.length; i++) {
        var s = jadwalHari[i];
        if (s.tipe !== "pelajaran") continue;
        if (!samaMapel(s.mapel, mapel)) continue;

        var menitSlot = jamKeMenit(s.mulai);

        // Untuk hari ini (add=0), hanya hitung kalau slotnya belum lewat mulai.
        if (add === 0 && menitSlot <= n.totalMenit) continue;

        // Selisih total menit dari "sekarang" ke mulai slot tsb.
        var selisihMenit = add * 24 * 60 + (menitSlot - n.totalMenit);
        var selisihJam = selisihMenit / 60;

        var label;
        if (add === 0) label = "Hari Ini";
        else if (add === 1) label = "Besok";
        else label = "Hari " + NAMA_HARI[dayIndex];

        return {
          ada: true,
          hariIndex: dayIndex,
          hari: NAMA_HARI[dayIndex],
          mulai: s.mulai,
          jamKe: s.jamKe,
          selisihJam: selisihJam,
          selisihMenit: selisihMenit,
          label: label,
        };
      }
    }

    return { ada: false };
  }

  function samaMapel(a, b) {
    return normalisasi(a) === normalisasi(b);
  }
  function normalisasi(s) {
    return (s || "")
      .toLowerCase()
      .replace(/[\s.\-]/g, "")
      .replace("bindonesia", "bahasaindonesia")
      .replace("binggris", "bahasainggris")
      .replace("bjawa", "bahasajawa");
  }

  /* ----------------------------------------------------------------------
     7. TUGAS: localStorage, render, aksi
     ---------------------------------------------------------------------- */
  function muatTugas() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      tugasList = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(tugasList)) tugasList = [];
    } catch (e) {
      tugasList = [];
    }
  }

  function simpanTugas() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tugasList));
    } catch (e) {
      showToast("Gagal menyimpan data.");
    }
  }

  function renderTugas() {
    var frag = document.createDocumentFragment();

    var terlihat = tugasList.filter(function (t) {
      if (filterAktif === "aktif") return !t.completed;
      if (filterAktif === "selesai") return t.completed;
      return true;
    });

    // Urutkan: urgent dulu, lalu deadline terdekat, selesai di bawah.
    terlihat.sort(function (a, b) {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      var da = cariDeadline(a.mapel);
      var db = cariDeadline(b.mapel);
      var va = da.ada ? da.selisihMenit : Infinity;
      var vb = db.ada ? db.selisihMenit : Infinity;
      return va - vb;
    });

    el.daftarTugas.innerHTML = "";

    terlihat.forEach(function (t) {
      frag.appendChild(buatItemTugas(t));
    });
    el.daftarTugas.appendChild(frag);

    // empty state
    el.tugasKosong.hidden = terlihat.length !== 0;

    // ringkasan
    var aktif = tugasList.filter(function (t) {
      return !t.completed;
    }).length;
    var total = tugasList.length;
    if (total === 0) el.ringkasan.textContent = "Belum ada tugas";
    else
      el.ringkasan.textContent =
        aktif + " tugas aktif dari " + total + " total";
  }

  function buatItemTugas(t) {
    var li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = t.id;

    var dl = cariDeadline(t.mapel);
    var urgent = !t.completed && dl.ada && dl.selisihJam <= 24;

    if (t.completed) li.classList.add("is-done");
    if (urgent) li.classList.add("is-urgent");

    // tombol bulat
    var check = document.createElement("button");
    check.type = "button";
    check.className = "task-check";
    check.setAttribute(
      "aria-label",
      t.completed ? "Tandai belum selesai" : "Tandai selesai"
    );
    check.setAttribute("aria-pressed", t.completed ? "true" : "false");
    check.innerHTML = '<span class="tick" aria-hidden="true">&#10003;</span>';
    check.addEventListener("click", function () {
      toggleTugas(t.id);
    });

    // body
    var body = document.createElement("div");
    body.className = "task-body";

    var mapel = document.createElement("span");
    mapel.className = "task-mapel";
    mapel.textContent = t.mapel;

    var detail = document.createElement("span");
    detail.className = "task-detail";
    detail.textContent = t.detail;

    var meta = document.createElement("div");
    meta.className = "task-meta";

    if (t.completed) {
      meta.appendChild(buatTag("Selesai", "tag-done"));
    } else if (dl.ada) {
      var teksDl = dl.label + " · " + dl.mulai;
      if (typeof dl.jamKe === "number") teksDl += " (Jam ke-" + dl.jamKe + ")";
      meta.appendChild(buatTag(teksDl, "tag-deadline"));
      if (urgent) {
        meta.appendChild(
          buatTag("< 24 jam — segera!", "tag-urgent")
        );
      }
    } else {
      meta.appendChild(buatTag("Deadline tidak ditemukan", ""));
    }

    body.appendChild(mapel);
    body.appendChild(detail);
    body.appendChild(meta);

    // hapus
    var del = document.createElement("button");
    del.type = "button";
    del.className = "task-delete";
    del.textContent = "Hapus";
    del.setAttribute("aria-label", "Hapus tugas " + t.mapel);
    del.addEventListener("click", function () {
      hapusTugas(t.id);
    });

    li.appendChild(check);
    li.appendChild(body);
    li.appendChild(del);
    return li;
  }

  function buatTag(teks, extraClass) {
    var span = document.createElement("span");
    span.className = "tag" + (extraClass ? " " + extraClass : "");
    span.textContent = teks;
    return span;
  }

  function toggleTugas(id) {
    var t = cariTugas(id);
    if (!t) return;
    t.completed = !t.completed;
    if (t.completed) delete sudahDinotif[id];
    simpanTugas();
    renderTugas();
    cekNotifikasi();
    showToast(t.completed ? "Tugas selesai. Mantap!" : "Tugas dibuka kembali.");
  }

  function hapusTugas(id) {
    tugasList = tugasList.filter(function (t) {
      return t.id !== id;
    });
    delete sudahDinotif[id];
    simpanTugas();
    renderTugas();
    cekNotifikasi();
    showToast("Tugas dihapus.");
  }

  function cariTugas(id) {
    for (var i = 0; i < tugasList.length; i++) {
      if (tugasList[i].id === id) return tugasList[i];
    }
    return null;
  }

  function tambahTugas(mapel, detail) {
    tugasList.push({
      id: "t" + Date.now() + Math.random().toString(36).slice(2, 6),
      mapel: mapel,
      detail: detail,
      completed: false,
      dibuat: Date.now(),
    });
    simpanTugas();
    renderTugas();
    cekNotifikasi();
  }

  /* ----------------------------------------------------------------------
     8. NOTIFIKASI DEADLINE 24 JAM (banner + Web Notifications API)
     ---------------------------------------------------------------------- */
  function cekNotifikasi() {
    var urgent = [];
    tugasList.forEach(function (t) {
      if (t.completed) return;
      var dl = cariDeadline(t.mapel);
      if (dl.ada && dl.selisihJam <= 24) {
        urgent.push({ tugas: t, dl: dl });
      }
    });

    if (urgent.length === 0) {
      el.banner.hidden = true;
    } else {
      el.banner.hidden = false;
      var teks;
      if (urgent.length === 1) {
        var u = urgent[0];
        teks =
          u.tugas.mapel +
          " (" +
          u.tugas.detail +
          ") — mapel dimulai " +
          u.dl.label.toLowerCase() +
          " pukul " +
          u.dl.mulai +
          ".";
      } else {
        teks =
          urgent.length +
          " tugas memiliki mapel yang dimulai dalam 24 jam ke depan. Segera selesaikan!";
      }
      el.bannerTeks.textContent = teks;

      // tombol izin notif hanya tampil kalau belum diizinkan & didukung
      var support = "Notification" in window;
      el.btnIzinNotif.hidden =
        !support || notifDiizinkan || Notification.permission === "granted";
    }

    // Notifikasi browser (sekali per tugas urgent)
    if (notifDiizinkan && "Notification" in window && Notification.permission === "granted") {
      urgent.forEach(function (u) {
        if (sudahDinotif[u.tugas.id]) return;
        sudahDinotif[u.tugas.id] = true;
        try {
          new Notification("JadwalKu — Deadline < 24 jam", {
            body:
              u.tugas.mapel +
              ": " +
              u.tugas.detail +
              "\nMapel dimulai " +
              u.dl.label +
              " pukul " +
              u.dl.mulai,
          });
        } catch (e) {
          /* diabaikan */
        }
      });
    }
  }

  function mintaIzinNotif() {
    if (!("Notification" in window)) {
      showToast("Browser tidak mendukung notifikasi.");
      return;
    }
    Notification.requestPermission().then(function (hasil) {
      notifDiizinkan = hasil === "granted";
      if (notifDiizinkan) {
        showToast("Notifikasi diaktifkan.");
        el.btnIzinNotif.hidden = true;
      } else {
        showToast("Izin notifikasi ditolak.");
      }
      cekNotifikasi();
    });
  }

  /* ----------------------------------------------------------------------
     9. JADWAL PANEL (tab hari + list)
     ---------------------------------------------------------------------- */
  function renderTabHari() {
    el.tabHari.innerHTML = "";
    [1, 2, 3, 4, 5].forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (d === hariDipilih ? " is-active" : "");
      b.textContent = NAMA_HARI[d];
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", d === hariDipilih ? "true" : "false");
      b.addEventListener("click", function () {
        hariDipilih = d;
        renderTabHari();
        renderJadwalHari();
      });
      el.tabHari.appendChild(b);
    });
  }

  function renderJadwalHari() {
    var n = nowWIB();
    var jadwalHari = JADWAL[hariDipilih] || [];
    el.daftarJadwal.innerHTML = "";

    jadwalHari.forEach(function (s) {
      var li = document.createElement("li");
      li.className = "schedule-row";

      var isBreak = s.tipe === "istirahat";
      if (isBreak) li.classList.add("is-break");

      // highlight slot berjalan hanya jika tab = hari ini
      var isNow = false;
      if (hariDipilih === n.dayIndex) {
        var m1 = jamKeMenit(s.mulai);
        var m2 = jamKeMenit(s.selesai);
        if (n.totalMenit >= m1 && n.totalMenit < m2) {
          isNow = true;
          li.classList.add("is-now");
        }
      }

      var jam = document.createElement("span");
      jam.className = "schedule-jam";
      jam.textContent = typeof s.jamKe === "number" ? s.jamKe : "•";

      var waktu = document.createElement("span");
      waktu.className = "schedule-time";
      waktu.textContent = s.mulai + "–" + s.selesai;

      var mapel = document.createElement("span");
      mapel.className = "schedule-mapel";
      mapel.textContent = s.mapel;

      li.appendChild(jam);
      li.appendChild(waktu);
      li.appendChild(mapel);

      if (isNow) {
        var tag = document.createElement("span");
        tag.className = "schedule-now-tag";
        tag.textContent = "Sekarang";
        li.appendChild(tag);
      }

      el.daftarJadwal.appendChild(li);
    });
  }

  /* ----------------------------------------------------------------------
     10. MODAL FORM
     ---------------------------------------------------------------------- */
  function isiDropdownMapel() {
    DAFTAR_MAPEL.slice()
      .sort(function (a, b) {
        return a.localeCompare(b, "id");
      })
      .forEach(function (m) {
        var opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        el.inputMapel.appendChild(opt);
      });
  }

  function bukaModal() {
    el.form.reset();
    el.formError.hidden = true;
    updatePreviewDeadline();
    el.overlay.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      el.inputMapel.focus();
    }, 60);
  }

  function tutupModal() {
    el.overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function updatePreviewDeadline() {
    var mapel = el.inputMapel.value;
    if (!mapel) {
      el.previewDeadline.classList.remove("is-filled");
      el.previewDeadline.textContent = "Pilih mapel untuk melihat deadline.";
      return;
    }
    var dl = cariDeadline(mapel);
    el.previewDeadline.classList.add("is-filled");
    if (!dl.ada) {
      el.previewDeadline.innerHTML =
        "Mapel <strong>" +
        escapeHtml(mapel) +
        "</strong> tidak ada di jadwal minggu ini.";
      return;
    }
    var jamKeTxt =
      typeof dl.jamKe === "number" ? " (Jam ke-" + dl.jamKe + ")" : "";
    var urgentTxt =
      dl.selisihJam <= 24
        ? " — <strong>&lt; 24 jam, segera!</strong>"
        : "";
    el.previewDeadline.innerHTML =
      "Deadline: <strong>" +
      escapeHtml(dl.label) +
      "</strong>, pukul " +
      dl.mulai +
      jamKeTxt +
      urgentTxt;
  }

  function submitForm(e) {
    e.preventDefault();
    var mapel = el.inputMapel.value;
    var detail = el.inputDetail.value.trim();

    if (!mapel) return tampilError("Pilih mata pelajaran terlebih dahulu.");
    if (!detail) return tampilError("Isi detail tugasnya dulu ya.");

    tambahTugas(mapel, detail);
    tutupModal();
    showToast("Tugas ditambahkan.");
  }

  function tampilError(msg) {
    el.formError.textContent = msg;
    el.formError.hidden = false;
  }

  /* ----------------------------------------------------------------------
     11. HELPERS
     ---------------------------------------------------------------------- */
  function escapeHtml(s) {
    return (s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var toastTimer = null;
  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.toast.hidden = true;
    }, 2400);
  }

  /* ----------------------------------------------------------------------
     12. INIT
     ---------------------------------------------------------------------- */
  function init() {
    grab();

    var n = nowWIB();
    // default tab jadwal: hari ini kalau hari sekolah, kalau tidak -> Senin
    hariDipilih = JADWAL[n.dayIndex] ? n.dayIndex : 1;

    if ("Notification" in window && Notification.permission === "granted") {
      notifDiizinkan = true;
    }

    isiDropdownMapel();
    muatTugas();

    // Render awal
    tickJam();
    updateStatusKBM();
    renderTugas();
    renderTabHari();
    renderJadwalHari();
    cekNotifikasi();

    // Event listeners
    el.btnBuka.addEventListener("click", bukaModal);
    el.btnTutup.addEventListener("click", tutupModal);
    el.btnBatal.addEventListener("click", tutupModal);
    el.overlay.addEventListener("click", function (ev) {
      if (ev.target === el.overlay) tutupModal();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !el.overlay.hidden) tutupModal();
    });
    el.inputMapel.addEventListener("change", function () {
      el.formError.hidden = true;
      updatePreviewDeadline();
    });
    el.form.addEventListener("submit", submitForm);
    el.btnIzinNotif.addEventListener("click", mintaIzinNotif);

    // Filter chips tugas
    var chips = document.querySelectorAll(".filter-row .chip");
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        chips.forEach(function (x) {
          x.classList.remove("is-active");
        });
        c.classList.add("is-active");
        filterAktif = c.dataset.filter;
        renderTugas();
      });
    });

    // Jam update tiap detik
    setInterval(tickJam, 1000);

    // Status KBM + highlight jadwal update tiap 15 detik
    setInterval(function () {
      updateStatusKBM();
      if (hariDipilih === nowWIB().dayIndex) renderJadwalHari();
    }, 15000);

    // Cek notifikasi & refresh deadline tugas tiap menit
    setInterval(function () {
      renderTugas();
      cekNotifikasi();
    }, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();