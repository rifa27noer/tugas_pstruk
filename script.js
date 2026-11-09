/* =================================
   BLABLA FEST 2026
   JAVASCRIPT UTAMA
================================= */


/* =================================
   1. PILIH TIKET
================================= */

function pilihTiket(kategori, harga) {

    localStorage.setItem("kategori", kategori);
    localStorage.setItem("harga", harga);

    window.location.href = "booking.html";
}


/* =================================
   2. HALAMAN BOOKING
================================= */

const kategoriInput = document.getElementById("kategori");
const hargaInput = document.getElementById("harga");
const jumlahInput = document.getElementById("jumlah");
const totalText = document.getElementById("total");

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const kategori = localStorage.getItem("kategori");
    const harga = Number(localStorage.getItem("harga"));

    // Memeriksa apakah tiket sudah dipilih

    if (!kategori || !harga) {

        alert("Silakan pilih kategori tiket terlebih dahulu.");

        window.location.href = "tiket.html";

    } else {

        kategoriInput.value = kategori;

        hargaInput.value =
            "Rp" + harga.toLocaleString("id-ID");


        // Menghitung total harga

        function hitungTotal() {

            const jumlah = Number(jumlahInput.value);

            if (jumlah >= 1 && jumlah <= 5) {

                const total = harga * jumlah;

                totalText.textContent =
                    "Total: Rp" + total.toLocaleString("id-ID");

            } else {

                totalText.textContent = "Jumlah tiket 1-5.";

            }
        }


        jumlahInput.addEventListener("input", hitungTotal);

        hitungTotal();


        // Mengirim data pemesanan

        bookingForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const nama = document.getElementById("nama").value.trim();

            const email = document.getElementById("email").value.trim();

            const telepon = document.getElementById("telepon").value.trim();

            const jumlah = Number(jumlahInput.value);


            // Validasi data

            if (!nama || !email || !telepon) {

                alert("Semua data harus diisi.");

                return;
            }

            if (jumlah < 1 || jumlah > 5 || !Number.isInteger(jumlah)) {

                alert("Jumlah tiket minimal 1 dan maksimal 5.");

                return;
            }


            // Menyimpan data pesanan

            const pesanan = {

                nama: nama,

                email: email,

                telepon: telepon,

                kategori: kategori,

                harga: harga,

                jumlah: jumlah,

                total: harga * jumlah,

                kodeTiket: "BLABLA-" + Date.now()

            };


            localStorage.setItem(
                "pesanan",
                JSON.stringify(pesanan)
            );


            alert("Pemesanan berhasil disimpan!");

            window.location.href = "summary.html";

        });

    }

}


/* =================================
   3. HALAMAN SUMMARY / E-TICKET
================================= */

const namaSummary = document.getElementById("nama");
const emailSummary = document.getElementById("email");
const kategoriSummary = document.getElementById("kategori");
const jumlahSummary = document.getElementById("jumlah");
const totalSummary = document.getElementById("total");

if (namaSummary && emailSummary && kategoriSummary &&
    jumlahSummary && totalSummary) {

    const dataPesanan = localStorage.getItem("pesanan");

    if (!dataPesanan) {

        alert("Belum ada data pemesanan.");

        window.location.href = "tiket.html";

    } else {

        const pesanan = JSON.parse(dataPesanan);

        namaSummary.textContent = pesanan.nama;

        emailSummary.textContent = pesanan.email;

        kategoriSummary.textContent = pesanan.kategori;

        jumlahSummary.textContent =
            pesanan.jumlah + " tiket";

        totalSummary.textContent =
            "Rp" + pesanan.total.toLocaleString("id-ID");


        // Menampilkan kode tiket

        const kodeElement = document.getElementById("kodeTiket");

        if (kodeElement) {

            kodeElement.textContent = pesanan.kodeTiket;

        }

    }

}


/* =================================
   4. HALAMAN CONTACT
================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Terima kasih! Pesan kamu berhasil disiapkan."
        );

        contactForm.reset();

    });

}


/* =================================
   5. TOMBOL KEMBALI KE TIKET
================================= */

function kembaliKeTiket() {

    window.location.href = "tiket.html";

}


/* =================================
   6. TOMBOL KEMBALI KE HOME
================================= */

function kembaliKeHome() {

    window.location.href = "index.html";

}


/* =================================
   7. CETAK E-TICKET
================================= */

function cetakTiket() {

    window.print();

}