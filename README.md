Membangun Chat Real-Time Sederhana dengan WebSocket: Eksperimen Komunikasi Dua Arah di Browser

Pendahuluan
Dalam penggunaan aplikasi web yang kontemporer, terdapat berbagai fitur yang memerlukan pertukaran data dengan cepat dan dalam waktu nyata. Contohnya termasuk aplikasi percakapan, notifikasi instan, permainan daring, dasbor pemantauan, hingga sistem kolaborasi seperti dokumen yang dapat diedit secara kolektif. Dalam jenis aplikasi ini, pengguna menginginkan data muncul secara langsung tanpa perlu menyegarkan halaman.

Dalam komunikasi web konvensional, browser biasanya mengajukan permohonan kepada server melalui HTTP, kemudian server memberikan jawaban. Model ini sesuai untuk banyak keperluan, namun tidak optimal untuk aplikasi waktu nyata karena server tidak bisa langsung mengirim data baru ke browser kecuali browser mengajukan permohonan terlebih dahulu.

Salah satu solusi yang dapat digunakan untuk menyelesaikan masalah tersebut adalah WebSocket. WebSocket memungkinkan komunikasi yang berlaku dua arah antara klien dan server melalui satu saluran yang tetap terbuka. Dalam tulisan ini, saya melakukan percobaan sederhana dengan menciptakan aplikasi chat waktu nyata menggunakan WebSocket, Node. js, dan browser.

Apa Itu WebSocket?
WebSocket merupakan sebuah protokol komunikasi yang mendukung interaksi dua arah antara klien dan server. Tidak seperti HTTP yang umum yang mengikuti pola permintaan-respons, WebSocket memungkinkan klien dan server untuk saling bertukar informasi kapan saja selama sambungan belum ditutup.

Pada HTTP klasik, browser perlu mengirimkan permintaan terlebih dahulu agar server dapat memberikan respons. Contohnya, saat pengguna membuka situs web, browser mengajukan permintaan kepada server, dan kemudian server mengirimkan konten halaman tersebut. Setelah proses ini, koneksi biasanya akan berakhir.

Sementara itu, dengan WebSocket, hubungan antara browser dan server tetap terhubung. Dalam pengaturan ini, server dapat secara langsung mengirimkan informasi ke browser tanpa perlu menunggu permintaan baru dari browser. Inilah sebabnya mengapa WebSocket ideal untuk fitur yang memerlukan pembaruan secara langsung.

Perbedaan WebSocket dan HTTP Tradisional
Perbedaan utama antara HTTP dan WebSocket terletak pada metode komunikasi yang digunakan. Dalam HTTP konvensional, proses komunikasi hanya bergerak satu arah pada satu waktu. Klien mengirimkan permintaan, kemudian server memberikan balasan. Setelah proses ini selesai, koneksi bisa diakhiri. Agar klien memperoleh informasi terbaru, mereka harus melakukan permintaan kembali, misalnya dengan menyegarkan halaman atau melakukan polling secara berkala.

Sementara itu, pada WebSocket, komunikasi berlangsung dua arah. Setelah koneksi terjalin, klien dan server dapat bertukar pesan kapan saja. Koneksi tidak segera ditutup setelah satu pesan dikirimkan. Ini menjadikan pertukaran data lebih efisien untuk aplikasi yang memerlukan pembaruan secara real-time.

Contoh penggunaan WebSocket antara lain:

Aplikasi chat real-time.
Notifikasi langsung.
Game multiplayer online.
Live score pertandingan.
Dashboard monitoring server.
Aplikasi kolaborasi dokumen.
Tujuan Eksperimen
Eksperimen ini bertujuan untuk memahami cara kerja WebSocket melalui implementasi sederhana. Saya membuat aplikasi chat yang dapat digunakan oleh dua tab browser. Ketika satu tab mengirim pesan, tab lain akan langsung menerima pesan tersebut tanpa perlu melakukan refresh halaman.

Eksperimen ini menggunakan:

Node.js sebagai runtime server.
Library ws untuk membuat server WebSocket.
HTML, CSS, dan JavaScript untuk membuat tampilan client di browser.
Persiapan Eksperimen
Langkah pertama adalah membuat folder proyek bernama websocket-chat-uts. Di dalam folder tersebut, saya membuat dua file utama, yaitu server.js dan index.html.

File server.js digunakan sebagai server WebSocket. Server ini bertugas menerima koneksi dari client, menerima pesan yang dikirim client, lalu meneruskan pesan tersebut ke semua client yang sedang terhubung.

File index.html digunakan sebagai tampilan aplikasi chat di browser. Di dalam file ini terdapat input pesan, tombol kirim, dan area untuk menampilkan pesan yang diterima.

Sebelum menulis kode server, saya menjalankan perintah berikut untuk membuat proyek Node.js dan menginstal library ws:

npm init -y
npm install ws
Implementasi Server WebSocket
Kode server yang saya gunakan adalah sebagai berikut:

const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

console.log("Server WebSocket berjalan di ws://localhost:8080");

server.on("connection", (socket) => {
  console.log("Client baru terhubung");

  socket.on("message", (message) => {
    console.log("Pesan diterima:", message.toString());

    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("Client terputus");
  });
});
Pada kode tersebut, server WebSocket dijalankan pada port 8080. Ketika ada client yang terhubung, server akan menjalankan event connection. Setelah itu, server mendengarkan event message untuk menerima pesan dari client.

