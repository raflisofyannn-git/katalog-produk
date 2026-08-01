import * as XLSX from "xlsx";


export function downloadProductTemplate() {

  const data = [
    {
      Nama: "Nike Air Max",
      Harga: 1200000,
      Kategori: "Sepatu",
      Deskripsi: "Original Import China",
    },
  ];


  const worksheet =
    XLSX.utils.json_to_sheet(data);


  const workbook =
    XLSX.utils.book_new();


  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Produk"
  );


  XLSX.writeFile(
    workbook,
    "template_produk.xlsx"
  );

}