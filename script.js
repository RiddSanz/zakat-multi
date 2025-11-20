// Kalkulator Zakat - JavaScript Logic
// Berdasarkan Tabel Nishab BAZNAS Kota Semarang

// Format currency to Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format number with thousand separator
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// ===== ZAKAT FITRAH =====
document.getElementById('fitrahForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const jiwa = parseInt(document.getElementById('fitrahJiwa').value);
    const hargaBeras = parseInt(document.getElementById('fitrahHargaBeras').value);
    const metode = document.querySelector('input[name="fitrahMetode"]:checked').value;
    
    const kadarKg = 3.5; // kg per jiwa
    const totalKg = jiwa * kadarKg;
    const totalUang = totalKg * hargaBeras;
    
    let resultHTML = '<div class="result-item">';
    resultHTML += `<p><strong>Jumlah Jiwa:</strong> ${jiwa} orang</p>`;
    resultHTML += `<p><strong>Kadar per Jiwa:</strong> ${kadarKg} kg beras</p>`;
    resultHTML += `<p><strong>Total Beras:</strong> ${totalKg} kg</p>`;
    resultHTML += `<p><strong>Harga Beras:</strong> ${formatRupiah(hargaBeras)}/kg</p>`;
    resultHTML += '<hr>';
    
    if (metode === 'beras') {
        resultHTML += `<p class="result-value"><i class="bi bi-basket"></i> Zakat Fitrah: ${totalKg} kg beras</p>`;
        resultHTML += `<p class="text-muted">Atau setara dengan: ${formatRupiah(totalUang)}</p>`;
    } else {
        resultHTML += `<p class="result-value"><i class="bi bi-cash-coin"></i> Zakat Fitrah: ${formatRupiah(totalUang)}</p>`;
        resultHTML += `<p class="text-muted">Setara dengan: ${totalKg} kg beras</p>`;
    }
    
    resultHTML += '</div>';
    
    document.getElementById('fitrahResultContent').innerHTML = resultHTML;
    document.getElementById('fitrahResult').style.display = 'block';
    document.getElementById('fitrahResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===== FIDYAH =====
document.getElementById('fidyahForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hari = parseInt(document.getElementById('fidyahHari').value);
    const hargaBeras = parseInt(document.getElementById('fidyahHargaBeras').value);
    
    const kadarPerHari = 1.5; // kg per hari
    const totalKg = hari * kadarPerHari;
    const totalUang = totalKg * hargaBeras;
    
    let resultHTML = '<div class="result-item">';
    resultHTML += `<p><strong>Jumlah Hari:</strong> ${hari} hari</p>`;
    resultHTML += `<p><strong>Kadar per Hari:</strong> ${kadarPerHari} kg beras</p>`;
    resultHTML += `<p><strong>Total Beras:</strong> ${totalKg} kg</p>`;
    resultHTML += `<p><strong>Harga Beras:</strong> ${formatRupiah(hargaBeras)}/kg</p>`;
    resultHTML += '<hr>';
    resultHTML += `<p class="result-value"><i class="bi bi-cash-coin"></i> Total Fidyah: ${formatRupiah(totalUang)}</p>`;
    resultHTML += `<p class="text-muted">Atau ${totalKg} kg beras</p>`;
    resultHTML += '</div>';
    
    document.getElementById('fidyahResultContent').innerHTML = resultHTML;
    document.getElementById('fidyahResult').style.display = 'block';
    document.getElementById('fidyahResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===== ZAKAT MAL =====
// Handle jenis harta change
document.getElementById('malJenis').addEventListener('change', function() {
    const jenis = this.value;
    
    document.getElementById('emasInputs').style.display = 'none';
    document.getElementById('uangInputs').style.display = 'none';
    document.getElementById('usahaInputs').style.display = 'none';
    
    if (jenis === 'emas' || jenis === 'perak') {
        document.getElementById('emasInputs').style.display = 'block';
    } else if (jenis === 'uang') {
        document.getElementById('uangInputs').style.display = 'block';
    } else if (jenis === 'usaha') {
        document.getElementById('usahaInputs').style.display = 'block';
    }
});

document.getElementById('malForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const jenis = document.getElementById('malJenis').value;
    const hutang = parseInt(document.getElementById('malHutang').value) || 0;
    const hargaEmas = parseInt(document.getElementById('malHargaEmas').value);
    
    const nishabGram = 85; // gram emas
    const nishabRupiah = nishabGram * hargaEmas;
    const kadar = 2.5 / 100; // 2.5%
    
    let totalHarta = 0;
    let jenisText = '';
    
    if (jenis === 'emas' || jenis === 'perak') {
        const jumlahGram = parseFloat(document.getElementById('malJumlahEmas').value) || 0;
        totalHarta = jumlahGram * hargaEmas;
        jenisText = jenis === 'emas' ? 'Emas' : 'Perak';
    } else if (jenis === 'uang') {
        totalHarta = parseInt(document.getElementById('malJumlahUang').value) || 0;
        jenisText = 'Uang/Tabungan';
    } else if (jenis === 'usaha') {
        totalHarta = parseInt(document.getElementById('malAsetUsaha').value) || 0;
        jenisText = 'Usaha/Dagang';
    }
    
    const hartaBersih = totalHarta - hutang;
    const wajibZakat = hartaBersih >= nishabRupiah;
    const zakatMal = wajibZakat ? hartaBersih * kadar : 0;
    
    let resultHTML = '<div class="result-item">';
    resultHTML += `<p><strong>Jenis Harta:</strong> ${jenisText}</p>`;
    resultHTML += `<p><strong>Total Harta:</strong> ${formatRupiah(totalHarta)}</p>`;
    resultHTML += `<p><strong>Hutang/Kewajiban:</strong> ${formatRupiah(hutang)}</p>`;
    resultHTML += `<p><strong>Harta Bersih:</strong> ${formatRupiah(hartaBersih)}</p>`;
    resultHTML += '<hr>';
    resultHTML += `<div class="nishab-info">`;
    resultHTML += `<p class="mb-0"><strong><i class="bi bi-info-circle"></i> Nishab:</strong> ${formatRupiah(nishabRupiah)} (setara ${nishabGram} gram emas @ ${formatRupiah(hargaEmas)}/gram)</p>`;
    resultHTML += `</div>`;
    
    if (wajibZakat) {
        resultHTML += `<p class="result-value mt-3"><i class="bi bi-check-circle"></i> Zakat yang Harus Dibayar: ${formatRupiah(zakatMal)}</p>`;
        resultHTML += `<p class="text-success"><strong>✓ Harta Anda telah mencapai nishab, wajib zakat 2.5%</strong></p>`;
    } else {
        resultHTML += `<div class="warning-box mt-3">`;
        resultHTML += `<p class="mb-0"><strong><i class="bi bi-x-circle"></i> Belum Wajib Zakat</strong></p>`;
        resultHTML += `<p class="mb-0">Harta bersih Anda belum mencapai nishab. Kekurangan: ${formatRupiah(nishabRupiah - hartaBersih)}</p>`;
        resultHTML += `</div>`;
    }
    
    resultHTML += '</div>';
    
    document.getElementById('malResultContent').innerHTML = resultHTML;
    document.getElementById('malResult').style.display = 'block';
    document.getElementById('malResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===== ZAKAT PERTANIAN =====
document.getElementById('pertanianForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const jenis = document.getElementById('pertanianJenis').value;
    const hasilPanen = parseFloat(document.getElementById('pertanianHasil').value) || 0;
    const irigasi = document.getElementById('pertanianIrigasi').value;
    
    const nishabBeras = 653; // kg
    const nishabPalawija = 815; // kg
    const nishab = jenis === 'beras' ? nishabBeras : nishabPalawija;
    
    const kadar = irigasi === 'alami' ? 0.10 : 0.05; // 10% atau 5%
    const kadarPersen = kadar * 100;
    
    const wajibZakat = hasilPanen >= nishab;
    const zakatPertanian = wajibZakat ? hasilPanen * kadar : 0;
    
    const jenisText = jenis === 'beras' ? 'Beras' : 'Palawija';
    const irigasiText = irigasi === 'alami' ? 'Tadah Hujan/Sungai' : 'Irigasi dengan Biaya';
    
    let resultHTML = '<div class="result-item">';
    resultHTML += `<p><strong>Jenis Tanaman:</strong> ${jenisText}</p>`;
    resultHTML += `<p><strong>Hasil Panen:</strong> ${formatNumber(hasilPanen)} kg</p>`;
    resultHTML += `<p><strong>Sistem Pengairan:</strong> ${irigasiText}</p>`;
    resultHTML += `<p><strong>Kadar Zakat:</strong> ${kadarPersen}%</p>`;
    resultHTML += '<hr>';
    resultHTML += `<div class="nishab-info">`;
    resultHTML += `<p class="mb-0"><strong><i class="bi bi-info-circle"></i> Nishab ${jenisText}:</strong> ${formatNumber(nishab)} kg</p>`;
    resultHTML += `</div>`;
    
    if (wajibZakat) {
        resultHTML += `<p class="result-value mt-3"><i class="bi bi-check-circle"></i> Zakat Pertanian: ${formatNumber(zakatPertanian)} kg</p>`;
        resultHTML += `<p class="text-success"><strong>✓ Hasil panen telah mencapai nishab, wajib zakat ${kadarPersen}%</strong></p>`;
    } else {
        resultHTML += `<div class="warning-box mt-3">`;
        resultHTML += `<p class="mb-0"><strong><i class="bi bi-x-circle"></i> Belum Wajib Zakat</strong></p>`;
        resultHTML += `<p class="mb-0">Hasil panen belum mencapai nishab. Kekurangan: ${formatNumber(nishab - hasilPanen)} kg</p>`;
        resultHTML += `</div>`;
    }
    
    resultHTML += '</div>';
    
    document.getElementById('pertanianResultContent').innerHTML = resultHTML;
    document.getElementById('pertanianResult').style.display = 'block';
    document.getElementById('pertanianResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ===== ZAKAT MODERN =====
// Handle jenis modern change
document.getElementById('modernJenis').addEventListener('change', function() {
    const jenis = this.value;
    
    document.getElementById('profesiInputs').style.display = 'none';
    document.getElementById('sahamInputs').style.display = 'none';
    document.getElementById('peternakanInputs').style.display = 'none';
    
    if (jenis === 'profesi') {
        document.getElementById('profesiInputs').style.display = 'block';
    } else if (jenis === 'saham') {
        document.getElementById('sahamInputs').style.display = 'block';
    } else if (jenis === 'peternakan') {
        document.getElementById('peternakanInputs').style.display = 'block';
    }
});

document.getElementById('modernForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const jenis = document.getElementById('modernJenis').value;
    const hargaEmas = parseInt(document.getElementById('modernHargaEmas').value);
    
    const nishabGram = 85; // gram emas
    const nishabRupiah = nishabGram * hargaEmas;
    const kadar = 2.5 / 100; // 2.5%
    
    let totalNilai = 0;
    let jenisText = '';
    let periodeText = '';
    
    if (jenis === 'profesi') {
        totalNilai = parseInt(document.getElementById('modernPenghasilan').value) || 0;
        jenisText = 'Profesi/Gaji';
        periodeText = 'per bulan';
    } else if (jenis === 'saham') {
        totalNilai = parseInt(document.getElementById('modernSaham').value) || 0;
        jenisText = 'Saham/Investasi';
        periodeText = 'per tahun';
    } else if (jenis === 'peternakan') {
        totalNilai = parseInt(document.getElementById('modernPeternakan').value) || 0;
        jenisText = 'Peternakan';
        periodeText = 'per tahun';
    }
    
    const wajibZakat = totalNilai >= nishabRupiah;
    const zakatModern = wajibZakat ? totalNilai * kadar : 0;
    
    let resultHTML = '<div class="result-item">';
    resultHTML += `<p><strong>Jenis Zakat:</strong> ${jenisText}</p>`;
    resultHTML += `<p><strong>Total Nilai:</strong> ${formatRupiah(totalNilai)} ${periodeText}</p>`;
    resultHTML += `<p><strong>Kadar Zakat:</strong> 2.5%</p>`;
    resultHTML += '<hr>';
    resultHTML += `<div class="nishab-info">`;
    resultHTML += `<p class="mb-0"><strong><i class="bi bi-info-circle"></i> Nishab:</strong> ${formatRupiah(nishabRupiah)} (setara ${nishabGram} gram emas @ ${formatRupiah(hargaEmas)}/gram)</p>`;
    resultHTML += `</div>`;
    
    if (wajibZakat) {
        resultHTML += `<p class="result-value mt-3"><i class="bi bi-check-circle"></i> Zakat yang Harus Dibayar: ${formatRupiah(zakatModern)}</p>`;
        if (jenis === 'profesi') {
            resultHTML += `<p class="text-muted">Zakat dibayarkan setiap bulan</p>`;
        }
        resultHTML += `<p class="text-success"><strong>✓ Penghasilan/Nilai telah mencapai nishab, wajib zakat 2.5%</strong></p>`;
    } else {
        resultHTML += `<div class="warning-box mt-3">`;
        resultHTML += `<p class="mb-0"><strong><i class="bi bi-x-circle"></i> Belum Wajib Zakat</strong></p>`;
        resultHTML += `<p class="mb-0">Nilai belum mencapai nishab. Kekurangan: ${formatRupiah(nishabRupiah - totalNilai)}</p>`;
        resultHTML += `</div>`;
    }
    
    resultHTML += '</div>';
    
    document.getElementById('modernResultContent').innerHTML = resultHTML;
    document.getElementById('modernResult').style.display = 'block';
    document.getElementById('modernResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Initialize - set default displays
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for Mal inputs
    document.getElementById('emasInputs').style.display = 'block';
    
    // Set initial state for Modern inputs
    document.getElementById('profesiInputs').style.display = 'block';
    
    console.log('Kalkulator Zakat initialized successfully');
});
