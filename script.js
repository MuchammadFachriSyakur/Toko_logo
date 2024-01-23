const toggle = document.getElementById('toggle');

toggle.addEventListener("click", (e)=> {
  const ul = document.querySelector(".fullcontainer .container .navbar .grid2");
  ul.classList.toggle('aktif');
});


const image = [];
let i = 0;

image[0] = 'Source/slide1.jpg';
image[1] = 'Source/slide2.jpg';
image[2] = 'Source/slide3.jpg';

function slideGambar() {
  document.slide.src = image[i];
  if (i < image.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout(slideGambar, 1500);
}
window.onload = slideGambar;

window.addEventListener("DOMContentLoaded", (e)=> {
  const hero = document.querySelector(".fullcontainer .container .page .hero");
  const page_produk = document.querySelector(".fullcontainer .container .page .daftar_produk");

  hero.classList.toggle('aktif1');
  page_produk.classList.toggle('aktif2');
});

window.addEventListener("scroll", (e)=> {
  const layar = window.innerHeight;
  const table1 = document.querySelector(".table-info");
  const table = document.querySelector(".table-info").getBoundingClientRect().top;
  const item = document.querySelectorAll(".fullcontainer .container .page .daftar_produk .grid1 .item");

  if (table < layar) {
    table1.classList.add('aktif3');
  } else {
    table1.classList.remove('aktif3');
  }

  item.forEach((e)=> {
    const it = e;
    const itTop = it.getBoundingClientRect().top;
    const itBottom = it.getBoundingClientRect().bottom;

    if (itTop < layar) {
      it.classList.add('itemAktif');
    } else {
      it.classList.remove('itemAktif');
    }

    if (itBottom < layar) {
      it.classList.add('itemAktif');
    } else {
      it.classList.remove('itemAktif');
    }

  });
});
function detail_Produk (namaProduk, hargaProduk, detailProduk, gambarProduk) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
  <section class="close_popup">
  <i onclick="tutup_popup()"><i class="ph ph-arrow-left"></i></i>
  </section>
  <section class="picture">
  <img src="${gambarProduk}">
  </section>
  <section class="popup_detail">
  <p class="title_produk">${namaProduk}</p>
  <p class="harga_produk">Rp ${hargaProduk.toLocaleString("id-ID")}<p/>
  <p class="deskripsi_produk">${detailProduk}</p>
  </section>
  `;
  document.body.appendChild(popup);
}
function tutup_popup() {
  const popup = document.querySelector(".popup");
  document.body.removeChild(popup);
}

function filter_kategori(kategori) {
  const item = document.querySelectorAll(".fullcontainer .container .page .daftar_produk .grid1 .item");
  for (const produk of item) {
    const kategoriProduk = produk.getAttribute('data-kategori');
    if (kategori === 'all' || kategori === kategoriProduk) {
      produk.style.display = 'flex';
    } else {
      produk.style.display = 'none';
    }
  }
}

function cariBarang() {
  const inputTeks = document.getElementById('search_item');
  const value = inputTeks.value.toLowerCase();
  const item = document.querySelectorAll(".fullcontainer .container .page .daftar_produk .grid1 .item");

  for (const produk of item) {
    const namaProduk = produk.querySelector(".nama_item").textContent.toLowerCase();

    if (namaProduk.includes(value)) {
      produk.style.display = 'flex';
    } else {
      produk.style.display = 'none';
    }
  }
}
const keranjang = [];
const totalBelanj = 0;

function tambahKeKeranjang(namaProduk, hargaProduk) {
  let produkDitemukan = false;
  for (let i = 0; i < keranjang.length; i++) {
    if (keranjang[i].nama == namaProduk) {
      keranjang[i].jumlah++;
      produkDitemukan = true;
      break
    }
  }
  if (!produkDitemukan) {
    keranjang.push({
      nama: namaProduk,
      harga: hargaProduk,
      jumlah: 1
    });
  }
  updateKeranjang();
}

function updateKeranjang() {
  const daftarKeranjang = document.querySelector(".table-info tbody");
  const totalBelanjaElem = document.querySelector(".table-info .totalBelanja tr .total-belanja");

  daftarKeranjang.innerHTML = "";
  let total = 0;

  keranjang.forEach((produk, index)=> {
    const tr = document.createElement('tr');
    const jum = produk.jumlah * produk.harga;
    tr.innerHTML = `
    <td>${produk.nama}</td>
    <td>
    <button onclick="tambahProduk(${index})">+</button>
    ${produk.jumlah}
    <button onclick="kurangiProduk(${index})">-</button>
    </td>
    <td>${produk.harga.toLocaleString("id-ID")}</td>
    <td>${jum.toLocaleString("id-ID")}</td>
    `;
    daftarKeranjang.appendChild(tr);
    total += (produk.harga * produk.jumlah);
  });
  totalBelanjaElem.textContent = `Rp ${total.toLocaleString("id-ID")}`;

  const tableInfo = document.querySelector(".table-info");

  window.scrollTo({
    top: tableInfo.offsetTop,
    left: 0,
  });
}

function chekout(e) {
  sessionStorage.setItem('keranjang', JSON.stringify(keranjang));
  if (keranjang.length === 0) {
    //Hai
  } else {
    window.location.href = "Checkout/chekout.html";
  }

}

const button = document.querySelector("table-info .cart_list tr td:nth-child(2) button");
function tambahProduk(index) {
  keranjang[index].jumlah++;
  updateKeranjang();
}

function kurangiProduk(index) {
  if (keranjang[index].jumlah > 1) {
    keranjang[index].jumlah--;
  } else {
    keranjang.splice(index, 1);
  }

  updateKeranjang();
}