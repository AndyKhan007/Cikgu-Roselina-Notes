// =====================================================
// Sistem i18n — semua teks manusia terpusat di sini
// Bahasa default: Indonesia ('id')
// Kunci = teks Indonesia. Terjemahan untuk bahasa lain dipetakan.
// =====================================================

export const LANGS = [
  { code: 'id', flag: '🇮🇩', native: 'Bahasa Indonesia', english: 'Indonesian' },
  { code: 'en', flag: '🇬🇧', native: 'English',          english: 'English' },
  { code: 'ms', flag: '🇲🇾', native: 'Bahasa Melayu',    english: 'Malay' },
  { code: 'zh', flag: '🇨🇳', native: '中文',              english: 'Chinese' },
  { code: 'ja', flag: '🇯🇵', native: '日本語',            english: 'Japanese' },
  { code: 'ko', flag: '🇰🇷', native: '한국어',            english: 'Korean' },
  { code: 'hi', flag: '🇮🇳', native: 'हिन्दी',              english: 'Hindi' },
  { code: 'th', flag: '🇹🇭', native: 'ไทย',               english: 'Thai' },
  { code: 'tl', flag: '🇵🇭', native: 'Filipino',         english: 'Filipino' },
  { code: 'my', flag: '🇲🇲', native: 'မြန်မာ',              english: 'Burmese' },
  { code: 'vi', flag: '🇻🇳', native: 'Tiếng Việt',        english: 'Vietnamese' },
  { code: 'ru', flag: '🇷🇺', native: 'Русский',          english: 'Russian' }
];

