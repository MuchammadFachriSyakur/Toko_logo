const toggle = document.getElementById('toggle');

toggle.addEventListener("click", (e)=> {
  const ul = document.querySelector(".fullcontainer .container .navbar .grid2");
  ul.classList.toggle('aktif');
});

const keranjangBelanjanya = JSON.parse(sessionStorage.getItem('keranjang'));
const daftarBelanja = document.querySelector(".table-info .cart_list");
const total = document.querySelector(".table-info .totalBelanja .total-belanja");
let totalBelanja = 0;


keranjangBelanjanya.forEach((produk)=> {
  const tr = document.createElement('tr');
  const jum = produk.harga * produk.jumlah;
  tr.innerHTML = `
  <td>${produk.nama}</td>
  <td>${produk.jumlah}</td>
  <td>${produk.harga.toLocaleString("id-ID")}</td>
  <td>${jum.toLocaleString("id-ID")}</td>
  `;
  daftarBelanja.appendChild(tr);
  totalBelanja += (produk.jumlah * produk.harga);
});
total.textContent = `${totalBelanja.toLocaleString("id-ID")}`;

function selesaikanPembayaran() {
  const namaPelanggan = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const rt = document.getElementById('rt').value;
  const rw = document.getElementById('rw').value;
  const desa = document.getElementById('desa').value;
  const kecamatan = document.getElementById('kecamatan').value;
  const kota = document.getElementById('kota').value;
  const kodepos = document.getElementById('kode-pos').value;
  const ongkir = document.getElementById('ongkir').value;
  const email = document.getElementById('email').value;
  const telepon = document.getElementById('telepon').value;
  const bank = document.getElementById('bank').value;
  const norek = document.getElementById('nomor-rekening').value;
  const namaRekening = document.getElementById('nama-rekening').value;
  const cabang = document.getElementById('cabang').value;

  sessionStorage.setItem('namaPelanggan', JSON.stringify(namaPelanggan));
  sessionStorage.setItem('alamatPengirim', JSON.stringify(alamat + ' Rt: ' + rt + ' Rw: ' + rw + ' Desa: ' + desa + ' Kecamatan: '+ kecamatan +' Kota/Kab: '+ kota +' Kodepos: '+ kodepos));
  sessionStorage.setItem('email', JSON.stringify(email));
  sessionStorage.setItem('telepon', JSON.stringify(telepon));
  sessionStorage.setItem('ongkir', JSON.stringify(ongkir));
  sessionStorage.setItem('bank', JSON.stringify(bank));
  sessionStorage.setItem('namaRekening', JSON.stringify(namaRekening));
  sessionStorage.setItem('cabang', JSON.stringify(cabang));
  sessionStorage.setItem('norek', JSON.stringify(norek));
  sessionStorage.setItem('nomor-rekening', JSON.stringify(namaRekening));
}