document.addEventListener("DOMContentLoaded", function() {
    const chart = document.getElementById('myChart');
    let statistikChart; // Untuk menyimpan objek Chart

    function updateChart(selectedYear) {
        // Data hasil per bulan dari PHP
        const hasilPerBulan = [
            {
                bulan: "September 2023",
                laba_bersih: 1762694,
                total_harga_beli: 5678206,
                total_penjualan: 7440900
            },
            {
                bulan: "October 2023",
                laba_bersih: 2328802,
                total_harga_beli: 7792198,
                total_penjualan: 10121000
            },
            {
                bulan: "November 2023",
                laba_bersih: 3104409,
                total_harga_beli: 7885091,
                total_penjualan: 10989500
            },
            {
                bulan: "December 2023",
                laba_bersih: 3788790,
                total_harga_beli: 11160710,
                total_penjualan: 14949500
            },
            {
                bulan: "January 2024",
                laba_bersih: 3695659,
                total_harga_beli: 11498841,
                total_penjualan: 15194500
            },
            {
                bulan: "February 2024",
                laba_bersih: 3768376,
                total_harga_beli: 11732624,
                total_penjualan: 15501000
            },
            {
                bulan: "March 2024",
                laba_bersih: 4454256,
                total_harga_beli: 14108244,
                total_penjualan: 18562500
            }
        ]
        // Filter data sesuai dengan tahun yang dipilih
        const filteredData = hasilPerBulan.filter(function(item) {
            // Parse tanggal dari format bulan
            const date = new Date(item.bulan + ' 01');

            // Ambil tahun dari tanggal
            const year = date.getFullYear();

            // Kembalikan objek data jika tahun sama dengan tahun yang dipilih
            return year === selectedYear;
        });

        // Ekstrak kembali data untuk labels, total penjualan, dan laba bersih
        const labels = filteredData.map(function(item) {
            const date = new Date(item.bulan + ' 01');
            return date.toLocaleDateString('id-ID', {
                month: 'long',
            });
        });

        const totalPenjualan = filteredData.map(function(item) {
            return item.total_penjualan;
        });

        const labaBersih = filteredData.map(function(item) {
            return item.laba_bersih;
        });

        // Perbarui data di dalam chart
        if (statistikChart) {
            statistikChart.destroy(); // Hancurkan objek Chart sebelumnya
        }

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Omset',
                        data: totalPenjualan,
                        borderWidth: 1,
                        backgroundColor: '#fef1de',
                        borderColor: '#f99f25',
                    },
                    {
                        label: 'Laba Bersih',
                        data: labaBersih,
                        borderWidth: 1,
                        backgroundColor: '#e3f7ed',
                        borderColor: '#47ca84',
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {}
            }
        };

        statistikChart = new Chart(chart, config); // Buat objek Chart baru
    }

    // Default tahun adalah tahun saat ini
    const defaultYear = new Date().getFullYear();
    $('#selectDate').val(defaultYear); // Set nilai dropdown menjadi default tahun
    updateChart(defaultYear); // Tampilkan chart untuk tahun default saat pertama kali halaman dimuat

    $('#selectDate').on('change', function() {
        const selectedYear = parseInt($(this).val());
        updateChart(selectedYear); // Perbarui chart sesuai dengan tahun yang dipilih pada dropdown
    });
});