const TRANSLATIONS = {

  // ============================================================
  // ENGLISH
  // ============================================================
  en: {
    'Menu': 'Menu',
    'Catatan': 'Notes',
    'Group': 'Groups',
    'Slide': 'Slides',
    'MEMUAT...': 'LOADING...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · Driving school note-taking app',

    'Keluar': 'Sign out',
    'Silakan login terlebih dahulu': 'Please sign in first',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'Please sign in first to access this menu',
    'Anda telah keluar': 'You have signed out',
    'Login tidak valid': 'Invalid login',

    'Selamat datang': 'Welcome',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'Pick a menu to start creating driving notes.',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      'Please sign in to access menus marked with 🔒.',
    'Buat Catatan': 'Create Note',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'Record your voice, auto-transcribed. Sign in required.',
    'Buat Group Catatan': 'Create Group',
    'Gabung beberapa catatan. Perlu login.':
      'Combine multiple notes. Sign in required.',
    'Lihat Slide Note': 'View Slide Notes',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'Display note slides. Accessible to everyone.',
    'Catatan Saya': 'My Notes',
    'Daftar catatan yang Anda buat. Perlu login.':
      'Your notes list. Sign in required.',

    'Semua catatan yang Anda buat.': 'All notes you have created.',
    'Memuat catatan...': 'Loading notes...',
    'Belum ada catatan': 'No notes yet',
    'Mulai dengan merekam catatan pertama Anda.':
      'Start by recording your first note.',
    'Buat Catatan Pertama': 'Create First Note',
    'Lihat': 'View',
    'Edit': 'Edit',
    'Hapus': 'Delete',
    'catatan': 'notes',
    'Gagal memuat': 'Failed to load',
    'Coba Lagi': 'Try Again',
    'Halaman tidak ditemukan': 'Page not found',

    'Buat Catatan Baru': 'New Note',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'Record your voice, then auto-transcribe to text.',
    'Tekan tombol untuk mulai merekam': 'Press the button to start recording',
    'Mulai Rekam': 'Start Recording',
    'Stop': 'Stop',
    'Batalkan Rekaman': 'Cancel Recording',
    'Proses Transkripsi': 'Transcribe',
    'Sedang merekam... bicara dengan jelas':
      'Recording... speak clearly',
    'Mengirim audio ke Gemini...': 'Sending audio to Gemini...',
    'Memproses...': 'Processing...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'Transcription done. Edit the text if needed.',
    'Transkripsi gagal': 'Transcription failed',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'Recording too large. Maximum 19 MB.',
    'Rekaman terlalu besar.': 'Recording too large.',
    'Judul catatan': 'Note title',
    'Contoh: Teknik parkir paralel': 'Example: Parallel parking technique',
    'Isi catatan': 'Note content',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'The transcription will appear here, you can edit it...',
    'Simpan Catatan': 'Save Note',
    'Tambah Rekam': 'Add Recording',
    'Batal': 'Cancel',
    'Menyimpan...': 'Saving...',
    'Catatan berhasil disimpan!': 'Note saved successfully!',
    'Gagal menyimpan': 'Failed to save',
    'Gagal mengakses mikrofon': 'Failed to access microphone',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'Your browser does not support audio recording. Use recent Chrome, Edge, or Safari.',
    'Browser Anda tidak mendukung rekaman suara.':
      'Your browser does not support audio recording.',
    'Browser tidak mendukung rekaman.':
      'Browser does not support recording.',
    'Hasil akan disisipkan pada posisi kursor':
      'Result will be inserted at the cursor position',
    'Mulai': 'Start',
    'Sisipkan': 'Insert',
    'Tutup': 'Close',
    'Siap merekam': 'Ready to record',
    'Siap disisipkan ke catatan': 'Ready to insert into the note',
    'Teks tambahan disisipkan': 'Extra text inserted',
    'Rekaman siap diproses': 'Recording ready to process',
    'Gagal menghentikan rekaman': 'Failed to stop recording',

    'Kembali ke Daftar': 'Back to List',
    'Kembali ke Detail': 'Back to Detail',
    'ID': 'ID',
    'Durasi': 'Duration',

    'Edit Catatan': 'Edit Note',
    'Ubah judul atau isi catatan Anda.':
      'Change your note title or content.',
    'Simpan Perubahan': 'Save Changes',
    'Perubahan disimpan': 'Changes saved',
    'Judul tidak boleh kosong.': 'Title cannot be empty.',
    'Isi tidak boleh kosong.': 'Content cannot be empty.',
    'Judul catatan tidak boleh kosong.': 'Note title cannot be empty.',

    'Hapus Catatan?': 'Delete Note?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'will be permanently deleted and cannot be recovered.',
    'Ya, Hapus': 'Yes, Delete',
    'Catatan dihapus': 'Note deleted',
    'Gagal menghapus': 'Failed to delete',

    'Fitur grouping akan dibangun pada Phase 4.':
      'Grouping feature will be built in Phase 4.',
    'Buat Group': 'Create Group',
    'Akan dibangun pada Phase 4.': 'Will be built in Phase 4.',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'Public slide list will be built in Phase 4.',

    'Pilih Bahasa': 'Choose Language',
    'Cari bahasa...': 'Search language...',
    'Bahasa tidak ditemukan': 'Language not found',
    'Bahasa berhasil diubah': 'Language changed successfully',
    'Bahasa': 'Language',

    // --- Narrator & Translate ---
    'Narator': 'Narrator',
    'Putar': 'Play',
    'Jeda': 'Pause',
    'Lanjut': 'Resume',
    'Kecepatan': 'Speed',
    'Asli': 'Original',
    'Tampilkan': 'Show',
    'Terjemahkan': 'Translate',
    'Menerjemahkan...': 'Translating...',
    'Terjemahan selesai': 'Translation done',
    'Terjemahan gagal': 'Translation failed',
    'Narator tidak didukung di browser ini': 'Narrator not supported in this browser',
    'Suara tidak tersedia untuk bahasa ini': 'Voice not available for this language',
    'Memuat suara...': 'Loading voices...',
    'Kembali ke teks asli': 'Back to original text',
    'Pilih bahasa terjemahan': 'Choose translation language',
    'Bahasa Indonesia (asli)': 'Indonesian (original)',
    'Versi terjemahan': 'Translated version',
    'Sedang membaca...': 'Reading...',
    'Berhenti': 'Stopped',
    'Terjemahan dimuat dari cache': 'Translation loaded from cache'
  },

  // ============================================================
  // MELAYU
  // ============================================================
  ms: {
    'Menu': 'Menu',
    'Catatan': 'Nota',
    'Group': 'Kumpulan',
    'Slide': 'Slaid',
    'MEMUAT...': 'MEMUATKAN...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · Aplikasi nota sekolah memandu',

    'Keluar': 'Keluar',
    'Silakan login terlebih dahulu': 'Sila log masuk dahulu',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'Sila log masuk dahulu untuk akses menu ini',
    'Anda telah keluar': 'Anda telah keluar',
    'Login tidak valid': 'Log masuk tidak sah',

    'Selamat datang': 'Selamat datang',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'Pilih menu untuk mula membuat nota memandu.',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      'Sila log masuk untuk akses menu bertanda 🔒.',
    'Buat Catatan': 'Buat Nota',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'Rakam suara, auto jadi teks. Perlu log masuk.',
    'Buat Group Catatan': 'Buat Kumpulan Nota',
    'Gabung beberapa catatan. Perlu login.':
      'Gabung beberapa nota. Perlu log masuk.',
    'Lihat Slide Note': 'Lihat Slaid Nota',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'Papar slaid nota. Boleh diakses sesiapa sahaja.',
    'Catatan Saya': 'Nota Saya',
    'Daftar catatan yang Anda buat. Perlu login.':
      'Senarai nota anda. Perlu log masuk.',

    'Semua catatan yang Anda buat.': 'Semua nota yang anda buat.',
    'Memuat catatan...': 'Memuatkan nota...',
    'Belum ada catatan': 'Belum ada nota',
    'Mulai dengan merekam catatan pertama Anda.':
      'Mula dengan merakam nota pertama anda.',
    'Buat Catatan Pertama': 'Buat Nota Pertama',
    'Lihat': 'Lihat',
    'Edit': 'Sunting',
    'Hapus': 'Padam',
    'catatan': 'nota',
    'Gagal memuat': 'Gagal memuatkan',
    'Coba Lagi': 'Cuba Lagi',
    'Halaman tidak ditemukan': 'Halaman tidak dijumpai',

    'Buat Catatan Baru': 'Buat Nota Baharu',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'Rakam suara anda, kemudian transkripsi automatik ke teks.',
    'Tekan tombol untuk mulai merekam': 'Tekan butang untuk mula merakam',
    'Mulai Rekam': 'Mula Rakam',
    'Stop': 'Berhenti',
    'Batalkan Rekaman': 'Batal Rakaman',
    'Proses Transkripsi': 'Proses Transkripsi',
    'Sedang merekam... bicara dengan jelas':
      'Sedang merakam... bercakap dengan jelas',
    'Mengirim audio ke Gemini...': 'Menghantar audio ke Gemini...',
    'Memproses...': 'Memproses...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'Transkripsi selesai. Sunting teks jika perlu.',
    'Transkripsi gagal': 'Transkripsi gagal',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'Rakaman terlalu besar. Maksimum 19 MB.',
    'Rekaman terlalu besar.': 'Rakaman terlalu besar.',
    'Judul catatan': 'Tajuk nota',
    'Contoh: Teknik parkir paralel': 'Contoh: Teknik letak kereta selari',
    'Isi catatan': 'Isi nota',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'Hasil transkripsi akan muncul di sini, boleh disunting...',
    'Simpan Catatan': 'Simpan Nota',
    'Tambah Rekam': 'Tambah Rakaman',
    'Batal': 'Batal',
    'Menyimpan...': 'Menyimpan...',
    'Catatan berhasil disimpan!': 'Nota berjaya disimpan!',
    'Gagal menyimpan': 'Gagal menyimpan',
    'Gagal mengakses mikrofon': 'Gagal akses mikrofon',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'Pelayar anda tidak menyokong rakaman suara. Guna Chrome, Edge, atau Safari terkini.',
    'Browser Anda tidak mendukung rekaman suara.':
      'Pelayar anda tidak menyokong rakaman suara.',
    'Browser tidak mendukung rekaman.':
      'Pelayar tidak menyokong rakaman.',
    'Hasil akan disisipkan pada posisi kursor':
      'Hasil akan disisipkan pada kedudukan kursor',
    'Mulai': 'Mula',
    'Sisipkan': 'Sisip',
    'Tutup': 'Tutup',
    'Siap merekam': 'Sedia merakam',
    'Siap disisipkan ke catatan': 'Sedia disisipkan ke nota',
    'Teks tambahan disisipkan': 'Teks tambahan disisipkan',
    'Rekaman siap diproses': 'Rakaman sedia diproses',
    'Gagal menghentikan rekaman': 'Gagal menghentikan rakaman',

    'Kembali ke Daftar': 'Kembali ke Senarai',
    'Kembali ke Detail': 'Kembali ke Butiran',
    'ID': 'ID',
    'Durasi': 'Tempoh',

    'Edit Catatan': 'Sunting Nota',
    'Ubah judul atau isi catatan Anda.':
      'Ubah tajuk atau isi nota anda.',
    'Simpan Perubahan': 'Simpan Perubahan',
    'Perubahan disimpan': 'Perubahan disimpan',
    'Judul tidak boleh kosong.': 'Tajuk tidak boleh kosong.',
    'Isi tidak boleh kosong.': 'Isi tidak boleh kosong.',
    'Judul catatan tidak boleh kosong.': 'Tajuk nota tidak boleh kosong.',

    'Hapus Catatan?': 'Padam Nota?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'akan dipadam secara kekal dan tidak boleh dikembalikan.',
    'Ya, Hapus': 'Ya, Padam',
    'Catatan dihapus': 'Nota dipadam',
    'Gagal menghapus': 'Gagal memadam',

    'Fitur grouping akan dibangun pada Phase 4.':
      'Ciri kumpulan akan dibina pada Fasa 4.',
    'Buat Group': 'Buat Kumpulan',
    'Akan dibangun pada Phase 4.': 'Akan dibina pada Fasa 4.',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'Senarai slaid awam akan dibina pada Fasa 4.',

    'Pilih Bahasa': 'Pilih Bahasa',
    'Cari bahasa...': 'Cari bahasa...',
    'Bahasa tidak ditemukan': 'Bahasa tidak dijumpai',
    'Bahasa berhasil diubah': 'Bahasa berjaya diubah',
    'Bahasa': 'Bahasa',

    // --- Narrator & Translate ---
    'Narator': 'Pembaca',
    'Putar': 'Main',
    'Jeda': 'Jeda',
    'Lanjut': 'Sambung',
    'Kecepatan': 'Kelajuan',
    'Asli': 'Asal',
    'Tampilkan': 'Papar',
    'Terjemahkan': 'Terjemah',
    'Menerjemahkan...': 'Menterjemah...',
    'Terjemahan selesai': 'Terjemahan selesai',
    'Terjemahan gagal': 'Terjemahan gagal',
    'Narator tidak didukung di browser ini': 'Pembaca tidak disokong dalam pelayar ini',
    'Suara tidak tersedia untuk bahasa ini': 'Suara tidak tersedia untuk bahasa ini',
    'Memuat suara...': 'Memuatkan suara...',
    'Kembali ke teks asli': 'Kembali ke teks asal',
    'Pilih bahasa terjemahan': 'Pilih bahasa terjemahan',
    'Bahasa Indonesia (asli)': 'Bahasa Indonesia (asal)',
    'Versi terjemahan': 'Versi terjemahan',
    'Sedang membaca...': 'Sedang membaca...',
    'Berhenti': 'Berhenti',
    'Terjemahan dimuat dari cache': 'Terjemahan dimuat dari cache'
  },

  // ============================================================
  // CHINESE
  // ============================================================
  zh: {
    'Menu': '菜单',
    'Catatan': '笔记',
    'Group': '分组',
    'Slide': '幻灯片',
    'MEMUAT...': '加载中...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · 驾校笔记应用',

    'Keluar': '退出',
    'Silakan login terlebih dahulu': '请先登录',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      '请先登录以访问此菜单',
    'Anda telah keluar': '您已退出',
    'Login tidak valid': '登录无效',

    'Selamat datang': '欢迎',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      '选择一个菜单开始创建驾驶笔记。',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      '请登录以访问标有🔒的菜单。',
    'Buat Catatan': '创建笔记',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      '录制语音，自动转为文字。需要登录。',
    'Buat Group Catatan': '创建分组',
    'Gabung beberapa catatan. Perlu login.':
      '合并多个笔记。需要登录。',
    'Lihat Slide Note': '查看幻灯片',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      '显示笔记幻灯片。任何人都可以访问。',
    'Catatan Saya': '我的笔记',
    'Daftar catatan yang Anda buat. Perlu login.':
      '您创建的笔记列表。需要登录。',

    'Semua catatan yang Anda buat.': '您创建的所有笔记。',
    'Memuat catatan...': '加载笔记中...',
    'Belum ada catatan': '还没有笔记',
    'Mulai dengan merekam catatan pertama Anda.':
      '从录制您的第一条笔记开始。',
    'Buat Catatan Pertama': '创建第一条笔记',
    'Lihat': '查看',
    'Edit': '编辑',
    'Hapus': '删除',
    'catatan': '条笔记',
    'Gagal memuat': '加载失败',
    'Coba Lagi': '重试',
    'Halaman tidak ditemukan': '页面未找到',

    'Buat Catatan Baru': '创建新笔记',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      '录制您的声音，然后自动转录为文字。',
    'Tekan tombol untuk mulai merekam': '按下按钮开始录音',
    'Mulai Rekam': '开始录音',
    'Stop': '停止',
    'Batalkan Rekaman': '取消录音',
    'Proses Transkripsi': '处理转录',
    'Sedang merekam... bicara dengan jelas': '正在录音...请清楚地说话',
    'Mengirim audio ke Gemini...': '正在发送音频到 Gemini...',
    'Memproses...': '处理中...',
    'Transkripsi selesai. Edit teks jika perlu.':
      '转录完成。如有需要，可编辑文字。',
    'Transkripsi gagal': '转录失败',
    'Rekaman terlalu besar. Maksimal 19 MB.': '录音太大。最大 19 MB。',
    'Rekaman terlalu besar.': '录音太大。',
    'Judul catatan': '笔记标题',
    'Contoh: Teknik parkir paralel': '例如：平行停车技巧',
    'Isi catatan': '笔记内容',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      '转录结果将显示在此处，您可以编辑...',
    'Simpan Catatan': '保存笔记',
    'Tambah Rekam': '添加录音',
    'Batal': '取消',
    'Menyimpan...': '保存中...',
    'Catatan berhasil disimpan!': '笔记保存成功！',
    'Gagal menyimpan': '保存失败',
    'Gagal mengakses mikrofon': '无法访问麦克风',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      '您的浏览器不支持录音。请使用最新的 Chrome、Edge 或 Safari。',
    'Browser Anda tidak mendukung rekaman suara.': '您的浏览器不支持录音。',
    'Browser tidak mendukung rekaman.': '浏览器不支持录音。',
    'Hasil akan disisipkan pada posisi kursor': '结果将插入到光标位置',
    'Mulai': '开始',
    'Sisipkan': '插入',
    'Tutup': '关闭',
    'Siap merekam': '准备录音',
    'Siap disisipkan ke catatan': '准备插入到笔记',
    'Teks tambahan disisipkan': '已插入额外文字',
    'Rekaman siap diproses': '录音准备就绪',
    'Gagal menghentikan rekaman': '无法停止录音',

    'Kembali ke Daftar': '返回列表',
    'Kembali ke Detail': '返回详情',
    'ID': 'ID',
    'Durasi': '时长',

    'Edit Catatan': '编辑笔记',
    'Ubah judul atau isi catatan Anda.': '更改您的笔记标题或内容。',
    'Simpan Perubahan': '保存更改',
    'Perubahan disimpan': '更改已保存',
    'Judul tidak boleh kosong.': '标题不能为空。',
    'Isi tidak boleh kosong.': '内容不能为空。',
    'Judul catatan tidak boleh kosong.': '笔记标题不能为空。',

    'Hapus Catatan?': '删除笔记？',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      '将被永久删除，无法恢复。',
    'Ya, Hapus': '是的，删除',
    'Catatan dihapus': '笔记已删除',
    'Gagal menghapus': '删除失败',

    'Fitur grouping akan dibangun pada Phase 4.':
      '分组功能将在第四阶段构建。',
    'Buat Group': '创建分组',
    'Akan dibangun pada Phase 4.': '将在第四阶段构建。',
    'Daftar slide publik akan dibangun pada Phase 4.':
      '公共幻灯片列表将在第四阶段构建。',

    'Pilih Bahasa': '选择语言',
    'Cari bahasa...': '搜索语言...',
    'Bahasa tidak ditemukan': '未找到语言',
    'Bahasa berhasil diubah': '语言切换成功',
    'Bahasa': '语言',

    // --- Narrator & Translate ---
    'Narator': '朗读器',
    'Putar': '播放',
    'Jeda': '暂停',
    'Lanjut': '继续',
    'Kecepatan': '速度',
    'Asli': '原文',
    'Tampilkan': '显示',
    'Terjemahkan': '翻译',
    'Menerjemahkan...': '翻译中...',
    'Terjemahan selesai': '翻译完成',
    'Terjemahan gagal': '翻译失败',
    'Narator tidak didukung di browser ini': '此浏览器不支持朗读',
    'Suara tidak tersedia untuk bahasa ini': '此语言没有可用的语音',
    'Memuat suara...': '加载语音中...',
    'Kembali ke teks asli': '返回原文',
    'Pilih bahasa terjemahan': '选择翻译语言',
    'Bahasa Indonesia (asli)': '印尼语（原文）',
    'Versi terjemahan': '翻译版本',
    'Sedang membaca...': '正在朗读...',
    'Berhenti': '已停止',
    'Terjemahan dimuat dari cache': '翻译已从缓存加载'
  },

  // ============================================================
  // JAPANESE
  // ============================================================
  ja: {
    'Menu': 'メニュー',
    'Catatan': 'ノート',
    'Group': 'グループ',
    'Slide': 'スライド',
    'MEMUAT...': '読み込み中...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · 自動車学校ノートアプリ',

    'Keluar': 'ログアウト',
    'Silakan login terlebih dahulu': 'まずログインしてください',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'このメニューにアクセスするにはログインしてください',
    'Anda telah keluar': 'ログアウトしました',
    'Login tidak valid': 'ログインが無効です',

    'Selamat datang': 'ようこそ',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'メニューを選んで運転ノートを作成しましょう。',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      '🔒マークのメニューにアクセスするにはログインしてください。',
    'Buat Catatan': 'ノート作成',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      '音声を録音すると自動でテキスト化。ログインが必要です。',
    'Buat Group Catatan': 'グループ作成',
    'Gabung beberapa catatan. Perlu login.':
      '複数のノートをまとめます。ログインが必要です。',
    'Lihat Slide Note': 'スライドを見る',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'ノートのスライドを表示。誰でもアクセス可能。',
    'Catatan Saya': 'マイノート',
    'Daftar catatan yang Anda buat. Perlu login.':
      'あなたが作成したノートの一覧。ログインが必要です。',

    'Semua catatan yang Anda buat.': 'あなたが作成したすべてのノート。',
    'Memuat catatan...': 'ノートを読み込み中...',
    'Belum ada catatan': 'ノートがありません',
    'Mulai dengan merekam catatan pertama Anda.':
      '最初のノートを録音して始めましょう。',
    'Buat Catatan Pertama': '最初のノートを作成',
    'Lihat': '表示',
    'Edit': '編集',
    'Hapus': '削除',
    'catatan': '件',
    'Gagal memuat': '読み込み失敗',
    'Coba Lagi': '再試行',
    'Halaman tidak ditemukan': 'ページが見つかりません',

    'Buat Catatan Baru': '新規ノート作成',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      '音声を録音すると自動でテキストに変換されます。',
    'Tekan tombol untuk mulai merekam': 'ボタンを押して録音を開始',
    'Mulai Rekam': '録音開始',
    'Stop': '停止',
    'Batalkan Rekaman': '録音をキャンセル',
    'Proses Transkripsi': '文字起こし',
    'Sedang merekam... bicara dengan jelas':
      '録音中...はっきりと話してください',
    'Mengirim audio ke Gemini...': 'Geminiに音声を送信中...',
    'Memproses...': '処理中...',
    'Transkripsi selesai. Edit teks jika perlu.':
      '文字起こし完了。必要に応じて編集してください。',
    'Transkripsi gagal': '文字起こし失敗',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      '録音が大きすぎます。最大19MB。',
    'Rekaman terlalu besar.': '録音が大きすぎます。',
    'Judul catatan': 'ノートのタイトル',
    'Contoh: Teknik parkir paralel': '例：縦列駐車のテクニック',
    'Isi catatan': 'ノートの内容',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      '文字起こし結果がここに表示されます。編集可能です...',
    'Simpan Catatan': 'ノートを保存',
    'Tambah Rekam': '録音を追加',
    'Batal': 'キャンセル',
    'Menyimpan...': '保存中...',
    'Catatan berhasil disimpan!': 'ノートを保存しました！',
    'Gagal menyimpan': '保存失敗',
    'Gagal mengakses mikrofon': 'マイクにアクセスできません',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'お使いのブラウザは録音をサポートしていません。最新のChrome、Edge、またはSafariをご利用ください。',
    'Browser Anda tidak mendukung rekaman suara.':
      'お使いのブラウザは録音をサポートしていません。',
    'Browser tidak mendukung rekaman.':
      'ブラウザが録音をサポートしていません。',
    'Hasil akan disisipkan pada posisi kursor':
      'カーソル位置に挿入されます',
    'Mulai': '開始',
    'Sisipkan': '挿入',
    'Tutup': '閉じる',
    'Siap merekam': '録音準備完了',
    'Siap disisipkan ke catatan': 'ノートに挿入する準備完了',
    'Teks tambahan disisipkan': '追加テキストを挿入しました',
    'Rekaman siap diproses': '録音の準備完了',
    'Gagal menghentikan rekaman': '録音停止に失敗',

    'Kembali ke Daftar': '一覧に戻る',
    'Kembali ke Detail': '詳細に戻る',
    'ID': 'ID',
    'Durasi': '長さ',

    'Edit Catatan': 'ノートを編集',
    'Ubah judul atau isi catatan Anda.':
      'ノートのタイトルや内容を変更します。',
    'Simpan Perubahan': '変更を保存',
    'Perubahan disimpan': '変更を保存しました',
    'Judul tidak boleh kosong.': 'タイトルは空にできません。',
    'Isi tidak boleh kosong.': '内容は空にできません。',
    'Judul catatan tidak boleh kosong.':
      'ノートのタイトルは空にできません。',

    'Hapus Catatan?': 'ノートを削除？',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'は完全に削除され、復元できません。',
    'Ya, Hapus': 'はい、削除',
    'Catatan dihapus': 'ノートを削除しました',
    'Gagal menghapus': '削除失敗',

    'Fitur grouping akan dibangun pada Phase 4.':
      'グループ機能はフェーズ4で実装されます。',
    'Buat Group': 'グループ作成',
    'Akan dibangun pada Phase 4.': 'フェーズ4で実装予定。',
    'Daftar slide publik akan dibangun pada Phase 4.':
      '公開スライド一覧はフェーズ4で実装されます。',

    'Pilih Bahasa': '言語を選択',
    'Cari bahasa...': '言語を検索...',
    'Bahasa tidak ditemukan': '言語が見つかりません',
    'Bahasa berhasil diubah': '言語を変更しました',
    'Bahasa': '言語',

    // --- Narrator & Translate ---
    'Narator': 'ナレーター',
    'Putar': '再生',
    'Jeda': '一時停止',
    'Lanjut': '再開',
    'Kecepatan': '速度',
    'Asli': '原文',
    'Tampilkan': '表示',
    'Terjemahkan': '翻訳',
    'Menerjemahkan...': '翻訳中...',
    'Terjemahan selesai': '翻訳完了',
    'Terjemahan gagal': '翻訳失敗',
    'Narator tidak didukung di browser ini': 'このブラウザは読み上げをサポートしていません',
    'Suara tidak tersedia untuk bahasa ini': 'この言語の音声は利用できません',
    'Memuat suara...': '音声を読み込み中...',
    'Kembali ke teks asli': '原文に戻る',
    'Pilih bahasa terjemahan': '翻訳言語を選択',
    'Bahasa Indonesia (asli)': 'インドネシア語（原文）',
    'Versi terjemahan': '翻訳版',
    'Sedang membaca...': '読み上げ中...',
    'Berhenti': '停止しました',
    'Terjemahan dimuat dari cache': 'キャッシュから翻訳を読み込みました'
  },

  // ============================================================
  // KOREAN
  // ============================================================
  ko: {
    'Menu': '메뉴',
    'Catatan': '노트',
    'Group': '그룹',
    'Slide': '슬라이드',
    'MEMUAT...': '로딩 중...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · 운전학원 노트 앱',

    'Keluar': '로그아웃',
    'Silakan login terlebih dahulu': '먼저 로그인해주세요',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      '이 메뉴에 접근하려면 로그인해주세요',
    'Anda telah keluar': '로그아웃되었습니다',
    'Login tidak valid': '로그인이 유효하지 않습니다',

    'Selamat datang': '환영합니다',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      '운전 노트를 만들 메뉴를 선택하세요.',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      '🔒 표시된 메뉴에 접근하려면 로그인해주세요.',
    'Buat Catatan': '노트 만들기',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      '음성을 녹음하면 자동으로 텍스트가 됩니다. 로그인 필요.',
    'Buat Group Catatan': '그룹 만들기',
    'Gabung beberapa catatan. Perlu login.':
      '여러 노트를 결합합니다. 로그인 필요.',
    'Lihat Slide Note': '슬라이드 보기',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      '노트 슬라이드를 표시합니다. 누구나 접근 가능.',
    'Catatan Saya': '내 노트',
    'Daftar catatan yang Anda buat. Perlu login.':
      '작성한 노트 목록. 로그인 필요.',

    'Semua catatan yang Anda buat.': '작성한 모든 노트.',
    'Memuat catatan...': '노트 불러오는 중...',
    'Belum ada catatan': '아직 노트가 없습니다',
    'Mulai dengan merekam catatan pertama Anda.':
      '첫 노트를 녹음하여 시작하세요.',
    'Buat Catatan Pertama': '첫 노트 만들기',
    'Lihat': '보기',
    'Edit': '편집',
    'Hapus': '삭제',
    'catatan': '개',
    'Gagal memuat': '불러오기 실패',
    'Coba Lagi': '다시 시도',
    'Halaman tidak ditemukan': '페이지를 찾을 수 없습니다',

    'Buat Catatan Baru': '새 노트 만들기',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      '음성을 녹음하면 자동으로 텍스트로 변환됩니다.',
    'Tekan tombol untuk mulai merekam': '버튼을 눌러 녹음 시작',
    'Mulai Rekam': '녹음 시작',
    'Stop': '정지',
    'Batalkan Rekaman': '녹음 취소',
    'Proses Transkripsi': '텍스트 변환',
    'Sedang merekam... bicara dengan jelas':
      '녹음 중... 명확하게 말하세요',
    'Mengirim audio ke Gemini...': 'Gemini로 오디오 전송 중...',
    'Memproses...': '처리 중...',
    'Transkripsi selesai. Edit teks jika perlu.':
      '변환 완료. 필요하면 텍스트를 편집하세요.',
    'Transkripsi gagal': '변환 실패',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      '녹음이 너무 큽니다. 최대 19MB.',
    'Rekaman terlalu besar.': '녹음이 너무 큽니다.',
    'Judul catatan': '노트 제목',
    'Contoh: Teknik parkir paralel': '예: 평행 주차 기술',
    'Isi catatan': '노트 내용',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      '변환 결과가 여기에 표시됩니다. 편집 가능...',
    'Simpan Catatan': '노트 저장',
    'Tambah Rekam': '녹음 추가',
    'Batal': '취소',
    'Menyimpan...': '저장 중...',
    'Catatan berhasil disimpan!': '노트가 저장되었습니다!',
    'Gagal menyimpan': '저장 실패',
    'Gagal mengakses mikrofon': '마이크에 접근할 수 없습니다',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      '브라우저가 녹음을 지원하지 않습니다. 최신 Chrome, Edge 또는 Safari를 사용하세요.',
    'Browser Anda tidak mendukung rekaman suara.':
      '브라우저가 녹음을 지원하지 않습니다.',
    'Browser tidak mendukung rekaman.':
      '브라우저가 녹음을 지원하지 않습니다.',
    'Hasil akan disisipkan pada posisi kursor': '커서 위치에 삽입됩니다',
    'Mulai': '시작',
    'Sisipkan': '삽입',
    'Tutup': '닫기',
    'Siap merekam': '녹음 준비 완료',
    'Siap disisipkan ke catatan': '노트에 삽입할 준비 완료',
    'Teks tambahan disisipkan': '추가 텍스트가 삽입되었습니다',
    'Rekaman siap diproses': '녹음 준비 완료',
    'Gagal menghentikan rekaman': '녹음 중지 실패',

    'Kembali ke Daftar': '목록으로 돌아가기',
    'Kembali ke Detail': '상세로 돌아가기',
    'ID': 'ID',
    'Durasi': '길이',

    'Edit Catatan': '노트 편집',
    'Ubah judul atau isi catatan Anda.':
      '노트 제목이나 내용을 변경합니다.',
    'Simpan Perubahan': '변경사항 저장',
    'Perubahan disimpan': '변경사항이 저장되었습니다',
    'Judul tidak boleh kosong.': '제목은 비어 있을 수 없습니다.',
    'Isi tidak boleh kosong.': '내용은 비어 있을 수 없습니다.',
    'Judul catatan tidak boleh kosong.':
      '노트 제목은 비어 있을 수 없습니다.',

    'Hapus Catatan?': '노트를 삭제하시겠습니까?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      '는 영구적으로 삭제되며 복구할 수 없습니다.',
    'Ya, Hapus': '예, 삭제',
    'Catatan dihapus': '노트가 삭제되었습니다',
    'Gagal menghapus': '삭제 실패',

    'Fitur grouping akan dibangun pada Phase 4.':
      '그룹 기능은 4단계에서 구축됩니다.',
    'Buat Group': '그룹 만들기',
    'Akan dibangun pada Phase 4.': '4단계에서 구축될 예정입니다.',
    'Daftar slide publik akan dibangun pada Phase 4.':
      '공개 슬라이드 목록은 4단계에서 구축됩니다.',

    'Pilih Bahasa': '언어 선택',
    'Cari bahasa...': '언어 검색...',
    'Bahasa tidak ditemukan': '언어를 찾을 수 없습니다',
    'Bahasa berhasil diubah': '언어가 변경되었습니다',
    'Bahasa': '언어',

    // --- Narrator & Translate ---
    'Narator': '낭독기',
    'Putar': '재생',
    'Jeda': '일시정지',
    'Lanjut': '계속',
    'Kecepatan': '속도',
    'Asli': '원문',
    'Tampilkan': '표시',
    'Terjemahkan': '번역',
    'Menerjemahkan...': '번역 중...',
    'Terjemahan selesai': '번역 완료',
    'Terjemahan gagal': '번역 실패',
    'Narator tidak didukung di browser ini': '이 브라우저는 낭독을 지원하지 않습니다',
    'Suara tidak tersedia untuk bahasa ini': '이 언어의 음성을 사용할 수 없습니다',
    'Memuat suara...': '음성 로드 중...',
    'Kembali ke teks asli': '원문으로 돌아가기',
    'Pilih bahasa terjemahan': '번역 언어 선택',
    'Bahasa Indonesia (asli)': '인도네시아어 (원문)',
    'Versi terjemahan': '번역 버전',
    'Sedang membaca...': '읽는 중...',
    'Berhenti': '중지됨',
    'Terjemahan dimuat dari cache': '캐시에서 번역을 로드했습니다'
  },

  // ============================================================
  // HINDI
  // ============================================================
  hi: {
    'Menu': 'मेनू',
    'Catatan': 'नोट्स',
    'Group': 'समूह',
    'Slide': 'स्लाइड',
    'MEMUAT...': 'लोड हो रहा है...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · ड्राइविंग स्कूल नोट ऐप',

    'Keluar': 'लॉग आउट',
    'Silakan login terlebih dahulu': 'कृपया पहले लॉगिन करें',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'इस मेनू का उपयोग करने के लिए कृपया पहले लॉगिन करें',
    'Anda telah keluar': 'आप लॉग आउट हो गए हैं',
    'Login tidak valid': 'अमान्य लॉगिन',

    'Selamat datang': 'स्वागत है',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'ड्राइविंग नोट्स बनाने के लिए मेनू चुनें।',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      '🔒 चिह्नित मेनू का उपयोग करने के लिए कृपया लॉगिन करें।',
    'Buat Catatan': 'नोट बनाएं',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'आवाज़ रिकॉर्ड करें, स्वचालित रूप से टेक्स्ट बन जाएगा। लॉगिन आवश्यक।',
    'Buat Group Catatan': 'समूह बनाएं',
    'Gabung beberapa catatan. Perlu login.':
      'कई नोट्स को मिलाएं। लॉगिन आवश्यक।',
    'Lihat Slide Note': 'स्लाइड देखें',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'नोट स्लाइड दिखाएं। सभी के लिए सुलभ।',
    'Catatan Saya': 'मेरे नोट्स',
    'Daftar catatan yang Anda buat. Perlu login.':
      'आपके बनाए नोट्स की सूची। लॉगिन आवश्यक।',

    'Semua catatan yang Anda buat.':
      'आपके द्वारा बनाए गए सभी नोट्स।',
    'Memuat catatan...': 'नोट्स लोड हो रहे हैं...',
    'Belum ada catatan': 'अभी तक कोई नोट्स नहीं',
    'Mulai dengan merekam catatan pertama Anda.':
      'अपना पहला नोट रिकॉर्ड करके शुरू करें।',
    'Buat Catatan Pertama': 'पहला नोट बनाएं',
    'Lihat': 'देखें',
    'Edit': 'संपादित करें',
    'Hapus': 'हटाएं',
    'catatan': 'नोट्स',
    'Gagal memuat': 'लोड करने में विफल',
    'Coba Lagi': 'पुनः प्रयास करें',
    'Halaman tidak ditemukan': 'पृष्ठ नहीं मिला',

    'Buat Catatan Baru': 'नया नोट बनाएं',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'अपनी आवाज़ रिकॉर्ड करें, फिर स्वचालित रूप से टेक्स्ट में बदल जाएगा।',
    'Tekan tombol untuk mulai merekam':
      'रिकॉर्डिंग शुरू करने के लिए बटन दबाएं',
    'Mulai Rekam': 'रिकॉर्डिंग शुरू करें',
    'Stop': 'रोकें',
    'Batalkan Rekaman': 'रिकॉर्डिंग रद्द करें',
    'Proses Transkripsi': 'प्रतिलेखन करें',
    'Sedang merekam... bicara dengan jelas':
      'रिकॉर्डिंग हो रही है... स्पष्ट बोलें',
    'Mengirim audio ke Gemini...': 'ऑडियो Gemini को भेजा जा रहा है...',
    'Memproses...': 'प्रक्रिया हो रही है...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'प्रतिलेखन पूरा। ज़रूरत हो तो टेक्स्ट संपादित करें।',
    'Transkripsi gagal': 'प्रतिलेखन विफल',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'रिकॉर्डिंग बहुत बड़ी। अधिकतम 19 MB।',
    'Rekaman terlalu besar.': 'रिकॉर्डिंग बहुत बड़ी।',
    'Judul catatan': 'नोट का शीर्षक',
    'Contoh: Teknik parkir paralel': 'उदाहरण: समानांतर पार्किंग तकनीक',
    'Isi catatan': 'नोट की सामग्री',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'प्रतिलेखन परिणाम यहाँ दिखाई देगा, संपादित किया जा सकता है...',
    'Simpan Catatan': 'नोट सहेजें',
    'Tambah Rekam': 'रिकॉर्डिंग जोड़ें',
    'Batal': 'रद्द करें',
    'Menyimpan...': 'सहेजा जा रहा है...',
    'Catatan berhasil disimpan!': 'नोट सफलतापूर्वक सहेजा गया!',
    'Gagal menyimpan': 'सहेजने में विफल',
    'Gagal mengakses mikrofon': 'माइक्रोफ़ोन तक पहुँचने में विफल',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'आपका ब्राउज़र रिकॉर्डिंग का समर्थन नहीं करता। नवीनतम Chrome, Edge, या Safari उपयोग करें।',
    'Browser Anda tidak mendukung rekaman suara.':
      'आपका ब्राउज़र रिकॉर्डिंग का समर्थन नहीं करता।',
    'Browser tidak mendukung rekaman.':
      'ब्राउज़र रिकॉर्डिंग का समर्थन नहीं करता।',
    'Hasil akan disisipkan pada posisi kursor':
      'परिणाम कर्सर की स्थिति पर डाला जाएगा',
    'Mulai': 'शुरू करें',
    'Sisipkan': 'डालें',
    'Tutup': 'बंद करें',
    'Siap merekam': 'रिकॉर्डिंग के लिए तैयार',
    'Siap disisipkan ke catatan': 'नोट में डालने के लिए तैयार',
    'Teks tambahan disisipkan': 'अतिरिक्त टेक्स्ट डाला गया',
    'Rekaman siap diproses': 'रिकॉर्डिंग संसाधित करने के लिए तैयार',
    'Gagal menghentikan rekaman': 'रिकॉर्डिंग रोकने में विफल',

    'Kembali ke Daftar': 'सूची पर वापस जाएं',
    'Kembali ke Detail': 'विवरण पर वापस जाएं',
    'ID': 'आईडी',
    'Durasi': 'अवधि',

    'Edit Catatan': 'नोट संपादित करें',
    'Ubah judul atau isi catatan Anda.':
      'अपने नोट का शीर्षक या सामग्री बदलें।',
    'Simpan Perubahan': 'परिवर्तन सहेजें',
    'Perubahan disimpan': 'परिवर्तन सहेजे गए',
    'Judul tidak boleh kosong.': 'शीर्षक खाली नहीं हो सकता।',
    'Isi tidak boleh kosong.': 'सामग्री खाली नहीं हो सकती।',
    'Judul catatan tidak boleh kosong.':
      'नोट का शीर्षक खाली नहीं हो सकता।',

    'Hapus Catatan?': 'नोट हटाएं?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'स्थायी रूप से हटा दिया जाएगा और पुनर्प्राप्त नहीं किया जा सकता।',
    'Ya, Hapus': 'हाँ, हटाएं',
    'Catatan dihapus': 'नोट हटा दिया गया',
    'Gagal menghapus': 'हटाने में विफल',

    'Fitur grouping akan dibangun pada Phase 4.':
      'समूहन सुविधा चरण 4 में बनाई जाएगी।',
    'Buat Group': 'समूह बनाएं',
    'Akan dibangun pada Phase 4.': 'चरण 4 में बनाया जाएगा।',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'सार्वजनिक स्लाइड सूची चरण 4 में बनाई जाएगी।',

    'Pilih Bahasa': 'भाषा चुनें',
    'Cari bahasa...': 'भाषा खोजें...',
    'Bahasa tidak ditemukan': 'भाषा नहीं मिली',
    'Bahasa berhasil diubah': 'भाषा सफलतापूर्वक बदली गई',
    'Bahasa': 'भाषा',

    // --- Narrator & Translate ---
    'Narator': 'वाचक',
    'Putar': 'चलाएं',
    'Jeda': 'रोकें',
    'Lanjut': 'जारी रखें',
    'Kecepatan': 'गति',
    'Asli': 'मूल',
    'Tampilkan': 'दिखाएं',
    'Terjemahkan': 'अनुवाद करें',
    'Menerjemahkan...': 'अनुवाद हो रहा है...',
    'Terjemahan selesai': 'अनुवाद पूरा',
    'Terjemahan gagal': 'अनुवाद विफल',
    'Narator tidak didukung di browser ini': 'इस ब्राउज़र में वाचक समर्थित नहीं है',
    'Suara tidak tersedia untuk bahasa ini': 'इस भाषा के लिए आवाज़ उपलब्ध नहीं है',
    'Memuat suara...': 'आवाज़ लोड हो रही है...',
    'Kembali ke teks asli': 'मूल पाठ पर वापस जाएं',
    'Pilih bahasa terjemahan': 'अनुवाद भाषा चुनें',
    'Bahasa Indonesia (asli)': 'इंडोनेशियाई (मूल)',
    'Versi terjemahan': 'अनुवादित संस्करण',
    'Sedang membaca...': 'पढ़ रहा है...',
    'Berhenti': 'रुका हुआ',
    'Terjemahan dimuat dari cache': 'अनुवाद कैश से लोड किया गया'
  },

  // ============================================================
  // THAI
  // ============================================================
  th: {
    'Menu': 'เมนู',
    'Catatan': 'บันทึก',
    'Group': 'กลุ่ม',
    'Slide': 'สไลด์',
    'MEMUAT...': 'กำลังโหลด...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · แอปบันทึกโรงเรียนสอนขับรถ',

    'Keluar': 'ออกจากระบบ',
    'Silakan login terlebih dahulu': 'กรุณาเข้าสู่ระบบก่อน',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'กรุณาเข้าสู่ระบบก่อนเพื่อเข้าถึงเมนูนี้',
    'Anda telah keluar': 'คุณออกจากระบบแล้ว',
    'Login tidak valid': 'การเข้าสู่ระบบไม่ถูกต้อง',

    'Selamat datang': 'ยินดีต้อนรับ',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'เลือกเมนูเพื่อเริ่มสร้างบันทึกการขับรถ',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      'กรุณาเข้าสู่ระบบเพื่อเข้าถึงเมนูที่ทำเครื่องหมาย 🔒',
    'Buat Catatan': 'สร้างบันทึก',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'อัดเสียง แปลงเป็นข้อความอัตโนมัติ ต้องเข้าสู่ระบบ',
    'Buat Group Catatan': 'สร้างกลุ่ม',
    'Gabung beberapa catatan. Perlu login.':
      'รวมหลายบันทึก ต้องเข้าสู่ระบบ',
    'Lihat Slide Note': 'ดูสไลด์',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'แสดงสไลด์บันทึก ทุกคนเข้าถึงได้',
    'Catatan Saya': 'บันทึกของฉัน',
    'Daftar catatan yang Anda buat. Perlu login.':
      'รายการบันทึกที่คุณสร้าง ต้องเข้าสู่ระบบ',

    'Semua catatan yang Anda buat.': 'บันทึกทั้งหมดที่คุณสร้าง',
    'Memuat catatan...': 'กำลังโหลดบันทึก...',
    'Belum ada catatan': 'ยังไม่มีบันทึก',
    'Mulai dengan merekam catatan pertama Anda.':
      'เริ่มด้วยการอัดบันทึกแรกของคุณ',
    'Buat Catatan Pertama': 'สร้างบันทึกแรก',
    'Lihat': 'ดู',
    'Edit': 'แก้ไข',
    'Hapus': 'ลบ',
    'catatan': 'บันทึก',
    'Gagal memuat': 'โหลดไม่สำเร็จ',
    'Coba Lagi': 'ลองอีกครั้ง',
    'Halaman tidak ditemukan': 'ไม่พบหน้า',

    'Buat Catatan Baru': 'สร้างบันทึกใหม่',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'อัดเสียงของคุณ แล้วแปลงเป็นข้อความอัตโนมัติ',
    'Tekan tombol untuk mulai merekam': 'กดปุ่มเพื่อเริ่มอัด',
    'Mulai Rekam': 'เริ่มอัด',
    'Stop': 'หยุด',
    'Batalkan Rekaman': 'ยกเลิกการอัด',
    'Proses Transkripsi': 'ประมวลผลการถอดเสียง',
    'Sedang merekam... bicara dengan jelas':
      'กำลังอัด... พูดให้ชัดเจน',
    'Mengirim audio ke Gemini...': 'กำลังส่งเสียงไปยัง Gemini...',
    'Memproses...': 'กำลังประมวลผล...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'ถอดเสียงเสร็จ แก้ไขข้อความถ้าจำเป็น',
    'Transkripsi gagal': 'ถอดเสียงไม่สำเร็จ',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'การอัดใหญ่เกินไป สูงสุด 19 MB',
    'Rekaman terlalu besar.': 'การอัดใหญ่เกินไป',
    'Judul catatan': 'ชื่อบันทึก',
    'Contoh: Teknik parkir paralel': 'ตัวอย่าง: เทคนิคจอดรถขนาน',
    'Isi catatan': 'เนื้อหาบันทึก',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'ผลการถอดเสียงจะปรากฏที่นี่ แก้ไขได้...',
    'Simpan Catatan': 'บันทึก',
    'Tambah Rekam': 'เพิ่มการอัด',
    'Batal': 'ยกเลิก',
    'Menyimpan...': 'กำลังบันทึก...',
    'Catatan berhasil disimpan!': 'บันทึกสำเร็จ!',
    'Gagal menyimpan': 'บันทึกไม่สำเร็จ',
    'Gagal mengakses mikrofon': 'เข้าถึงไมโครโฟนไม่สำเร็จ',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'เบราว์เซอร์ของคุณไม่รองรับการอัดเสียง ใช้ Chrome, Edge หรือ Safari ล่าสุด',
    'Browser Anda tidak mendukung rekaman suara.':
      'เบราว์เซอร์ของคุณไม่รองรับการอัดเสียง',
    'Browser tidak mendukung rekaman.':
      'เบราว์เซอร์ไม่รองรับการอัด',
    'Hasil akan disisipkan pada posisi kursor':
      'ผลลัพธ์จะถูกแทรกที่ตำแหน่งเคอร์เซอร์',
    'Mulai': 'เริ่ม',
    'Sisipkan': 'แทรก',
    'Tutup': 'ปิด',
    'Siap merekam': 'พร้อมอัด',
    'Siap disisipkan ke catatan': 'พร้อมแทรกในบันทึก',
    'Teks tambahan disisipkan': 'แทรกข้อความเพิ่มเติมแล้ว',
    'Rekaman siap diproses': 'การอัดพร้อมประมวลผล',
    'Gagal menghentikan rekaman': 'หยุดการอัดไม่สำเร็จ',

    'Kembali ke Daftar': 'กลับไปที่รายการ',
    'Kembali ke Detail': 'กลับไปที่รายละเอียด',
    'ID': 'ID',
    'Durasi': 'ระยะเวลา',

    'Edit Catatan': 'แก้ไขบันทึก',
    'Ubah judul atau isi catatan Anda.':
      'เปลี่ยนชื่อหรือเนื้อหาบันทึกของคุณ',
    'Simpan Perubahan': 'บันทึกการเปลี่ยนแปลง',
    'Perubahan disimpan': 'บันทึกการเปลี่ยนแปลงแล้ว',
    'Judul tidak boleh kosong.': 'ชื่อต้องไม่ว่าง',
    'Isi tidak boleh kosong.': 'เนื้อหาต้องไม่ว่าง',
    'Judul catatan tidak boleh kosong.':
      'ชื่อบันทึกต้องไม่ว่าง',

    'Hapus Catatan?': 'ลบบันทึก?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'จะถูกลบอย่างถาวรและไม่สามารถกู้คืนได้',
    'Ya, Hapus': 'ใช่ ลบ',
    'Catatan dihapus': 'ลบบันทึกแล้ว',
    'Gagal menghapus': 'ลบไม่สำเร็จ',

    'Fitur grouping akan dibangun pada Phase 4.':
      'ฟีเจอร์การจัดกลุ่มจะสร้างในเฟส 4',
    'Buat Group': 'สร้างกลุ่ม',
    'Akan dibangun pada Phase 4.': 'จะสร้างในเฟส 4',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'รายการสไลด์สาธารณะจะสร้างในเฟส 4',

    'Pilih Bahasa': 'เลือกภาษา',
    'Cari bahasa...': 'ค้นหาภาษา...',
    'Bahasa tidak ditemukan': 'ไม่พบภาษา',
    'Bahasa berhasil diubah': 'เปลี่ยนภาษาสำเร็จ',
    'Bahasa': 'ภาษา',

    // --- Narrator & Translate ---
    'Narator': 'นักอ่าน',
    'Putar': 'เล่น',
    'Jeda': 'หยุดชั่วคราว',
    'Lanjut': 'ดำเนินการต่อ',
    'Kecepatan': 'ความเร็ว',
    'Asli': 'ต้นฉบับ',
    'Tampilkan': 'แสดง',
    'Terjemahkan': 'แปล',
    'Menerjemahkan...': 'กำลังแปล...',
    'Terjemahan selesai': 'แปลเสร็จแล้ว',
    'Terjemahan gagal': 'แปลไม่สำเร็จ',
    'Narator tidak didukung di browser ini': 'เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง',
    'Suara tidak tersedia untuk bahasa ini': 'ไม่มีเสียงสำหรับภาษานี้',
    'Memuat suara...': 'กำลังโหลดเสียง...',
    'Kembali ke teks asli': 'กลับไปที่ข้อความต้นฉบับ',
    'Pilih bahasa terjemahan': 'เลือกภาษาที่จะแปล',
    'Bahasa Indonesia (asli)': 'ภาษาอินโดนีเซีย (ต้นฉบับ)',
    'Versi terjemahan': 'เวอร์ชันแปล',
    'Sedang membaca...': 'กำลังอ่าน...',
    'Berhenti': 'หยุดแล้ว',
    'Terjemahan dimuat dari cache': 'โหลดการแปลจากแคช'
  },

  // ============================================================
  // FILIPINO
  // ============================================================
  tl: {
    'Menu': 'Menu',
    'Catatan': 'Mga Tala',
    'Group': 'Grupo',
    'Slide': 'Slide',
    'MEMUAT...': 'NAG-LO-LOAD...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · App ng tala para sa driving school',

    'Keluar': 'Mag-sign out',
    'Silakan login terlebih dahulu': 'Mangyaring mag-login muna',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'Mangyaring mag-login muna para ma-access ang menu na ito',
    'Anda telah keluar': 'Nag-sign out ka na',
    'Login tidak valid': 'Hindi wastong login',

    'Selamat datang': 'Maligayang pagdating',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'Pumili ng menu para magsimulang gumawa ng tala sa pagmamaneho.',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      'Mangyaring mag-login para ma-access ang mga menu na may 🔒.',
    'Buat Catatan': 'Gumawa ng Tala',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'I-record ang boses, awtomatikong magiging teksto. Kailangan ng login.',
    'Buat Group Catatan': 'Gumawa ng Grupo',
    'Gabung beberapa catatan. Perlu login.':
      'Pagsamahin ang maraming tala. Kailangan ng login.',
    'Lihat Slide Note': 'Tingnan ang Slide',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'Ipakita ang slide ng tala. Ma-access ng kahit sino.',
    'Catatan Saya': 'Aking mga Tala',
    'Daftar catatan yang Anda buat. Perlu login.':
      'Listahan ng iyong mga tala. Kailangan ng login.',

    'Semua catatan yang Anda buat.': 'Lahat ng tala na ginawa mo.',
    'Memuat catatan...': 'Naglo-load ng mga tala...',
    'Belum ada catatan': 'Wala pang tala',
    'Mulai dengan merekam catatan pertama Anda.':
      'Magsimula sa pag-record ng iyong unang tala.',
    'Buat Catatan Pertama': 'Gumawa ng Unang Tala',
    'Lihat': 'Tingnan',
    'Edit': 'I-edit',
    'Hapus': 'Burahin',
    'catatan': 'tala',
    'Gagal memuat': 'Nabigong i-load',
    'Coba Lagi': 'Subukan Muli',
    'Halaman tidak ditemukan': 'Hindi mahanap ang pahina',

    'Buat Catatan Baru': 'Bagong Tala',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'I-record ang iyong boses, awtomatikong ita-transcribe sa teksto.',
    'Tekan tombol untuk mulai merekam':
      'Pindutin ang button para magsimulang mag-record',
    'Mulai Rekam': 'Simulan ang Pag-record',
    'Stop': 'Itigil',
    'Batalkan Rekaman': 'Kanselahin ang Pag-record',
    'Proses Transkripsi': 'I-transcribe',
    'Sedang merekam... bicara dengan jelas':
      'Nagre-record... magsalita nang malinaw',
    'Mengirim audio ke Gemini...': 'Nagpapadala ng audio sa Gemini...',
    'Memproses...': 'Nagpro-proses...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'Tapos na ang transkripsyon. I-edit ang teksto kung kailangan.',
    'Transkripsi gagal': 'Nabigong mag-transcribe',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'Masyadong malaki ang recording. Maximum 19 MB.',
    'Rekaman terlalu besar.': 'Masyadong malaki ang recording.',
    'Judul catatan': 'Pamagat ng tala',
    'Contoh: Teknik parkir paralel':
      'Halimbawa: Parallel parking technique',
    'Isi catatan': 'Nilalaman ng tala',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'Lalabas dito ang resulta ng transkripsyon, maaaring i-edit...',
    'Simpan Catatan': 'I-save ang Tala',
    'Tambah Rekam': 'Magdagdag ng Recording',
    'Batal': 'Kanselahin',
    'Menyimpan...': 'Nagse-save...',
    'Catatan berhasil disimpan!': 'Matagumpay na na-save ang tala!',
    'Gagal menyimpan': 'Nabigong mag-save',
    'Gagal mengakses mikrofon': 'Nabigong ma-access ang mikropono',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'Hindi sinusuportahan ng iyong browser ang pag-record. Gumamit ng pinakabagong Chrome, Edge, o Safari.',
    'Browser Anda tidak mendukung rekaman suara.':
      'Hindi sinusuportahan ng iyong browser ang pag-record.',
    'Browser tidak mendukung rekaman.':
      'Hindi sinusuportahan ng browser ang pag-record.',
    'Hasil akan disisipkan pada posisi kursor':
      'Ipapasok ang resulta sa posisyon ng cursor',
    'Mulai': 'Simulan',
    'Sisipkan': 'Ipasok',
    'Tutup': 'Isara',
    'Siap merekam': 'Handa nang mag-record',
    'Siap disisipkan ke catatan': 'Handa nang ipasok sa tala',
    'Teks tambahan disisipkan': 'Naipasok ang karagdagang teksto',
    'Rekaman siap diproses': 'Handa nang i-proses ang recording',
    'Gagal menghentikan rekaman': 'Nabigong itigil ang recording',

    'Kembali ke Daftar': 'Bumalik sa Listahan',
    'Kembali ke Detail': 'Bumalik sa Detalye',
    'ID': 'ID',
    'Durasi': 'Tagal',

    'Edit Catatan': 'I-edit ang Tala',
    'Ubah judul atau isi catatan Anda.':
      'Baguhin ang pamagat o nilalaman ng iyong tala.',
    'Simpan Perubahan': 'I-save ang mga Pagbabago',
    'Perubahan disimpan': 'Na-save ang mga pagbabago',
    'Judul tidak boleh kosong.': 'Hindi maaaring walang laman ang pamagat.',
    'Isi tidak boleh kosong.': 'Hindi maaaring walang laman ang nilalaman.',
    'Judul catatan tidak boleh kosong.':
      'Hindi maaaring walang laman ang pamagat ng tala.',

    'Hapus Catatan?': 'Burahin ang Tala?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'ay permanenteng buburahin at hindi na maibabalik.',
    'Ya, Hapus': 'Oo, Burahin',
    'Catatan dihapus': 'Nabura ang tala',
    'Gagal menghapus': 'Nabigong burahin',

    'Fitur grouping akan dibangun pada Phase 4.':
      'Ang feature ng pag-grupo ay bubuuin sa Phase 4.',
    'Buat Group': 'Gumawa ng Grupo',
    'Akan dibangun pada Phase 4.': 'Bubuuinn sa Phase 4.',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'Ang listahan ng pampublikong slide ay bubuuin sa Phase 4.',

    'Pilih Bahasa': 'Pumili ng Wika',
    'Cari bahasa...': 'Maghanap ng wika...',
    'Bahasa tidak ditemukan': 'Hindi mahanap ang wika',
    'Bahasa berhasil diubah': 'Matagumpay na nabago ang wika',
    'Bahasa': 'Wika',

    // --- Narrator & Translate ---
    'Narator': 'Tagapagsalita',
    'Putar': 'I-play',
    'Jeda': 'I-pause',
    'Lanjut': 'Ituloy',
    'Kecepatan': 'Bilis',
    'Asli': 'Orihinal',
    'Tampilkan': 'Ipakita',
    'Terjemahkan': 'Isalin',
    'Menerjemahkan...': 'Nagsasalin...',
    'Terjemahan selesai': 'Tapos na ang pagsasalin',
    'Terjemahan gagal': 'Nabigong magsalin',
    'Narator tidak didukung di browser ini': 'Hindi sinusuportahan ng browser na ito ang narator',
    'Suara tidak tersedia untuk bahasa ini': 'Walang available na boses para sa wikang ito',
    'Memuat suara...': 'Naglo-load ng boses...',
    'Kembali ke teks asli': 'Bumalik sa orihinal na teksto',
    'Pilih bahasa terjemahan': 'Pumili ng wikang isasalin',
    'Bahasa Indonesia (asli)': 'Indonesian (orihinal)',
    'Versi terjemahan': 'Bersyong isinalin',
    'Sedang membaca...': 'Nagbabasa...',
    'Berhenti': 'Nakahinto',
    'Terjemahan dimuat dari cache': 'Na-load ang salin mula sa cache'
  },

  // ============================================================
  // BURMESE
  // ============================================================
  my: {
    'Menu': 'မီနူး',
    'Catatan': 'မှတ်စုများ',
    'Group': 'အုပ်စု',
    'Slide': 'ဆလိုက်',
    'MEMUAT...': 'ဖွင့်နေသည်...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · မောင်းသင်တန်းကျောင်း မှတ်စုအက်ပ်',

    'Keluar': 'ထွက်ရန်',
    'Silakan login terlebih dahulu': 'ကျေးဇူးပြု၍ အရင်လော့ဂ်အင်ဝင်ပါ',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'ဤမီနူးကို အသုံးပြုရန် ကျေးဇူးပြု၍ အရင်လော့ဂ်အင်ဝင်ပါ',
    'Anda telah keluar': 'သင်ထွက်ပြီးပါပြီ',
    'Login tidak valid': 'လော့ဂ်အင်မမှန်ကန်ပါ',

    'Selamat datang': 'ကြိုဆိုပါတယ်',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'မောင်းနှင်မှုမှတ်စုများ စတင်ဖန်တီးရန် မီနူးကို ရွေးပါ။',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      '🔒 အမှတ်အသားပါသော မီနူးများကို အသုံးပြုရန် ကျေးဇူးပြု၍ လော့ဂ်အင်ဝင်ပါ။',
    'Buat Catatan': 'မှတ်စုဖန်တီးရန်',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'အသံဖမ်းပါ၊ အလိုအလျောက် စာသားဖြစ်သွားမည်။ လော့ဂ်အင်လိုအပ်သည်။',
    'Buat Group Catatan': 'အုပ်စုဖန်တီးရန်',
    'Gabung beberapa catatan. Perlu login.':
      'မှတ်စုများစွာကို ပေါင်းစပ်ပါ။ လော့ဂ်အင်လိုအပ်သည်။',
    'Lihat Slide Note': 'ဆလိုက်ကြည့်ရန်',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'မှတ်စုဆလိုက်များ ပြသပါ။ မည်သူမဆို အသုံးပြုနိုင်သည်။',
    'Catatan Saya': 'ကျွန်ုပ်၏မှတ်စုများ',
    'Daftar catatan yang Anda buat. Perlu login.':
      'သင်ဖန်တီးသော မှတ်စုစာရင်း။ လော့ဂ်အင်လိုအပ်သည်။',

    'Semua catatan yang Anda buat.': 'သင်ဖန်တီးသမျှ မှတ်စုများ။',
    'Memuat catatan...': 'မှတ်စုများ ဖွင့်နေသည်...',
    'Belum ada catatan': 'မှတ်စုမရှိသေးပါ',
    'Mulai dengan merekam catatan pertama Anda.':
      'သင်၏ ပထမဆုံးမှတ်စုကို အသံဖမ်းခြင်းဖြင့် စတင်ပါ။',
    'Buat Catatan Pertama': 'ပထမဆုံးမှတ်စုဖန်တီးရန်',
    'Lihat': 'ကြည့်ရန်',
    'Edit': 'တည်းဖြတ်ရန်',
    'Hapus': 'ဖျက်ရန်',
    'catatan': 'မှတ်စု',
    'Gagal memuat': 'ဖွင့်၍မရပါ',
    'Coba Lagi': 'ထပ်စမ်းကြည့်ပါ',
    'Halaman tidak ditemukan': 'စာမျက်နှာမတွေ့ပါ',

    'Buat Catatan Baru': 'မှတ်စုအသစ်ဖန်တီးရန်',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'သင်၏အသံကို အသံဖမ်းပါ၊ ထို့နောက် အလိုအလျောက် စာသားအဖြစ်ပြောင်းမည်။',
    'Tekan tombol untuk mulai merekam':
      'အသံဖမ်းစတင်ရန် ခလုတ်ကို နှိပ်ပါ',
    'Mulai Rekam': 'အသံဖမ်းစတင်ရန်',
    'Stop': 'ရပ်ရန်',
    'Batalkan Rekaman': 'အသံဖမ်းခြင်း ပယ်ဖျက်ရန်',
    'Proses Transkripsi': 'စာသားပြောင်းရန်',
    'Sedang merekam... bicara dengan jelas':
      'အသံဖမ်းနေသည်... ရှင်းလင်းစွာပြောပါ',
    'Mengirim audio ke Gemini...':
      'အသံကို Gemini သို့ ပို့နေသည်...',
    'Memproses...': 'လုပ်ဆောင်နေသည်...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'စာသားပြောင်းပြီးပါပြီ။ လိုအပ်ပါက တည်းဖြတ်ပါ။',
    'Transkripsi gagal': 'စာသားပြောင်းခြင်း မအောင်မြင်ပါ',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'အသံဖမ်းခြင်း ကြီးလွန်းသည်။ အများဆုံး 19 MB။',
    'Rekaman terlalu besar.': 'အသံဖမ်းခြင်း ကြီးလွန်းသည်။',
    'Judul catatan': 'မှတ်စုခေါင်းစဉ်',
    'Contoh: Teknik parkir paralel': 'ဥပမာ - အပြိုင်ကားရပ်နည်း',
    'Isi catatan': 'မှတ်စုအကြောင်းအရာ',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'စာသားပြောင်းရလဒ် ဤနေရာတွင် ပေါ်လာမည်၊ တည်းဖြတ်နိုင်သည်...',
    'Simpan Catatan': 'မှတ်စုသိမ်းရန်',
    'Tambah Rekam': 'အသံဖမ်းထပ်ထည့်ရန်',
    'Batal': 'ပယ်ဖျက်ရန်',
    'Menyimpan...': 'သိမ်းနေသည်...',
    'Catatan berhasil disimpan!':
      'မှတ်စု အောင်မြင်စွာ သိမ်းပြီးပါပြီ။',
    'Gagal menyimpan': 'သိမ်း၍မရပါ',
    'Gagal mengakses mikrofon':
      'မိုက်ကရိုဖုန်း အသုံးပြု၍မရပါ',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'သင်၏ဘရောက်ဇာသည် အသံဖမ်းခြင်းကို မထောက်ပံ့ပါ။ Chrome၊ Edge သို့မဟုတ် Safari အသစ်ဆုံးကို အသုံးပြုပါ။',
    'Browser Anda tidak mendukung rekaman suara.':
      'သင်၏ဘရောက်ဇာသည် အသံဖမ်းခြင်းကို မထောက်ပံ့ပါ။',
    'Browser tidak mendukung rekaman.':
      'ဘရောက်ဇာသည် အသံဖမ်းခြင်းကို မထောက်ပံ့ပါ။',
    'Hasil akan disisipkan pada posisi kursor':
      'ရလဒ်ကို cursor တည်နေရာတွင် ထည့်ပါမည်',
    'Mulai': 'စတင်ရန်',
    'Sisipkan': 'ထည့်ရန်',
    'Tutup': 'ပိတ်ရန်',
    'Siap merekam': 'အသံဖမ်းရန် အဆင်သင့်',
    'Siap disisipkan ke catatan': 'မှတ်စုထဲ ထည့်ရန် အဆင်သင့်',
    'Teks tambahan disisipkan': 'အပိုစာသား ထည့်ပြီးပါပြီ',
    'Rekaman siap diproses':
      'အသံဖမ်းခြင်း လုပ်ဆောင်ရန် အဆင်သင့်',
    'Gagal menghentikan rekaman': 'အသံဖမ်းခြင်း ရပ်၍မရပါ',

    'Kembali ke Daftar': 'စာရင်းသို့ ပြန်ရန်',
    'Kembali ke Detail': 'အသေးစိတ်သို့ ပြန်ရန်',
    'ID': 'ID',
    'Durasi': 'ကြာချိန်',

    'Edit Catatan': 'မှတ်စုတည်းဖြတ်ရန်',
    'Ubah judul atau isi catatan Anda.':
      'သင်၏မှတ်စု ခေါင်းစဉ် သို့မဟုတ် အကြောင်းအရာကို ပြောင်းပါ။',
    'Simpan Perubahan': 'အပြောင်းအလဲများ သိမ်းရန်',
    'Perubahan disimpan':
      'အပြောင်းအလဲများ သိမ်းပြီးပါပြီ',
    'Judul tidak boleh kosong.': 'ခေါင်းစဉ် အလွတ်မဖြစ်ရပါ။',
    'Isi tidak boleh kosong.': 'အကြောင်းအရာ အလွတ်မဖြစ်ရပါ။',
    'Judul catatan tidak boleh kosong.':
      'မှတ်စုခေါင်းစဉ် အလွတ်မဖြစ်ရပါ။',

    'Hapus Catatan?': 'မှတ်စုဖျက်မလား?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'ကို အပြီးအပိုင် ဖျက်ပစ်မည်ဖြစ်ပြီး ပြန်လည်ရယူနိုင်မည် မဟုတ်ပါ။',
    'Ya, Hapus': 'ဟုတ်ကဲ့၊ ဖျက်ပါ',
    'Catatan dihapus': 'မှတ်စု ဖျက်ပြီးပါပြီ',
    'Gagal menghapus': 'ဖျက်၍မရပါ',

    'Fitur grouping akan dibangun pada Phase 4.':
      'အုပ်စုဖွဲ့ခြင်း လုပ်ဆောင်ချက်ကို Phase 4 တွင် တည်ဆောက်မည်။',
    'Buat Group': 'အုပ်စုဖန်တီးရန်',
    'Akan dibangun pada Phase 4.':
      'Phase 4 တွင် တည်ဆောက်မည်။',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'အများသူငှာ ဆလိုက်စာရင်းကို Phase 4 တွင် တည်ဆောက်မည်။',

    'Pilih Bahasa': 'ဘာသာစကားရွေးပါ',
    'Cari bahasa...': 'ဘာသာစကားရှာပါ...',
    'Bahasa tidak ditemukan': 'ဘာသာစကားမတွေ့ပါ',
    'Bahasa berhasil diubah':
      'ဘာသာစကား အောင်မြင်စွာပြောင်းပြီးပါပြီ',
    'Bahasa': 'ဘာသာစကား',

    // --- Narrator & Translate ---
    'Narator': 'ဖတ်ပြသူ',
    'Putar': 'ဖွင့်ရန်',
    'Jeda': 'ခေတ္တရပ်ရန်',
    'Lanjut': 'ဆက်ရန်',
    'Kecepatan': 'အမြန်နှုန်း',
    'Asli': 'မူရင်း',
    'Tampilkan': 'ပြသရန်',
    'Terjemahkan': 'ဘာသာပြန်ရန်',
    'Menerjemahkan...': 'ဘာသာပြန်နေသည်...',
    'Terjemahan selesai': 'ဘာသာပြန်ပြီးပါပြီ',
    'Terjemahan gagal': 'ဘာသာပြန်၍မရပါ',
    'Narator tidak didukung di browser ini': 'ဤဘရောက်ဇာသည် ဖတ်ပြခြင်းကို မထောက်ပံ့ပါ',
    'Suara tidak tersedia untuk bahasa ini': 'ဤဘာသာစကားအတွက် အသံမရနိုင်ပါ',
    'Memuat suara...': 'အသံဖွင့်နေသည်...',
    'Kembali ke teks asli': 'မူရင်းစာသားသို့ ပြန်ရန်',
    'Pilih bahasa terjemahan': 'ဘာသာပြန်မည့်ဘာသာစကား ရွေးပါ',
    'Bahasa Indonesia (asli)': 'အင်ဒိုနီးရှားဘာသာ (မူရင်း)',
    'Versi terjemahan': 'ဘာသာပြန်ဗားရှင်း',
    'Sedang membaca...': 'ဖတ်နေသည်...',
    'Berhenti': 'ရပ်ပြီးပါပြီ',
    'Terjemahan dimuat dari cache': 'ဘာသာပြန်ကို cache မှ ဖွင့်ပြီးပါပြီ'
  },

  // ============================================================
  // VIETNAMESE
  // ============================================================
  vi: {
    'Menu': 'Menu',
    'Catatan': 'Ghi chú',
    'Group': 'Nhóm',
    'Slide': 'Trình chiếu',
    'MEMUAT...': 'ĐANG TẢI...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · Ứng dụng ghi chú trường dạy lái xe',

    'Keluar': 'Đăng xuất',
    'Silakan login terlebih dahulu': 'Vui lòng đăng nhập trước',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'Vui lòng đăng nhập trước để truy cập menu này',
    'Anda telah keluar': 'Bạn đã đăng xuất',
    'Login tidak valid': 'Đăng nhập không hợp lệ',

    'Selamat datang': 'Chào mừng',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'Chọn menu để bắt đầu tạo ghi chú lái xe.',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      'Vui lòng đăng nhập để truy cập các menu có dấu 🔒.',
    'Buat Catatan': 'Tạo ghi chú',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'Ghi âm, tự động chuyển thành văn bản. Cần đăng nhập.',
    'Buat Group Catatan': 'Tạo nhóm',
    'Gabung beberapa catatan. Perlu login.':
      'Kết hợp nhiều ghi chú. Cần đăng nhập.',
    'Lihat Slide Note': 'Xem trình chiếu',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'Hiển thị trình chiếu ghi chú. Mọi người đều truy cập được.',
    'Catatan Saya': 'Ghi chú của tôi',
    'Daftar catatan yang Anda buat. Perlu login.':
      'Danh sách ghi chú bạn đã tạo. Cần đăng nhập.',

    'Semua catatan yang Anda buat.': 'Tất cả ghi chú bạn đã tạo.',
    'Memuat catatan...': 'Đang tải ghi chú...',
    'Belum ada catatan': 'Chưa có ghi chú nào',
    'Mulai dengan merekam catatan pertama Anda.':
      'Bắt đầu bằng cách ghi âm ghi chú đầu tiên.',
    'Buat Catatan Pertama': 'Tạo ghi chú đầu tiên',
    'Lihat': 'Xem',
    'Edit': 'Sửa',
    'Hapus': 'Xóa',
    'catatan': 'ghi chú',
    'Gagal memuat': 'Tải thất bại',
    'Coba Lagi': 'Thử lại',
    'Halaman tidak ditemukan': 'Không tìm thấy trang',

    'Buat Catatan Baru': 'Tạo ghi chú mới',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'Ghi âm giọng nói của bạn, sau đó tự động chuyển thành văn bản.',
    'Tekan tombol untuk mulai merekam':
      'Nhấn nút để bắt đầu ghi âm',
    'Mulai Rekam': 'Bắt đầu ghi âm',
    'Stop': 'Dừng',
    'Batalkan Rekaman': 'Hủy ghi âm',
    'Proses Transkripsi': 'Chuyển thành văn bản',
    'Sedang merekam... bicara dengan jelas':
      'Đang ghi âm... nói rõ ràng',
    'Mengirim audio ke Gemini...': 'Đang gửi âm thanh đến Gemini...',
    'Memproses...': 'Đang xử lý...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'Chuyển văn bản hoàn tất. Chỉnh sửa nếu cần.',
    'Transkripsi gagal': 'Chuyển văn bản thất bại',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'Bản ghi quá lớn. Tối đa 19 MB.',
    'Rekaman terlalu besar.': 'Bản ghi quá lớn.',
    'Judul catatan': 'Tiêu đề ghi chú',
    'Contoh: Teknik parkir paralel':
      'Ví dụ: Kỹ thuật đỗ xe song song',
    'Isi catatan': 'Nội dung ghi chú',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'Kết quả chuyển văn bản sẽ xuất hiện ở đây, có thể chỉnh sửa...',
    'Simpan Catatan': 'Lưu ghi chú',
    'Tambah Rekam': 'Thêm ghi âm',
    'Batal': 'Hủy',
    'Menyimpan...': 'Đang lưu...',
    'Catatan berhasil disimpan!': 'Lưu ghi chú thành công!',
    'Gagal menyimpan': 'Lưu thất bại',
    'Gagal mengakses mikrofon': 'Không thể truy cập micrô',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'Trình duyệt của bạn không hỗ trợ ghi âm. Sử dụng Chrome, Edge hoặc Safari mới nhất.',
    'Browser Anda tidak mendukung rekaman suara.':
      'Trình duyệt của bạn không hỗ trợ ghi âm.',
    'Browser tidak mendukung rekaman.':
      'Trình duyệt không hỗ trợ ghi âm.',
    'Hasil akan disisipkan pada posisi kursor':
      'Kết quả sẽ được chèn vào vị trí con trỏ',
    'Mulai': 'Bắt đầu',
    'Sisipkan': 'Chèn',
    'Tutup': 'Đóng',
    'Siap merekam': 'Sẵn sàng ghi âm',
    'Siap disisipkan ke catatan': 'Sẵn sàng chèn vào ghi chú',
    'Teks tambahan disisipkan': 'Đã chèn văn bản bổ sung',
    'Rekaman siap diproses': 'Bản ghi sẵn sàng xử lý',
    'Gagal menghentikan rekaman': 'Dừng ghi âm thất bại',

    'Kembali ke Daftar': 'Quay lại danh sách',
    'Kembali ke Detail': 'Quay lại chi tiết',
    'ID': 'ID',
    'Durasi': 'Thời lượng',

    'Edit Catatan': 'Sửa ghi chú',
    'Ubah judul atau isi catatan Anda.':
      'Thay đổi tiêu đề hoặc nội dung ghi chú của bạn.',
    'Simpan Perubahan': 'Lưu thay đổi',
    'Perubahan disimpan': 'Đã lưu thay đổi',
    'Judul tidak boleh kosong.': 'Tiêu đề không được để trống.',
    'Isi tidak boleh kosong.': 'Nội dung không được để trống.',
    'Judul catatan tidak boleh kosong.':
      'Tiêu đề ghi chú không được để trống.',

    'Hapus Catatan?': 'Xóa ghi chú?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'sẽ bị xóa vĩnh viễn và không thể khôi phục.',
    'Ya, Hapus': 'Có, xóa',
    'Catatan dihapus': 'Đã xóa ghi chú',
    'Gagal menghapus': 'Xóa thất bại',

    'Fitur grouping akan dibangun pada Phase 4.':
      'Tính năng nhóm sẽ được xây dựng trong Giai đoạn 4.',
    'Buat Group': 'Tạo nhóm',
    'Akan dibangun pada Phase 4.':
      'Sẽ được xây dựng trong Giai đoạn 4.',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'Danh sách trình chiếu công khai sẽ được xây dựng trong Giai đoạn 4.',

    'Pilih Bahasa': 'Chọn ngôn ngữ',
    'Cari bahasa...': 'Tìm ngôn ngữ...',
    'Bahasa tidak ditemukan': 'Không tìm thấy ngôn ngữ',
    'Bahasa berhasil diubah': 'Đổi ngôn ngữ thành công',
    'Bahasa': 'Ngôn ngữ',

    // --- Narrator & Translate ---
    'Narator': 'Trình đọc',
    'Putar': 'Phát',
    'Jeda': 'Tạm dừng',
    'Lanjut': 'Tiếp tục',
    'Kecepatan': 'Tốc độ',
    'Asli': 'Gốc',
    'Tampilkan': 'Hiển thị',
    'Terjemahkan': 'Dịch',
    'Menerjemahkan...': 'Đang dịch...',
    'Terjemahan selesai': 'Dịch xong',
    'Terjemahan gagal': 'Dịch thất bại',
    'Narator tidak didukung di browser ini': 'Trình duyệt này không hỗ trợ trình đọc',
    'Suara tidak tersedia untuk bahasa ini': 'Không có giọng nói cho ngôn ngữ này',
    'Memuat suara...': 'Đang tải giọng nói...',
    'Kembali ke teks asli': 'Quay lại văn bản gốc',
    'Pilih bahasa terjemahan': 'Chọn ngôn ngữ dịch',
    'Bahasa Indonesia (asli)': 'Tiếng Indonesia (gốc)',
    'Versi terjemahan': 'Bản dịch',
    'Sedang membaca...': 'Đang đọc...',
    'Berhenti': 'Đã dừng',
    'Terjemahan dimuat dari cache': 'Đã tải bản dịch từ bộ nhớ đệm'
  },

  // ============================================================
  // RUSSIAN
  // ============================================================
  ru: {
    'Menu': 'Меню',
    'Catatan': 'Заметки',
    'Group': 'Группы',
    'Slide': 'Слайды',
    'MEMUAT...': 'ЗАГРУЗКА...',
    '© 2026 Cikgu Roselina Notes · Aplikasi catatan sekolah mengemudi':
      '© 2026 Cikgu Roselina Notes · Приложение для заметок автошколы',

    'Keluar': 'Выйти',
    'Silakan login terlebih dahulu': 'Пожалуйста, сначала войдите',
    'Silakan login terlebih dahulu untuk mengakses menu ini':
      'Пожалуйста, войдите, чтобы получить доступ к этому меню',
    'Anda telah keluar': 'Вы вышли из системы',
    'Login tidak valid': 'Неверный вход',

    'Selamat datang': 'Добро пожаловать',
    'Pilih menu untuk mulai membuat catatan mengemudi.':
      'Выберите меню, чтобы начать создавать заметки о вождении.',
    'Silakan login untuk mengakses menu bertanda 🔒.':
      'Войдите, чтобы получить доступ к меню с 🔒.',
    'Buat Catatan': 'Создать заметку',
    'Rekam suara, otomatis jadi teks. Perlu login.':
      'Запишите голос, автоматически преобразуется в текст. Требуется вход.',
    'Buat Group Catatan': 'Создать группу',
    'Gabung beberapa catatan. Perlu login.':
      'Объедините несколько заметок. Требуется вход.',
    'Lihat Slide Note': 'Просмотр слайдов',
    'Tampilkan slide catatan. Bisa diakses siapa saja.':
      'Показывать слайды заметок. Доступно всем.',
    'Catatan Saya': 'Мои заметки',
    'Daftar catatan yang Anda buat. Perlu login.':
      'Список ваших заметок. Требуется вход.',

    'Semua catatan yang Anda buat.': 'Все созданные вами заметки.',
    'Memuat catatan...': 'Загрузка заметок...',
    'Belum ada catatan': 'Заметок пока нет',
    'Mulai dengan merekam catatan pertama Anda.':
      'Начните с записи первой заметки.',
    'Buat Catatan Pertama': 'Создать первую заметку',
    'Lihat': 'Просмотр',
    'Edit': 'Редактировать',
    'Hapus': 'Удалить',
    'catatan': 'заметок',
    'Gagal memuat': 'Ошибка загрузки',
    'Coba Lagi': 'Попробовать снова',
    'Halaman tidak ditemukan': 'Страница не найдена',

    'Buat Catatan Baru': 'Новая заметка',
    'Rekam suara Anda, lalu transkripsi otomatis ke teks.':
      'Запишите свой голос, затем автоматическая транскрипция в текст.',
    'Tekan tombol untuk mulai merekam':
      'Нажмите кнопку, чтобы начать запись',
    'Mulai Rekam': 'Начать запись',
    'Stop': 'Стоп',
    'Batalkan Rekaman': 'Отменить запись',
    'Proses Transkripsi': 'Транскрибировать',
    'Sedang merekam... bicara dengan jelas':
      'Запись... говорите чётко',
    'Mengirim audio ke Gemini...': 'Отправка аудио в Gemini...',
    'Memproses...': 'Обработка...',
    'Transkripsi selesai. Edit teks jika perlu.':
      'Транскрипция завершена. Отредактируйте текст при необходимости.',
    'Transkripsi gagal': 'Ошибка транскрипции',
    'Rekaman terlalu besar. Maksimal 19 MB.':
      'Запись слишком большая. Максимум 19 МБ.',
    'Rekaman terlalu besar.': 'Запись слишком большая.',
    'Judul catatan': 'Заголовок заметки',
    'Contoh: Teknik parkir paralel':
      'Пример: Техника параллельной парковки',
    'Isi catatan': 'Содержание заметки',
    'Hasil transkripsi akan muncul di sini, bisa diedit...':
      'Результат транскрипции появится здесь, можно отредактировать...',
    'Simpan Catatan': 'Сохранить заметку',
    'Tambah Rekam': 'Добавить запись',
    'Batal': 'Отмена',
    'Menyimpan...': 'Сохранение...',
    'Catatan berhasil disimpan!': 'Заметка успешно сохранена!',
    'Gagal menyimpan': 'Ошибка сохранения',
    'Gagal mengakses mikrofon':
      'Не удалось получить доступ к микрофону',
    'Browser Anda tidak mendukung rekaman suara. Gunakan Chrome, Edge, atau Safari terbaru.':
      'Ваш браузер не поддерживает запись. Используйте последние версии Chrome, Edge или Safari.',
    'Browser Anda tidak mendukung rekaman suara.':
      'Ваш браузер не поддерживает запись.',
    'Browser tidak mendukung rekaman.':
      'Браузер не поддерживает запись.',
    'Hasil akan disisipkan pada posisi kursor':
      'Результат будет вставлен в позицию курсора',
    'Mulai': 'Начать',
    'Sisipkan': 'Вставить',
    'Tutup': 'Закрыть',
    'Siap merekam': 'Готов к записи',
    'Siap disisipkan ke catatan': 'Готово к вставке в заметку',
    'Teks tambahan disisipkan': 'Дополнительный текст вставлен',
    'Rekaman siap diproses': 'Запись готова к обработке',
    'Gagal menghentikan rekaman': 'Не удалось остановить запись',

    'Kembali ke Daftar': 'Назад к списку',
    'Kembali ke Detail': 'Назад к деталям',
    'ID': 'ID',
    'Durasi': 'Длительность',

    'Edit Catatan': 'Редактировать заметку',
    'Ubah judul atau isi catatan Anda.':
      'Измените заголовок или содержание заметки.',
    'Simpan Perubahan': 'Сохранить изменения',
    'Perubahan disimpan': 'Изменения сохранены',
    'Judul tidak boleh kosong.': 'Заголовок не может быть пустым.',
    'Isi tidak boleh kosong.': 'Содержание не может быть пустым.',
    'Judul catatan tidak boleh kosong.':
      'Заголовок заметки не может быть пустым.',

    'Hapus Catatan?': 'Удалить заметку?',
    'akan dihapus permanen dan tidak bisa dikembalikan.':
      'будет удалена навсегда и не может быть восстановлена.',
    'Ya, Hapus': 'Да, удалить',
    'Catatan dihapus': 'Заметка удалена',
    'Gagal menghapus': 'Ошибка удаления',

    'Fitur grouping akan dibangun pada Phase 4.':
      'Функция группировки будет реализована в фазе 4.',
    'Buat Group': 'Создать группу',
    'Akan dibangun pada Phase 4.':
      'Будет реализовано в фазе 4.',
    'Daftar slide publik akan dibangun pada Phase 4.':
      'Список публичных слайдов будет реализован в фазе 4.',

    'Pilih Bahasa': 'Выбрать язык',
    'Cari bahasa...': 'Поиск языка...',
    'Bahasa tidak ditemukan': 'Язык не найден',
    'Bahasa berhasil diubah': 'Язык успешно изменён',
    'Bahasa': 'Язык',

    // --- Narrator & Translate ---
    'Narator': 'Диктор',
    'Putar': 'Воспроизвести',
    'Jeda': 'Пауза',
    'Lanjut': 'Продолжить',
    'Kecepatan': 'Скорость',
    'Asli': 'Оригинал',
    'Tampilkan': 'Показать',
    'Terjemahkan': 'Перевести',
    'Menerjemahkan...': 'Перевод...',
    'Terjemahan selesai': 'Перевод завершён',
    'Terjemahan gagal': 'Ошибка перевода',
    'Narator tidak didukung di browser ini': 'Этот браузер не поддерживает озвучивание',
    'Suara tidak tersedia untuk bahasa ini': 'Голос для этого языка недоступен',
    'Memuat suara...': 'Загрузка голосов...',
    'Kembali ke teks asli': 'Вернуться к оригиналу',
    'Pilih bahasa terjemahan': 'Выберите язык перевода',
    'Bahasa Indonesia (asli)': 'Индонезийский (оригинал)',
    'Versi terjemahan': 'Перевод',
    'Sedang membaca...': 'Чтение...',
    'Berhenti': 'Остановлено',
    'Terjemahan dimuat dari cache': 'Перевод загружен из кэша'
  }
};

