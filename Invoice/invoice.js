const toggle = document.getElementById('toggle');

toggle.addEventListener("click", (e)=> {
  const ul = document.querySelector(".fullcontainer .container .navbar .grid2");
  ul.classList.toggle('aktif');
});

const namaPelanggan = JSON.parse(sessionStorage.getItem('namaPelanggan'));
const alamatPengiriman = JSON.parse(sessionStorage.getItem('alamatPengirim'));
const email = JSON.parse(sessionStorage.getItem('email'));
const telepon = JSON.parse(sessionStorage.getItem('telepon'));
let ongkir = JSON.parse(sessionStorage.getItem('ongkir'));
const bank = JSON.parse(sessionStorage.getItem('bank'));

let rekeningInfo;
let namaBank;

switch (bank) {
  case 'bca':
    namaBank = 'bank BCA';
    rekeningInfo = 'Bank BCA 238 080 156 4';
    break;
  case 'bni':
    namaBank = 'Bank BNI';
    rekeningInfo = 'Bank BNI 9871 2776 143';
    break;
  case 'mandiri':
    namaBank = 'Bank Mandiri';
    rekeningInfo = 'Bank Mandiri : 231 412 138 753 2';
    break;
  case 'bri':
    namaBank = 'Bank BRI';
    rekeningInfo = 'Bank BRI: 0069-01-876521-56-8';
    break;
  default:
    namaBank = 'Lainnya';
    rekeningInfo = 'Bank Lain : Nomor Rekening Lain';
  }

  const norek = JSON.parse(sessionStorage.getItem('norek'));
  const namaRekening = JSON.parse(sessionStorage.getItem('namaRekening'));
  const cabang = JSON.parse(sessionStorage.getItem('cabang'));
  // Menampilkan data di elemen HTML

  document.getElementById('invoice-nama').textContent = namaPelanggan;
  document.getElementById('invoice-alamat').textContent = alamatPengiriman;
  document.getElementById('invoice-email').textContent = email;
  document.getElementById('invoice-telepon').textContent = telepon;
  document.getElementById('invoice-rekening').textContent = rekeningInfo;
  document.getElementById('invoice-bank').textContent = namaBank;
  document.getElementById('invoice-rek').textContent = norek;
  document.getElementById('invoice-pengirim').textContent = namaRekening;
  document.getElementById('invoice-cabang').textContent = cabang;
  document.getElementById('invoice-ongkir').textContent = ongkir.toLocaleString('id-ID');
  // Menampilkan Produk dari Keranjang Belanja
  // Ambil daftar belanja dari Session Storage
  const keranjangBelanja = JSON.parse(sessionStorage.getItem('keranjang'));

  // Tampilkan daftar belanja pada halaman
  const daftarKeranjang = document.getElementById('daftar-keranjang');
  const totalBelanjanya = document.getElementById('total-belanja');
  let totalBelanja = 0;

  keranjangBelanja.forEach((produk) => {
    const itemProduk = document.createElement('tr');
    const jumlahSemua = produk.jumlah * produk.harga;
    itemProduk.innerHTML = `
    <td>${produk.nama}</td>
    <td>${produk.jumlah}</td>
    <td>Rp${produk.harga.toLocaleString('id-ID')}</td>
    <td>Rp${jumlahSemua.toLocaleString('id-ID')}</td>`;

    daftarKeranjang.appendChild(itemProduk);
    totalBelanja += (produk.jumlah * produk.harga);
  });

  totalBelanjanya.textContent = `${totalBelanja.toLocaleString('id-ID')}`;
  const totalBayar = totalBelanja + Number(ongkir);

  document.getElementById('invoice-total').textContent = `${totalBayar.toLocaleString('id-ID')}`;
  document.getElementById('total-bayar').textContent = `${totalBayar.toLocaleString('id-ID')}`;


  function cetakInvoice(cetakke) {
    var printContents = document.getElementById('cetakke').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }