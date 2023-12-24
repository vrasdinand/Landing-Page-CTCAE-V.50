document.addEventListener('DOMContentLoaded', function () {
  // Ganti URL_API dengan URL yang sesuai
  var urlApi = 'https://ctcae.000webhostapp.com/tampil_data_choice.php';
  var selectOption1 = document.getElementById('selectData1');
  var selectOption2 = document.getElementById('selectData2');
  var selectedValuesDiv = document.getElementById('selectedValues');
  var selectedValuesDiv2 = document.getElementById('selectedValues2');
  var selectedValue1;
  var selectedValue2;

  // Ambil data dari REST API menggunakan fetch
  fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      // Loop melalui data dan tambahkan opsi ke dropdown
      data.forEach(item => {
        var option = document.createElement('option');
        option.text = item.MedDRA_SOC;
        selectOption1.appendChild(option);
      });

      // Aktifkan dropdown pertama
      selectOption1.disabled = false;
    })
    .catch(error => {
      console.error('Error fetching data for dropdown 1:', error);
    });

  // Tambahkan event listener untuk menanggapi perubahan nilai dropdown
  selectOption1.addEventListener('change', function () {
    // Dapatkan nilai yang dipilih
    selectedValue1 = selectOption1.value;
    // Tampilkan nilai yang dipilih
    selectedValuesDiv.textContent = 'Nilai yang dipilih: ' + selectedValue1;

    // Nonaktifkan dropdown kedua sementara
    selectOption2.disabled = true;

    // Kosongkan dropdown kedua
    selectOption2.innerHTML = '<option value="" selected>Pilih Data CTCAE Term</option>';

    // Jika nilai yang dipilih pada dropdown pertama tidak kosong
    if (selectedValue1 !== '') {
      // Ambil data dari REST API menggunakan fetch untuk dropdown kedua berdasarkan nilai dropdown pertama
      var urlApi2 = 'https://ctcae.000webhostapp.com/tampil_data_choice_ctcae_term.php?MedDRA_SOC=' + selectedValue1;
      fetch(urlApi2)
        .then(response => response.json())
        .then(data => {
          // Loop melalui data dan tambahkan opsi ke dropdown kedua
          data.forEach(item => {
            var option = document.createElement('option');
            option.text = item.CTCAE_Term;
            selectOption2.appendChild(option);
          });

          // Aktifkan dropdown kedua
          selectOption2.disabled = false;
        })
        .catch(error => {
          console.error('Error fetching data for dropdown 2:', error);
        });
    }
  });

  // Tambahkan event listener untuk menanggapi perubahan nilai dropdown
  selectOption2.addEventListener('change', function () {
    // Dapatkan nilai yang dipilih
    selectedValue2 = selectOption2.value;
    // Tampilkan nilai yang dipilih
    selectedValuesDiv2.textContent = 'Nilai yang dipilih: ' + selectedValue2;
  });
  // Tambahkan event listener untuk tombol pencarian
  document.getElementById('searchButton').addEventListener('click', function () {
    // Get the selected value at the moment the button is clicked
    var selectedValue1 = selectOption1.value;
  
    if (selectedValue1) {
      filterTable(selectedValue1);
    } else {
      console.error('Please select a value from the first dropdown before searching.');
    }
  });

  // Fungsi filterTable
  function filterTable(selectedValue1) {
   
    // Show the loading spinner when the filter button is clicked
    document.getElementById('loadingSpinner').style.display = 'inline-block';
    // Add a delay of 1 second (1000 milliseconds)  
    setTimeout(() => {
      // Ambil data dari REST API 
      var urlApi3 = 'https://ctcae.000webhostapp.com/tampil_data.php?MedDRA_SOC=' + selectedValue1;

      //function table
      // function fetchTableData(apiUrl) {
      fetch(urlApi3)
        .then(response => response.json())
        .then(data => {
          const tableBody = document.getElementById('tableBody');
          tableBody.innerHTML = ''; // Clear previous table data

          data.forEach(item => {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);
            const cell9 = row.insertCell(8);
            const cell10 = row.insertCell(9);
            const cell11 = row.insertCell(10);
            // Add more cells as needed

            // Populate cells with data from the API response
            cell1.textContent = item.MedDRA_code; // Adjust based on your API response structure
            cell2.textContent = item.MedDRA_SOC // Adjust based on your API response structure
            cell3.textContent = item.CTCAE_Term; // Adjust based on your API response structure
            cell4.textContent = item.Grade_1; // Adjust based on your API response structure
            cell5.textContent = item.Grade_2; // Adjust based on your API response structure
            cell6.textContent = item.Grade_3; // Adjust based on your API response structure
            cell7.textContent = item.Grade_4; // Adjust based on your API response structure
            cell8.textContent = item.Grade_5; // Adjust based on your API response structure
            cell9.textContent = item.Definition; // Adjust based on your API response structure
            cell10.textContent = item.Navigational_Note; // Adjust based on your API response structure
            cell11.textContent = item.CTCAE_v5_Change; // Adjust based on your API response structure
            // Populate more cells as needed
          });
        })
        .catch(error => console.error('Error fetching table data:', error))
        .finally(() => {
          // Menyembunyikan spinner loading setelah proses pengambilan data selesai
          document.getElementById('loadingSpinner').style.display = 'none';
        });
    }, 5000); // Delay of 1 second (1000 milliseconds)
  }
});