let currentLang = 'id';

// Muat bahasa tersimpan
try {
  const saved = localStorage.getItem('crn_lang');
  if (saved && (saved === 'id' || LANGS.some(l => l.code === saved))) {
    currentLang = saved;
  }
} catch (e) {}

// =====================================================
// API publik
// =====================================================

export function t(key, vars) {
  if (!key) return '';
  let result = key;

  if (currentLang !== 'id') {
    const dict = TRANSLATIONS[currentLang] || {};
    const en = TRANSLATIONS.en || {};
    result = dict[key] || en[key] || key;
  }

  if (vars && typeof vars === 'object') {
    result = result.replace(/\{(\w+)\}/g, (m, k) =>
      vars[k] !== undefined ? String(vars[k]) : m
    );
  }
  return result;
}

export function getLang() { return currentLang; }
export function getLangInfo(code) {
  return LANGS.find(l => l.code === code) || LANGS[0];
}

export function setLang(code) {
  if (!LANGS.some(l => l.code === code)) return false;
  if (code === currentLang) return true;

  currentLang = code;
  try { localStorage.setItem('crn_lang', code); } catch (e) {}

  applyI18n();
  document.dispatchEvent(new CustomEvent('lang:change', { detail: { code } }));
  return true;
}

export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
  root.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.setAttribute('title', t(key));
  });
  document.documentElement.setAttribute('lang', currentLang);
}