Bagian yang paling penting adalah kode berikut:

server.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(message.toString());
  }
});
Kode tersebut digunakan untuk mengirim pesan ke semua client yang sedang aktif. Dengan cara ini, pesan yang dikirim oleh satu pengguna dapat langsung diterima oleh pengguna lain.

Implementasi Client di Browser
Untuk sisi client, saya membuat file index.html yang berisi tampilan sederhana aplikasi chat. Client terhubung ke server menggunakan kode berikut:

const socket = new WebSocket("ws://localhost:8080");
Kode tersebut membuat koneksi WebSocket dari browser ke server yang berjalan di alamat ws://localhost:8080.

Untuk mengirim pesan, saya menggunakan fungsi berikut:

socket.onmessage = (event) => {
  addMessage(event.data);
};
Ketika server mengirim pesan, browser akan menjalankan fungsi addMessage() untuk menampilkan pesan tersebut ke dalam kotak chat.

Hasil Eksperimen
Setelah server dijalankan dengan perintah:

node server.js
terminal menampilkan pesan bahwa server WebSocket berjalan di ws://localhost:8080.

Kemudian saya membuka file index.html di dua tab browser. Tab pertama saya gunakan sebagai pengguna pertama, sedangkan tab kedua saya gunakan sebagai pengguna kedua. Ketika saya mengirim pesan dari tab pertama, pesan tersebut langsung muncul di tab kedua. Begitu juga sebaliknya, pesan dari tab kedua langsung muncul di tab pertama.

Dari hasil percobaan ini, terlihat bahwa WebSocket memungkinkan komunikasi real-time tanpa perlu melakukan refresh halaman. Pesan dapat dikirim dan diterima secara langsung selama koneksi WebSocket masih aktif.

Analisis Eksperimen
Berdasarkan eksperimen yang dilakukan, WebSocket memiliki beberapa kelebihan. Pertama, komunikasi dapat dilakukan secara real-time. Server tidak perlu menunggu request HTTP baru dari client untuk mengirimkan data. Kedua, koneksi yang tetap terbuka membuat proses pertukaran data menjadi lebih efisien untuk aplikasi yang sering mengirim dan menerima pesan kecil.

Namun, WebSocket juga memiliki beberapa hal yang perlu diperhatikan. Karena koneksi tetap terbuka, server harus mampu mengelola banyak koneksi client secara bersamaan. Pada aplikasi berskala besar, pengelolaan koneksi ini perlu dirancang dengan baik agar tidak membebani server.

Selain itu, aspek keamanan juga penting. Pada aplikasi nyata, WebSocket sebaiknya menggunakan koneksi aman dengan protokol wss://, bukan hanya ws://. Pengembang juga perlu melakukan validasi pesan, autentikasi pengguna, dan pembatasan akses agar server tidak disalahgunakan.

Eksperimen sederhana ini belum menggunakan database, autentikasi, atau fitur penyimpanan riwayat chat. Jadi, ketika halaman ditutup, pesan yang sudah dikirim tidak disimpan. Namun, eksperimen ini sudah cukup untuk menunjukkan konsep dasar komunikasi real-time menggunakan WebSocket.

Kelebihan WebSocket
Dari eksperimen ini, beberapa kelebihan WebSocket yang dapat diamati adalah:

Pesan dapat dikirim dan diterima secara langsung.
Browser tidak perlu melakukan refresh halaman.
Cocok untuk aplikasi real-time seperti chat dan notifikasi.
Komunikasi berjalan dua arah antara client dan server.
Lebih efisien dibanding polling untuk kasus tertentu.
Kekurangan WebSocket
Walaupun berguna, WebSocket juga memiliki beberapa kekurangan:

Server harus menjaga koneksi tetap terbuka.
Pengelolaan banyak client lebih kompleks.
Perlu perhatian khusus pada keamanan.
Implementasi pada aplikasi besar membutuhkan desain arsitektur yang lebih matang.
Tidak semua kebutuhan web harus menggunakan WebSocket; untuk halaman biasa, HTTP tetap lebih sederhana.
Kesimpulan
WebSocket adalah teknologi yang sangat berguna untuk membangun aplikasi web real-time. Melalui eksperimen membuat aplikasi chat sederhana, saya memahami bahwa WebSocket memungkinkan browser dan server berkomunikasi dua arah melalui koneksi yang tetap aktif.

Hasil eksperimen menunjukkan bahwa pesan dari satu tab browser dapat langsung muncul di tab lain tanpa perlu refresh halaman. Hal ini membuktikan bahwa WebSocket cocok digunakan untuk fitur seperti chat, notifikasi langsung, live score, game online, dan dashboard monitoring.

Meskipun demikian, penggunaan WebSocket juga perlu mempertimbangkan keamanan dan skalabilitas. Pada aplikasi nyata, pengembang perlu menggunakan koneksi aman, validasi data, autentikasi pengguna, serta pengelolaan koneksi yang baik.

Secara keseluruhan, eksperimen ini membantu saya memahami bahwa WebSocket bukan hanya konsep teori, tetapi teknologi praktis yang dapat langsung digunakan untuk membangun fitur real-time di aplikasi web