// =====================================================
// TAMBAHAN PHASE 4A — Group CRUD
// =====================================================
Object.assign(TRANSLATIONS.en, {
  'Group Catatan Saya': 'My Note Groups',
  'Kumpulan catatan Anda.': 'Your notes collection.',
  'Memuat group...': 'Loading groups...',
  'Belum ada group': 'No groups yet',
  'Gabungkan beberapa catatan menjadi satu group.': 'Combine several notes into one group.',
  'Buat Group Pertama': 'Create First Group',
  'Buat Group Baru': 'New Group',
  'Pilih beberapa catatan untuk digabung.': 'Select several notes to combine.',
  'Kembali ke Group': 'Back to Groups',
  'Judul group': 'Group title',
  'Contoh: Dasar-dasar mengemudi': 'Example: Driving basics',
  'Deskripsi (opsional)': 'Description (optional)',
  'Deskripsi singkat group ini...': 'Brief description of this group...',
  'Jadikan publik': 'Make public',
  'Bisa dilihat siapa saja tanpa login': 'Visible to anyone without login',
  'Pilih catatan': 'Select notes',
  'minimal 1': 'at least 1',
  'dipilih': 'selected',
  'Belum ada catatan untuk dipilih': 'No notes to select yet',
  'Buat catatan dulu sebelum membuat group.': 'Create notes first before making a group.',
  'Simpan Group': 'Save Group',
  'Judul group tidak boleh kosong': 'Group title cannot be empty',
  'Pilih minimal 1 catatan': 'Select at least 1 note',
  'Group berhasil disimpan!': 'Group saved!',
  'Group berhasil dihapus': 'Group deleted',
  'Hapus Group?': 'Delete Group?',
  'Hapus Group': 'Delete Group',
  'Daftar Catatan': 'Notes List',
  'Mulai Slide': 'Start Slide',
  'Tanpa judul': 'Untitled',
  'Publik': 'Public',
  'Privat': 'Private',
  'Gagal memuat catatan': 'Failed to load notes'
});

Object.assign(TRANSLATIONS.ms, {
  'Group Catatan Saya': 'Kumpulan Nota Saya',
  'Kumpulan catatan Anda.': 'Koleksi nota anda.',
  'Memuat group...': 'Memuatkan kumpulan...',
  'Belum ada group': 'Belum ada kumpulan',
  'Gabungkan beberapa catatan menjadi satu group.': 'Gabungkan beberapa nota menjadi satu kumpulan.',
  'Buat Group Pertama': 'Buat Kumpulan Pertama',
  'Buat Group Baru': 'Kumpulan Baharu',
  'Pilih beberapa catatan untuk digabung.': 'Pilih beberapa nota untuk digabungkan.',
  'Kembali ke Group': 'Kembali ke Kumpulan',
  'Judul group': 'Tajuk kumpulan',
  'Contoh: Dasar-dasar mengemudi': 'Contoh: Asas-asas memandu',
  'Deskripsi (opsional)': 'Penerangan (pilihan)',
  'Deskripsi singkat group ini...': 'Penerangan ringkas kumpulan ini...',
  'Jadikan publik': 'Jadikan awam',
  'Bisa dilihat siapa saja tanpa login': 'Boleh dilihat sesiapa tanpa log masuk',
  'Pilih catatan': 'Pilih nota',
  'minimal 1': 'sekurang-kurangnya 1',
  'dipilih': 'dipilih',
  'Belum ada catatan untuk dipilih': 'Belum ada nota untuk dipilih',
  'Buat catatan dulu sebelum membuat group.': 'Buat nota dahulu sebelum membuat kumpulan.',
  'Simpan Group': 'Simpan Kumpulan',
  'Judul group tidak boleh kosong': 'Tajuk kumpulan tidak boleh kosong',
  'Pilih minimal 1 catatan': 'Pilih sekurang-kurangnya 1 nota',
  'Group berhasil disimpan!': 'Kumpulan berjaya disimpan!',
  'Group berhasil dihapus': 'Kumpulan berjaya dipadam',
  'Hapus Group?': 'Padam Kumpulan?',
  'Hapus Group': 'Padam Kumpulan',
  'Daftar Catatan': 'Senarai Nota',
  'Mulai Slide': 'Mula Slaid',
  'Tanpa judul': 'Tanpa tajuk',
  'Publik': 'Awam',
  'Privat': 'Peribadi',
  'Gagal memuat catatan': 'Gagal memuatkan nota'
});

Object.assign(TRANSLATIONS.zh, {
  'Group Catatan Saya': '我的笔记分组',
  'Kumpulan catatan Anda.': '您的笔记集合。',
  'Memuat group...': '加载分组中...',
  'Belum ada group': '还没有分组',
  'Gabungkan beberapa catatan menjadi satu group.': '将多个笔记合并为一个分组。',
  'Buat Group Pertama': '创建第一个分组',
  'Buat Group Baru': '新分组',
  'Pilih beberapa catatan untuk digabung.': '选择多个笔记进行合并。',
  'Kembali ke Group': '返回分组',
  'Judul group': '分组标题',
  'Contoh: Dasar-dasar mengemudi': '例如：驾驶基础',
  'Deskripsi (opsional)': '描述（可选）',
  'Deskripsi singkat group ini...': '此分组的简短描述...',
  'Jadikan publik': '设为公开',
  'Bisa dilihat siapa saja tanpa login': '无需登录即可查看',
  'Pilih catatan': '选择笔记',
  'minimal 1': '至少 1 个',
  'dipilih': '已选',
  'Belum ada catatan untuk dipilih': '还没有可选择的笔记',
  'Buat catatan dulu sebelum membuat group.': '请先创建笔记再创建分组。',
  'Simpan Group': '保存分组',
  'Judul group tidak boleh kosong': '分组标题不能为空',
  'Pilih minimal 1 catatan': '请至少选择 1 个笔记',
  'Group berhasil disimpan!': '分组已保存！',
  'Group berhasil dihapus': '分组已删除',
  'Hapus Group?': '删除分组？',
  'Hapus Group': '删除分组',
  'Daftar Catatan': '笔记列表',
  'Mulai Slide': '开始幻灯片',
  'Tanpa judul': '无标题',
  'Publik': '公开',
  'Privat': '私密',
  'Gagal memuat catatan': '加载笔记失败'
});

Object.assign(TRANSLATIONS.ja, {
  'Group Catatan Saya': 'マイノートグループ',
  'Kumpulan catatan Anda.': 'あなたのノートコレクション。',
  'Memuat group...': 'グループを読み込み中...',
  'Belum ada group': 'グループがありません',
  'Gabungkan beberapa catatan menjadi satu group.': '複数のノートを1つのグループにまとめます。',
  'Buat Group Pertama': '最初のグループを作成',
  'Buat Group Baru': '新規グループ',
  'Pilih beberapa catatan untuk digabung.': 'まとめるノートを選択してください。',
  'Kembali ke Group': 'グループに戻る',
  'Judul group': 'グループ名',
  'Contoh: Dasar-dasar mengemudi': '例：運転の基本',
  'Deskripsi (opsional)': '説明（任意）',
  'Deskripsi singkat group ini...': 'このグループの簡単な説明...',
  'Jadikan publik': '公開する',
  'Bisa dilihat siapa saja tanpa login': 'ログインなしで誰でも閲覧可能',
  'Pilih catatan': 'ノートを選択',
  'minimal 1': '最低1つ',
  'dipilih': '選択済み',
  'Belum ada catatan untuk dipilih': '選択できるノートがありません',
  'Buat catatan dulu sebelum membuat group.': 'グループを作成する前にノートを作成してください。',
  'Simpan Group': 'グループを保存',
  'Judul group tidak boleh kosong': 'グループ名を空にできません',
  'Pilih minimal 1 catatan': 'ノートを最低1つ選択してください',
  'Group berhasil disimpan!': 'グループを保存しました！',
  'Group berhasil dihapus': 'グループを削除しました',
  'Hapus Group?': 'グループを削除？',
  'Hapus Group': 'グループを削除',
  'Daftar Catatan': 'ノート一覧',
  'Mulai Slide': 'スライド開始',
  'Tanpa judul': '無題',
  'Publik': '公開',
  'Privat': '非公開',
  'Gagal memuat catatan': 'ノートの読み込みに失敗'
});

Object.assign(TRANSLATIONS.ko, {
  'Group Catatan Saya': '내 노트 그룹',
  'Kumpulan catatan Anda.': '노트 모음.',
  'Memuat group...': '그룹 불러오는 중...',
  'Belum ada group': '아직 그룹이 없습니다',
  'Gabungkan beberapa catatan menjadi satu group.': '여러 노트를 하나의 그룹으로 결합합니다.',
  'Buat Group Pertama': '첫 그룹 만들기',
  'Buat Group Baru': '새 그룹',
  'Pilih beberapa catatan untuk digabung.': '결합할 노트를 선택하세요.',
  'Kembali ke Group': '그룹으로 돌아가기',
  'Judul group': '그룹 제목',
  'Contoh: Dasar-dasar mengemudi': '예: 운전 기초',
  'Deskripsi (opsional)': '설명 (선택)',
  'Deskripsi singkat group ini...': '이 그룹의 간단한 설명...',
  'Jadikan publik': '공개로 설정',
  'Bisa dilihat siapa saja tanpa login': '로그인 없이 누구나 볼 수 있음',
  'Pilih catatan': '노트 선택',
  'minimal 1': '최소 1개',
  'dipilih': '선택됨',
  'Belum ada catatan untuk dipilih': '선택할 노트가 없습니다',
  'Buat catatan dulu sebelum membuat group.': '그룹을 만들기 전에 노트를 먼저 만드세요.',
  'Simpan Group': '그룹 저장',
  'Judul group tidak boleh kosong': '그룹 제목은 비어 있을 수 없습니다',
  'Pilih minimal 1 catatan': '노트를 최소 1개 선택하세요',
  'Group berhasil disimpan!': '그룹이 저장되었습니다!',
  'Group berhasil dihapus': '그룹이 삭제되었습니다',
  'Hapus Group?': '그룹을 삭제하시겠습니까?',
  'Hapus Group': '그룹 삭제',
  'Daftar Catatan': '노트 목록',
  'Mulai Slide': '슬라이드 시작',
  'Tanpa judul': '제목 없음',
  'Publik': '공개',
  'Privat': '비공개',
  'Gagal memuat catatan': '노트 불러오기 실패'
});

Object.assign(TRANSLATIONS.hi, {
  'Group Catatan Saya': 'मेरे नोट समूह',
  'Kumpulan catatan Anda.': 'आपका नोट्स संग्रह।',
  'Memuat group...': 'समूह लोड हो रहे हैं...',
  'Belum ada group': 'अभी तक कोई समूह नहीं',
  'Gabungkan beberapa catatan menjadi satu group.': 'कई नोट्स को एक समूह में मिलाएं।',
  'Buat Group Pertama': 'पहला समूह बनाएं',
  'Buat Group Baru': 'नया समूह',
  'Pilih beberapa catatan untuk digabung.': 'मिलाने के लिए नोट्स चुनें।',
  'Kembali ke Group': 'समूह पर वापस जाएं',
  'Judul group': 'समूह शीर्षक',
  'Contoh: Dasar-dasar mengemudi': 'उदाहरण: ड्राइविंग मूल बातें',
  'Deskripsi (opsional)': 'विवरण (वैकल्पिक)',
  'Deskripsi singkat group ini...': 'इस समूह का संक्षिप्त विवरण...',
  'Jadikan publik': 'सार्वजनिक करें',
  'Bisa dilihat siapa saja tanpa login': 'बिना लॉगिन के कोई भी देख सकता है',
  'Pilih catatan': 'नोट्स चुनें',
  'minimal 1': 'कम से कम 1',
  'dipilih': 'चयनित',
  'Belum ada catatan untuk dipilih': 'चुनने के लिए कोई नोट्स नहीं',
  'Buat catatan dulu sebelum membuat group.': 'समूह बनाने से पहले नोट्स बनाएं।',
  'Simpan Group': 'समूह सहेजें',
  'Judul group tidak boleh kosong': 'समूह शीर्षक खाली नहीं हो सकता',
  'Pilih minimal 1 catatan': 'कम से कम 1 नोट चुनें',
  'Group berhasil disimpan!': 'समूह सहेजा गया!',
  'Group berhasil dihapus': 'समूह हटा दिया गया',
  'Hapus Group?': 'समूह हटाएं?',
  'Hapus Group': 'समूह हटाएं',
  'Daftar Catatan': 'नोट्स सूची',
  'Mulai Slide': 'स्लाइड शुरू करें',
  'Tanpa judul': 'शीर्षकहीन',
  'Publik': 'सार्वजनिक',
  'Privat': 'निजी',
  'Gagal memuat catatan': 'नोट्स लोड करने में विफल'
});

Object.assign(TRANSLATIONS.th, {
  'Group Catatan Saya': 'กลุ่มบันทึกของฉัน',
  'Kumpulan catatan Anda.': 'คอลเลกชันบันทึกของคุณ',
  'Memuat group...': 'กำลังโหลดกลุ่ม...',
  'Belum ada group': 'ยังไม่มีกลุ่ม',
  'Gabungkan beberapa catatan menjadi satu group.': 'รวมหลายบันทึกเป็นกลุ่มเดียว',
  'Buat Group Pertama': 'สร้างกลุ่มแรก',
  'Buat Group Baru': 'กลุ่มใหม่',
  'Pilih beberapa catatan untuk digabung.': 'เลือกบันทึกที่จะรวม',
  'Kembali ke Group': 'กลับไปที่กลุ่ม',
  'Judul group': 'ชื่อกลุ่ม',
  'Contoh: Dasar-dasar mengemudi': 'ตัวอย่าง: พื้นฐานการขับรถ',
  'Deskripsi (opsional)': 'คำอธิบาย (ไม่บังคับ)',
  'Deskripsi singkat group ini...': 'คำอธิบายสั้นๆ ของกลุ่มนี้...',
  'Jadikan publik': 'ทำให้เป็นสาธารณะ',
  'Bisa dilihat siapa saja tanpa login': 'ทุกคนสามารถดูได้โดยไม่ต้องเข้าสู่ระบบ',
  'Pilih catatan': 'เลือกบันทึก',
  'minimal 1': 'อย่างน้อย 1',
  'dipilih': 'เลือกแล้ว',
  'Belum ada catatan untuk dipilih': 'ยังไม่มีบันทึกให้เลือก',
  'Buat catatan dulu sebelum membuat group.': 'สร้างบันทึกก่อนสร้างกลุ่ม',
  'Simpan Group': 'บันทึกกลุ่ม',
  'Judul group tidak boleh kosong': 'ชื่อกลุ่มต้องไม่ว่าง',
  'Pilih minimal 1 catatan': 'เลือกอย่างน้อย 1 บันทึก',
  'Group berhasil disimpan!': 'บันทึกกลุ่มสำเร็จ!',
  'Group berhasil dihapus': 'ลบกลุ่มสำเร็จ',
  'Hapus Group?': 'ลบกลุ่ม?',
  'Hapus Group': 'ลบกลุ่ม',
  'Daftar Catatan': 'รายการบันทึก',
  'Mulai Slide': 'เริ่มสไลด์',
  'Tanpa judul': 'ไม่มีชื่อ',
  'Publik': 'สาธารณะ',
  'Privat': 'ส่วนตัว',
  'Gagal memuat catatan': 'โหลดบันทึกไม่สำเร็จ'
});

Object.assign(TRANSLATIONS.tl, {
  'Group Catatan Saya': 'Aking Mga Grupo',
  'Kumpulan catatan Anda.': 'Koleksyon ng iyong mga tala.',
  'Memuat group...': 'Naglo-load ng mga grupo...',
  'Belum ada group': 'Wala pang grupo',
  'Gabungkan beberapa catatan menjadi satu group.': 'Pagsamahin ang ilang tala sa isang grupo.',
  'Buat Group Pertama': 'Gumawa ng Unang Grupo',
  'Buat Group Baru': 'Bagong Grupo',
  'Pilih beberapa catatan untuk digabung.': 'Pumili ng mga tala na pagsasamahin.',
  'Kembali ke Group': 'Bumalik sa Mga Grupo',
  'Judul group': 'Pamagat ng grupo',
  'Contoh: Dasar-dasar mengemudi': 'Halimbawa: Mga pangunahing pagmamaneho',
  'Deskripsi (opsional)': 'Paglalarawan (opsyonal)',
  'Deskripsi singkat group ini...': 'Maikling paglalarawan ng grupong ito...',
  'Jadikan publik': 'Gawing publiko',
  'Bisa dilihat siapa saja tanpa login': 'Makikita ng kahit sino nang walang login',
  'Pilih catatan': 'Pumili ng mga tala',
  'minimal 1': 'hindi bababa sa 1',
  'dipilih': 'napili',
  'Belum ada catatan untuk dipilih': 'Wala pang tala na mapipili',
  'Buat catatan dulu sebelum membuat group.': 'Gumawa muna ng tala bago gumawa ng grupo.',
  'Simpan Group': 'I-save ang Grupo',
  'Judul group tidak boleh kosong': 'Hindi maaaring walang laman ang pamagat ng grupo',
  'Pilih minimal 1 catatan': 'Pumili ng hindi bababa sa 1 tala',
  'Group berhasil disimpan!': 'Na-save ang grupo!',
  'Group berhasil dihapus': 'Nabura ang grupo',
  'Hapus Group?': 'Burahin ang Grupo?',
  'Hapus Group': 'Burahin ang Grupo',
  'Daftar Catatan': 'Listahan ng mga Tala',
  'Mulai Slide': 'Simulan ang Slide',
  'Tanpa judul': 'Walang pamagat',
  'Publik': 'Publiko',
  'Privat': 'Pribado',
  'Gagal memuat catatan': 'Nabigong i-load ang mga tala'
});

Object.assign(TRANSLATIONS.my, {
  'Group Catatan Saya': 'ကျွန်ုပ်၏ မှတ်စုအုပ်စုများ',
  'Kumpulan catatan Anda.': 'သင်၏ မှတ်စုစုစည်းမှု။',
  'Memuat group...': 'အုပ်စုများ ဖွင့်နေသည်...',
  'Belum ada group': 'အုပ်စုမရှိသေးပါ',
  'Gabungkan beberapa catatan menjadi satu group.': 'မှတ်စုများစွာကို အုပ်စုတစ်ခုအဖြစ် ပေါင်းစပ်ပါ။',
  'Buat Group Pertama': 'ပထမဆုံးအုပ်စုဖန်တီးရန်',
  'Buat Group Baru': 'အုပ်စုအသစ်',
  'Pilih beberapa catatan untuk digabung.': 'ပေါင်းစပ်လိုသော မှတ်စုများကို ရွေးပါ။',
  'Kembali ke Group': 'အုပ်စုများသို့ ပြန်ရန်',
  'Judul group': 'အုပ်စုခေါင်းစဉ်',
  'Contoh: Dasar-dasar mengemudi': 'ဥပမာ - မောင်းနှင်ခြေခံများ',
  'Deskripsi (opsional)': 'ဖော်ပြချက် (ရွေးချယ်နိုင်)',
  'Deskripsi singkat group ini...': 'ဤအုပ်စု၏ အကျဉ်းချုပ်ဖော်ပြချက်...',
  'Jadikan publik': 'အများသူငှာဖြစ်စေရန်',
  'Bisa dilihat siapa saja tanpa login': 'လော့ဂ်အင်မလိုဘဲ မည်သူမဆိုကြည့်နိုင်သည်',
  'Pilih catatan': 'မှတ်စုများရွေးပါ',
  'minimal 1': 'အနည်းဆုံး 1',
  'dipilih': 'ရွေးထားသည်',
  'Belum ada catatan untuk dipilih': 'ရွေးရန် မှတ်စုမရှိသေးပါ',
  'Buat catatan dulu sebelum membuat group.': 'အုပ်စုမဖန်တီးမီ မှတ်စုများ အရင်ဖန်တီးပါ။',
  'Simpan Group': 'အုပ်စုသိမ်းရန်',
  'Judul group tidak boleh kosong': 'အုပ်စုခေါင်းစဉ် အလွတ်မဖြစ်ရပါ',
  'Pilih minimal 1 catatan': 'အနည်းဆုံး မှတ်စု 1 ခု ရွေးပါ',
  'Group berhasil disimpan!': 'အုပ်စု သိမ်းပြီးပါပြီ!',
  'Group berhasil dihapus': 'အုပ်စု ဖျက်ပြီးပါပြီ',
  'Hapus Group?': 'အုပ်စုဖျက်မလား?',
  'Hapus Group': 'အုပ်စုဖျက်ရန်',
  'Daftar Catatan': 'မှတ်စုစာရင်း',
  'Mulai Slide': 'ဆလိုက်စတင်ရန်',
  'Tanpa judul': 'ခေါင်းစဉ်မရှိ',
  'Publik': 'အများသူငှာ',
  'Privat': 'ကိုယ်ပိုင်',
  'Gagal memuat catatan': 'မှတ်စုများ ဖွင့်၍မရပါ'
});

Object.assign(TRANSLATIONS.vi, {
  'Group Catatan Saya': 'Nhóm Ghi chú của tôi',
  'Kumpulan catatan Anda.': 'Bộ sưu tập ghi chú của bạn.',
  'Memuat group...': 'Đang tải nhóm...',
  'Belum ada group': 'Chưa có nhóm',
  'Gabungkan beberapa catatan menjadi satu group.': 'Kết hợp nhiều ghi chú thành một nhóm.',
  'Buat Group Pertama': 'Tạo nhóm đầu tiên',
  'Buat Group Baru': 'Nhóm mới',
  'Pilih beberapa catatan untuk digabung.': 'Chọn các ghi chú để kết hợp.',
  'Kembali ke Group': 'Quay lại nhóm',
  'Judul group': 'Tiêu đề nhóm',
  'Contoh: Dasar-dasar mengemudi': 'Ví dụ: Kiến thức cơ bản về lái xe',
  'Deskripsi (opsional)': 'Mô tả (tùy chọn)',
  'Deskripsi singkat group ini...': 'Mô tả ngắn gọn về nhóm này...',
  'Jadikan publik': 'Đặt thành công khai',
  'Bisa dilihat siapa saja tanpa login': 'Mọi người có thể xem mà không cần đăng nhập',
  'Pilih catatan': 'Chọn ghi chú',
  'minimal 1': 'ít nhất 1',
  'dipilih': 'đã chọn',
  'Belum ada catatan untuk dipilih': 'Chưa có ghi chú nào để chọn',
  'Buat catatan dulu sebelum membuat group.': 'Tạo ghi chú trước khi tạo nhóm.',
  'Simpan Group': 'Lưu nhóm',
  'Judul group tidak boleh kosong': 'Tiêu đề nhóm không được để trống',
  'Pilih minimal 1 catatan': 'Chọn ít nhất 1 ghi chú',
  'Group berhasil disimpan!': 'Đã lưu nhóm!',
  'Group berhasil dihapus': 'Đã xóa nhóm',
  'Hapus Group?': 'Xóa nhóm?',
  'Hapus Group': 'Xóa nhóm',
  'Daftar Catatan': 'Danh sách ghi chú',
  'Mulai Slide': 'Bắt đầu trình chiếu',
  'Tanpa judul': 'Không có tiêu đề',
  'Publik': 'Công khai',
  'Privat': 'Riêng tư',
  'Gagal memuat catatan': 'Không tải được ghi chú'
});

Object.assign(TRANSLATIONS.ru, {
  'Group Catatan Saya': 'Мои группы заметок',
  'Kumpulan catatan Anda.': 'Ваша коллекция заметок.',
  'Memuat group...': 'Загрузка групп...',
  'Belum ada group': 'Групп пока нет',
  'Gabungkan beberapa catatan menjadi satu group.': 'Объедините несколько заметок в одну группу.',
  'Buat Group Pertama': 'Создать первую группу',
  'Buat Group Baru': 'Новая группа',
  'Pilih beberapa catatan untuk digabung.': 'Выберите заметки для объединения.',
  'Kembali ke Group': 'Назад к группам',
  'Judul group': 'Название группы',
  'Contoh: Dasar-dasar mengemudi': 'Пример: Основы вождения',
  'Deskripsi (opsional)': 'Описание (необязательно)',
  'Deskripsi singkat group ini...': 'Краткое описание этой группы...',
  'Jadikan publik': 'Сделать публичной',
  'Bisa dilihat siapa saja tanpa login': 'Доступно всем без входа',
  'Pilih catatan': 'Выбрать заметки',
  'minimal 1': 'минимум 1',
  'dipilih': 'выбрано',
  'Belum ada catatan untuk dipilih': 'Пока нет заметок для выбора',
  'Buat catatan dulu sebelum membuat group.': 'Сначала создайте заметки.',
  'Simpan Group': 'Сохранить группу',
  'Judul group tidak boleh kosong': 'Название группы не может быть пустым',
  'Pilih minimal 1 catatan': 'Выберите минимум 1 заметку',
  'Group berhasil disimpan!': 'Группа сохранена!',
  'Group berhasil dihapus': 'Группа удалена',
  'Hapus Group?': 'Удалить группу?',
  'Hapus Group': 'Удалить группу',
  'Daftar Catatan': 'Список заметок',
  'Mulai Slide': 'Запустить слайд',
  'Tanpa judul': 'Без названия',
  'Publik': 'Публичный',
  'Privat': 'Приватный',
  'Gagal memuat catatan': 'Не удалось загрузить заметки'
});

// =====================================================
// TAMBAHAN PHASE 4B — Slide Show Publik
// =====================================================
Object.assign(TRANSLATIONS.en, {
  'Slide Publik': 'Public Slides',
  'Slide publik dari group yang dibagikan.': 'Public slides from shared groups.',
  'Memuat slide...': 'Loading slides...',
  'Belum ada slide publik': 'No public slides yet',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'Public slides will appear here once their creators mark groups as public.',
  'Sebelumnya': 'Previous',
  'Berikutnya': 'Next',
  'Auto': 'Auto',
  'Kembali ke Slide': 'Back to Slides',
  'Layar penuh': 'Fullscreen',
  'navigasi': 'navigation'
});

Object.assign(TRANSLATIONS.ms, {
  'Slide Publik': 'Slaid Awam',
  'Slide publik dari group yang dibagikan.': 'Slaid awam daripada kumpulan yang dikongsi.',
  'Memuat slide...': 'Memuatkan slaid...',
  'Belum ada slide publik': 'Belum ada slaid awam',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'Slaid awam akan muncul di sini selepas pembuatnya menandakan kumpulan sebagai awam.',
  'Sebelumnya': 'Sebelumnya',
  'Berikutnya': 'Seterusnya',
  'Auto': 'Auto',
  'Kembali ke Slide': 'Kembali ke Slaid',
  'Layar penuh': 'Skrin penuh',
  'navigasi': 'navigasi'
});

Object.assign(TRANSLATIONS.zh, {
  'Slide Publik': '公开幻灯片',
  'Slide publik dari group yang dibagikan.': '来自共享分组的公开幻灯片。',
  'Memuat slide...': '加载幻灯片中...',
  'Belum ada slide publik': '还没有公开幻灯片',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    '创建者将分组标记为公开后，幻灯片将显示在此处。',
  'Sebelumnya': '上一张',
  'Berikutnya': '下一张',
  'Auto': '自动',
  'Kembali ke Slide': '返回幻灯片',
  'Layar penuh': '全屏',
  'navigasi': '导航'
});

Object.assign(TRANSLATIONS.ja, {
  'Slide Publik': '公開スライド',
  'Slide publik dari group yang dibagikan.': '共有グループの公開スライド。',
  'Memuat slide...': 'スライドを読み込み中...',
  'Belum ada slide publik': '公開スライドはまだありません',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    '作成者がグループを公開に設定すると、スライドがここに表示されます。',
  'Sebelumnya': '前へ',
  'Berikutnya': '次へ',
  'Auto': '自動',
  'Kembali ke Slide': 'スライドに戻る',
  'Layar penuh': '全画面',
  'navigasi': 'ナビ'
});

Object.assign(TRANSLATIONS.ko, {
  'Slide Publik': '공개 슬라이드',
  'Slide publik dari group yang dibagikan.': '공유된 그룹의 공개 슬라이드입니다.',
  'Memuat slide...': '슬라이드 불러오는 중...',
  'Belum ada slide publik': '아직 공개 슬라이드가 없습니다',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    '작성자가 그룹을 공개로 표시하면 슬라이드가 여기에 표시됩니다.',
  'Sebelumnya': '이전',
  'Berikutnya': '다음',
  'Auto': '자동',
  'Kembali ke Slide': '슬라이드로 돌아가기',
  'Layar penuh': '전체 화면',
  'navigasi': '탐색'
});

Object.assign(TRANSLATIONS.hi, {
  'Slide Publik': 'सार्वजनिक स्लाइड',
  'Slide publik dari group yang dibagikan.': 'साझा किए गए समूहों की सार्वजनिक स्लाइड।',
  'Memuat slide...': 'स्लाइड लोड हो रही हैं...',
  'Belum ada slide publik': 'अभी कोई सार्वजनिक स्लाइड नहीं',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'निर्माता द्वारा समूह को सार्वजनिक के रूप में चिह्नित करने पर स्लाइड यहाँ दिखाई देंगी।',
  'Sebelumnya': 'पिछला',
  'Berikutnya': 'अगला',
  'Auto': 'ऑटो',
  'Kembali ke Slide': 'स्लाइड पर वापस जाएं',
  'Layar penuh': 'पूर्ण स्क्रीन',
  'navigasi': 'नेविगेशन'
});

Object.assign(TRANSLATIONS.th, {
  'Slide Publik': 'สไลด์สาธารณะ',
  'Slide publik dari group yang dibagikan.': 'สไลด์สาธารณะจากกลุ่มที่แชร์',
  'Memuat slide...': 'กำลังโหลดสไลด์...',
  'Belum ada slide publik': 'ยังไม่มีสไลด์สาธารณะ',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'สไลด์สาธารณะจะปรากฏที่นี่หลังจากผู้สร้างทำเครื่องหมายกลุ่มเป็นสาธารณะ',
  'Sebelumnya': 'ก่อนหน้า',
  'Berikutnya': 'ถัดไป',
  'Auto': 'อัตโนมัติ',
  'Kembali ke Slide': 'กลับไปที่สไลด์',
  'Layar penuh': 'เต็มหน้าจอ',
  'navigasi': 'นำทาง'
});

Object.assign(TRANSLATIONS.tl, {
  'Slide Publik': 'Pampublikong Slide',
  'Slide publik dari group yang dibagikan.': 'Mga pampublikong slide mula sa mga ibinahaging grupo.',
  'Memuat slide...': 'Naglo-load ng slide...',
  'Belum ada slide publik': 'Wala pang pampublikong slide',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'Lalabas ang mga pampublikong slide dito kapag minarkahan ng lumikha ang grupo bilang publiko.',
  'Sebelumnya': 'Nakaraan',
  'Berikutnya': 'Susunod',
  'Auto': 'Auto',
  'Kembali ke Slide': 'Bumalik sa Slide',
  'Layar penuh': 'Buong screen',
  'navigasi': 'navigasyon'
});

Object.assign(TRANSLATIONS.my, {
  'Slide Publik': 'အများသူငှာ ဆလိုက်များ',
  'Slide publik dari group yang dibagikan.': 'မျှဝေထားသော အုပ်စုများမှ အများသူငှာဆလိုက်များ။',
  'Memuat slide...': 'ဆလိုက်များ ဖွင့်နေသည်...',
  'Belum ada slide publik': 'အများသူငှာ ဆလိုက်မရှိသေးပါ',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'ဖန်တီးသူမှ အုပ်စုကို အများသူငှာအဖြစ် သတ်မှတ်ပြီးနောက် ဆလိုက်များ ဤနေရာတွင် ပေါ်လာမည်။',
  'Sebelumnya': 'ယခင်',
  'Berikutnya': 'နောက်တစ်ခု',
  'Auto': 'အလိုအလျောက်',
  'Kembali ke Slide': 'ဆလိုက်သို့ ပြန်ရန်',
  'Layar penuh': 'မျက်နှာပြင်အပြည့်',
  'navigasi': 'လမ်းညွှန်'
});

Object.assign(TRANSLATIONS.vi, {
  'Slide Publik': 'Trình chiếu công khai',
  'Slide publik dari group yang dibagikan.': 'Trình chiếu công khai từ các nhóm được chia sẻ.',
  'Memuat slide...': 'Đang tải trình chiếu...',
  'Belum ada slide publik': 'Chưa có trình chiếu công khai',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'Trình chiếu công khai sẽ xuất hiện ở đây sau khi người tạo đánh dấu nhóm là công khai.',
  'Sebelumnya': 'Trước',
  'Berikutnya': 'Tiếp theo',
  'Auto': 'Tự động',
  'Kembali ke Slide': 'Quay lại trình chiếu',
  'Layar penuh': 'Toàn màn hình',
  'navigasi': 'điều hướng'
});

Object.assign(TRANSLATIONS.ru, {
  'Slide Publik': 'Публичные слайды',
  'Slide publik dari group yang dibagikan.': 'Публичные слайды из общих групп.',
  'Memuat slide...': 'Загрузка слайдов...',
  'Belum ada slide publik': 'Публичных слайдов пока нет',
  'Slide publik akan muncul di sini setelah pembuatnya menandai group sebagai publik.':
    'Публичные слайды появятся здесь, как только их создатели отметят группы как публичные.',
  'Sebelumnya': 'Назад',
  'Berikutnya': 'Вперёд',
  'Auto': 'Авто',
  'Kembali ke Slide': 'Назад к слайдам',
  'Layar penuh': 'Полный экран',
  'navigasi': 'навигация'
});

// =====================================================
// TAMBAHAN PHASE 4B+ — Translate Group & Anaknya
// =====================================================
Object.assign(TRANSLATIONS.en, {
  'Terjemahkan Semua': 'Translate All',
  'Pilih bahasa dulu': 'Choose language first',
  'Semua terjemahan siap': 'All translations ready',
  'Sudah diterjemahkan': 'Already translated',
  'Belum diterjemahkan': 'Not translated yet',
  'Terjemahkan semua?': 'Translate everything?',
  'Proses ini akan memakan waktu beberapa saat.': 'This will take a little while.',
  'Ya, Terjemahkan': 'Yes, Translate',
  'catatan berhasil diterjemahkan': 'notes translated',
  'Membatalkan...': 'Cancelling...',
  'berhasil': 'succeeded',
  'gagal': 'failed'
});

Object.assign(TRANSLATIONS.ms, {
  'Terjemahkan Semua': 'Terjemah Semua',
  'Pilih bahasa dulu': 'Pilih bahasa dahulu',
  'Semua terjemahan siap': 'Semua terjemahan sedia',
  'Sudah diterjemahkan': 'Sudah diterjemah',
  'Belum diterjemahkan': 'Belum diterjemah',
  'Terjemahkan semua?': 'Terjemah semua?',
  'Proses ini akan memakan waktu beberapa saat.': 'Proses ini akan mengambil masa sebentar.',
  'Ya, Terjemahkan': 'Ya, Terjemah',
  'catatan berhasil diterjemahkan': 'nota berjaya diterjemah',
  'Membatalkan...': 'Membatalkan...',
  'berhasil': 'berjaya',
  'gagal': 'gagal'
});

Object.assign(TRANSLATIONS.zh, {
  'Terjemahkan Semua': '全部翻译',
  'Pilih bahasa dulu': '请先选择语言',
  'Semua terjemahan siap': '所有翻译已就绪',
  'Sudah diterjemahkan': '已翻译',
  'Belum diterjemahkan': '尚未翻译',
  'Terjemahkan semua?': '全部翻译？',
  'Proses ini akan memakan waktu beberapa saat.': '此过程需要一些时间。',
  'Ya, Terjemahkan': '是的，翻译',
  'catatan berhasil diterjemahkan': '条笔记已翻译',
  'Membatalkan...': '正在取消...',
  'berhasil': '成功',
  'gagal': '失败'
});

Object.assign(TRANSLATIONS.ja, {
  'Terjemahkan Semua': 'すべて翻訳',
  'Pilih bahasa dulu': '先に言語を選択',
  'Semua terjemahan siap': 'すべての翻訳準備完了',
  'Sudah diterjemahkan': '翻訳済み',
  'Belum diterjemahkan': '未翻訳',
  'Terjemahkan semua?': 'すべて翻訳しますか？',
  'Proses ini akan memakan waktu beberapa saat.': 'この処理には少し時間がかかります。',
  'Ya, Terjemahkan': 'はい、翻訳',
  'catatan berhasil diterjemahkan': '件のノートを翻訳しました',
  'Membatalkan...': 'キャンセル中...',
  'berhasil': '成功',
  'gagal': '失敗'
});

Object.assign(TRANSLATIONS.ko, {
  'Terjemahkan Semua': '모두 번역',
  'Pilih bahasa dulu': '먼저 언어 선택',
  'Semua terjemahan siap': '모든 번역 준비 완료',
  'Sudah diterjemahkan': '번역됨',
  'Belum diterjemahkan': '번역되지 않음',
  'Terjemahkan semua?': '모두 번역하시겠습니까?',
  'Proses ini akan memakan waktu beberapa saat.': '이 작업은 시간이 걸립니다.',
  'Ya, Terjemahkan': '예, 번역',
  'catatan berhasil diterjemahkan': '개 노트 번역 완료',
  'Membatalkan...': '취소 중...',
  'berhasil': '성공',
  'gagal': '실패'
});

Object.assign(TRANSLATIONS.hi, {
  'Terjemahkan Semua': 'सभी का अनुवाद करें',
  'Pilih bahasa dulu': 'पहले भाषा चुनें',
  'Semua terjemahan siap': 'सभी अनुवाद तैयार',
  'Sudah diterjemahkan': 'पहले से अनुवादित',
  'Belum diterjemahkan': 'अभी तक अनुवादित नहीं',
  'Terjemahkan semua?': 'सब कुछ अनुवाद करें?',
  'Proses ini akan memakan waktu beberapa saat.': 'इसमें थोड़ा समय लगेगा।',
  'Ya, Terjemahkan': 'हाँ, अनुवाद करें',
  'catatan berhasil diterjemahkan': 'नोट्स का अनुवाद हुआ',
  'Membatalkan...': 'रद्द किया जा रहा है...',
  'berhasil': 'सफल',
  'gagal': 'विफल'
});

Object.assign(TRANSLATIONS.th, {
  'Terjemahkan Semua': 'แปลทั้งหมด',
  'Pilih bahasa dulu': 'เลือกภาษาก่อน',
  'Semua terjemahan siap': 'การแปลทั้งหมดพร้อมแล้ว',
  'Sudah diterjemahkan': 'แปลแล้ว',
  'Belum diterjemahkan': 'ยังไม่ได้แปล',
  'Terjemahkan semua?': 'แปลทั้งหมดหรือไม่?',
  'Proses ini akan memakan waktu beberapa saat.': 'กระบวนการนี้จะใช้เวลาสักครู่',
  'Ya, Terjemahkan': 'ใช่ แปลเลย',
  'catatan berhasil diterjemahkan': 'บันทึกแปลแล้ว',
  'Membatalkan...': 'กำลังยกเลิก...',
  'berhasil': 'สำเร็จ',
  'gagal': 'ล้มเหลว'
});

Object.assign(TRANSLATIONS.tl, {
  'Terjemahkan Semua': 'Isalin Lahat',
  'Pilih bahasa dulu': 'Pumili muna ng wika',
  'Semua terjemahan siap': 'Handa na lahat ng salin',
  'Sudah diterjemahkan': 'Naisalin na',
  'Belum diterjemahkan': 'Hindi pa naisalin',
  'Terjemahkan semua?': 'Isalin lahat?',
  'Proses ini akan memakan waktu beberapa sandali.': 'Aabutin ito ng ilang sandali.',
  'Ya, Terjemahkan': 'Oo, Isalin',
  'catatan berhasil diterjemahkan': 'mga tala naisalin',
  'Membatalkan...': 'Kinakansela...',
  'berhasil': 'nagtagumpay',
  'gagal': 'nabigo'
});

Object.assign(TRANSLATIONS.my, {
  'Terjemahkan Semua': 'အားလုံးဘာသာပြန်ရန်',
  'Pilih bahasa dulu': 'ဘာသာစကားအရင်ရွေးပါ',
  'Semua terjemahan siap': 'ဘာသာပြန်အားလုံး အဆင်သင့်',
  'Sudah diterjemahkan': 'ဘာသာပြန်ပြီး',
  'Belum diterjemahkan': 'ဘာသာမပြန်ရသေး',
  'Terjemahkan semua?': 'အားလုံးဘာသာပြန်မလား?',
  'Proses ini akan memakan waktu beberapa saat.': 'ဤလုပ်ငန်းစဉ်သည် အချိန်အနည်းငယ်ယူပါမည်။',
  'Ya, Terjemahkan': 'ဟုတ်ကဲ့၊ ဘာသာပြန်ပါ',
  'catatan berhasil diterjemahkan': 'မှတ်စုများ ဘာသာပြန်ပြီးပါပြီ',
  'Membatalkan...': 'ပယ်ဖျက်နေသည်...',
  'berhasil': 'အောင်မြင်သည်',
  'gagal': 'မအောင်မြင်ပါ'
});

Object.assign(TRANSLATIONS.vi, {
  'Terjemahkan Semua': 'Dịch tất cả',
  'Pilih bahasa dulu': 'Chọn ngôn ngữ trước',
  'Semua terjemahan siap': 'Tất cả bản dịch đã sẵn sàng',
  'Sudah diterjemahkan': 'Đã dịch',
  'Belum diterjemahkan': 'Chưa dịch',
  'Terjemahkan semua?': 'Dịch tất cả?',
  'Proses ini akan memakan waktu beberapa saat.': 'Quá trình này sẽ mất một lúc.',
  'Ya, Terjemahkan': 'Có, dịch',
  'catatan berhasil diterjemahkan': 'ghi chú đã dịch',
  'Membatalkan...': 'Đang hủy...',
  'berhasil': 'thành công',
  'gagal': 'thất bại'
});

Object.assign(TRANSLATIONS.ru, {
  'Terjemahkan Semua': 'Перевести всё',
  'Pilih bahasa dulu': 'Сначала выберите язык',
  'Semua terjemahan siap': 'Все переводы готовы',
  'Sudah diterjemahkan': 'Уже переведено',
  'Belum diterjemahkan': 'Ещё не переведено',
  'Terjemahkan semua?': 'Перевести всё?',
  'Proses ini akan memakan waktu beberapa saat.': 'Это займёт некоторое время.',
  'Ya, Terjemahkan': 'Да, перевести',
  'catatan berhasil diterjemahkan': 'заметок переведено',
  'Membatalkan...': 'Отмена...',
  'berhasil': 'успешно',
  'gagal': 'ошибок'
});

// =====================================================
// TAMBAHAN — Retry 429 & Progress
// =====================================================
Object.assign(TRANSLATIONS.en, {
  'Rate limit, mencoba lagi': 'Rate limit, retrying',
  'Terlalu banyak permintaan': 'Too many requests'
});
Object.assign(TRANSLATIONS.ms, {
  'Rate limit, mencoba lagi': 'Had kadar, cuba lagi',
  'Terlalu banyak permintaan': 'Terlalu banyak permintaan'
});
Object.assign(TRANSLATIONS.zh, {
  'Rate limit, mencoba lagi': '速率限制，正在重试',
  'Terlalu banyak permintaan': '请求过多'
});
Object.assign(TRANSLATIONS.ja, {
  'Rate limit, mencoba lagi': 'レート制限、再試行中',
  'Terlalu banyak permintaan': 'リクエストが多すぎます'
});
Object.assign(TRANSLATIONS.ko, {
  'Rate limit, mencoba lagi': '속도 제한, 재시도 중',
  'Terlalu banyak permintaan': '요청이 너무 많습니다'
});
Object.assign(TRANSLATIONS.hi, {
  'Rate limit, mencoba lagi': 'दर सीमा, पुनः प्रयास',
  'Terlalu banyak permintaan': 'बहुत अधिक अनुरोध'
});
Object.assign(TRANSLATIONS.th, {
  'Rate limit, mencoba lagi': 'จำกัดอัตรา กำลังลองใหม่',
  'Terlalu banyak permintaan': 'คำขอมากเกินไป'
});
Object.assign(TRANSLATIONS.tl, {
  'Rate limit, mencoba lagi': 'Rate limit, sinusubukan muli',
  'Terlalu banyak permintaan': 'Masyadong maraming kahilingan'
});
Object.assign(TRANSLATIONS.my, {
  'Rate limit, mencoba lagi': 'နှုန်းကန့်သတ်၊ ထပ်စမ်းနေသည်',
  'Terlalu banyak permintaan': 'တောင်းဆိုမှု များလွန်းသည်'
});
Object.assign(TRANSLATIONS.vi, {
  'Rate limit, mencoba lagi': 'Giới hạn tốc độ, đang thử lại',
  'Terlalu banyak permintaan': 'Quá nhiều yêu cầu'
});
Object.assign(TRANSLATIONS.ru, {
  'Rate limit, mencoba lagi': 'Лимит скорости, повтор',
  'Terlalu banyak permintaan': 'Слишком много запросов'
});

// =====================================================
// TAMBAHAN — Jeda Tanda Baca (Punctuation Pause)
// =====================================================
Object.assign(TRANSLATIONS.en, {
  'Jeda Tanda Baca': 'Punctuation Pause',
  'Tanpa jeda tambahan': 'No extra pause',
  'Jeda pendek': 'Short pause',
  'Jeda normal': 'Normal pause',
  'Jeda panjang': 'Long pause'
});
Object.assign(TRANSLATIONS.ms, {
  'Jeda Tanda Baca': 'Jeda Tanda Baca',
  'Tanpa jeda tambahan': 'Tanpa jeda tambahan',
  'Jeda pendek': 'Jeda pendek',
  'Jeda normal': 'Jeda biasa',
  'Jeda panjang': 'Jeda panjang'
});
Object.assign(TRANSLATIONS.zh, {
  'Jeda Tanda Baca': '标点停顿',
  'Tanpa jeda tambahan': '无额外停顿',
  'Jeda pendek': '短暂停顿',
  'Jeda normal': '正常停顿',
  'Jeda panjang': '长停顿'
});
Object.assign(TRANSLATIONS.ja, {
  'Jeda Tanda Baca': '句読点の間',
  'Tanpa jeda tambahan': '追加の間なし',
  'Jeda pendek': '短い間',
  'Jeda normal': '普通の間',
  'Jeda panjang': '長い間'
});
Object.assign(TRANSLATIONS.ko, {
  'Jeda Tanda Baca': '문장 부호 간격',
  'Tanpa jeda tambahan': '추가 간격 없음',
  'Jeda pendek': '짧은 간격',
  'Jeda normal': '보통 간격',
  'Jeda panjang': '긴 간격'
});
Object.assign(TRANSLATIONS.hi, {
  'Jeda Tanda Baca': 'विराम चिह्न रुकावट',
  'Tanpa jeda tambahan': 'कोई अतिरिक्त रुकावट नहीं',
  'Jeda pendek': 'छोटी रुकावट',
  'Jeda normal': 'सामान्य रुकावट',
  'Jeda panjang': 'लंबी रुकावट'
});
Object.assign(TRANSLATIONS.th, {
  'Jeda Tanda Baca': 'หยุดตามเครื่องหมาย',
  'Tanpa jeda tambahan': 'ไม่หยุดเพิ่ม',
  'Jeda pendek': 'หยุดสั้น',
  'Jeda normal': 'หยุดปกติ',
  'Jeda panjang': 'หยุดยาว'
});
Object.assign(TRANSLATIONS.tl, {
  'Jeda Tanda Baca': 'Pahinga ng Bantas',
  'Tanpa jeda tambahan': 'Walang karagdagang pahinga',
  'Jeda pendek': 'Maikling pahinga',
  'Jeda normal': 'Normal na pahinga',
  'Jeda panjang': 'Mahabang pahinga'
});
Object.assign(TRANSLATIONS.my, {
  'Jeda Tanda Baca': 'သင်္ကေတအနားယူ',
  'Tanpa jeda tambahan': 'အပိုအနားမယူပါ',
  'Jeda pendek': 'အနားတို',
  'Jeda normal': 'အနားပုံမှန်',
  'Jeda panjang': 'အနားရှည်'
});
Object.assign(TRANSLATIONS.vi, {
  'Jeda Tanda Baca': 'Ngắt dấu câu',
  'Tanpa jeda tambahan': 'Không ngắt thêm',
  'Jeda pendek': 'Ngắt ngắn',
  'Jeda normal': 'Ngắt bình thường',
  'Jeda panjang': 'Ngắt dài'
});
Object.assign(TRANSLATIONS.ru, {
  'Jeda Tanda Baca': 'Пауза на пунктуацию',
  'Tanpa jeda tambahan': 'Без дополнительной паузы',
  'Jeda pendek': 'Короткая пауза',
  'Jeda normal': 'Обычная пауза',
  'Jeda panjang': 'Длинная пауза'
});