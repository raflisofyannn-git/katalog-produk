"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

import {addProduct, updateProduct, findProductByName,} from "@/services/productService";


interface ProductExcel {
  Nama: string;
  Harga: number;
  Kategori: string;
  Deskripsi: string;
}


export default function ImportProduct() {


  const [data, setData] = useState<ProductExcel[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);

function validateExcelColumn(
  rows: ProductExcel[]
) {

  if(rows.length === 0){

    return false;

  }


  const firstRow = rows[0];


  const requiredColumn = [
    "Nama",
    "Harga",
    "Kategori",
    "Deskripsi",
  ];


  return requiredColumn.every(
    (column)=>
      column in firstRow
  );

}


  function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {


    const file = e.target.files?.[0];


    if (!file) return;


    const reader = new FileReader();


    reader.onload = (event) => {


      const binary =
        event.target?.result;


      const workbook =
        XLSX.read(binary, {
          type:"binary"
        });


      const sheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ];


      const json =
  XLSX.utils.sheet_to_json<ProductExcel>(
    sheet
  );


if(!validateExcelColumn(json)){

  toast.error(
    "Format Excel tidak sesuai. Gunakan template produk."
  );

  return;

}


setData(json);


    };


    reader.readAsBinaryString(file);


  }

function validateData(){

  const errorList:string[] = [];


  data.forEach((item,index)=>{


    const row = index + 2;


    if(!item.Nama){

      errorList.push(
        `Baris ${row}: Nama produk kosong`
      );

    }


    if(!item.Harga){

      errorList.push(
        `Baris ${row}: Harga kosong`
      );

    }


    if(!item.Kategori){

      errorList.push(
        `Baris ${row}: Kategori kosong`
      );

    }


    if(!item.Deskripsi){

      errorList.push(
        `Baris ${row}: Deskripsi kosong`
      );

    }


  });


  setErrors(errorList);


  return errorList.length === 0;

}

async function handleImport(){

  const valid = validateData();

  if(!valid) return;


  try {

    setImporting(true);


    for(const item of data){

      const existingProduct =
  await findProductByName(item.Nama);

if (existingProduct) {

  await updateProduct(existingProduct.id, {

    name: item.Nama.trim(),

    price: Number(
      String(item.Harga).replace(/[^\d]/g, "")
    ),

    category: item.Kategori
  .trim()
  .toUpperCase(),

    description: item.Deskripsi.trim(),

    // Pertahankan gambar yang sudah ada
    images:
Array.isArray(existingProduct.images)
  ? existingProduct.images
  : [],

  });

} else {

  await addProduct({

    name: item.Nama.trim(),

    price: Number(
      String(item.Harga).replace(/[^\d]/g, "")
    ),

    category: item.Kategori
  .trim()
  .toUpperCase(),

    description: item.Deskripsi.trim(),

    images: [],

  });

}

    }


    toast.success(
  `${data.length} produk berhasil diimport`
);


resetImport();

  } catch(error){

    console.error(error);

    toast.error(
      "Import produk gagal"
    );

  } finally {

    setImporting(false);

  }

}

function resetImport(){

  setData([]);

  setErrors([]);

}

  return (

    <div className="space-y-6">


      <div>

        <label className="mb-2 block font-semibold">
          Upload File Excel
        </label>


        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleUpload}
          className="
          rounded-xl
          border
          p-3
          "
        />

      </div>



      {
        data.length > 0 && (

          <div>


            <div className="overflow-x-auto">


              <table className="w-full border">


                <thead>

                  <tr className="bg-gray-100">

                    <th className="border p-3">
                      Nama
                    </th>

                    <th className="border p-3">
                      Harga
                    </th>

                    <th className="border p-3">
                      Kategori
                    </th>

                    <th className="border p-3">
                      Deskripsi
                    </th>

                  </tr>

                </thead>



                <tbody>


                {
                  data.map((item,index)=>(

                    <tr key={index}>

                      <td className="border p-3">
                        {item.Nama}
                      </td>


                      <td className="border p-3">
                        {item.Harga}
                      </td>


                      <td className="border p-3">
                        {item.Kategori}
                      </td>


                      <td className="border p-3">
                        {item.Deskripsi}
                      </td>


                    </tr>

                  ))
                }


                </tbody>


              </table>
{
data.length > 0 && (

<div>

<h2 className="mb-4 text-xl font-bold">
Preview Data ({data.length} Produk)
</h2>


<table>
</table>


{/* ERROR VALIDASI */}

{
errors.length > 0 && (

<div
className="mt-6 rounded-xl bg-red-50 p-4 text-red-600">

<h3 className="font-bold">
Data Tidak Valid
</h3>


<ul className="mt-2 list-disc pl-5">

{
errors.map((err,index)=>(

<li key={index}>
{err}
</li>

))
}

</ul>


</div>

)
}


{/* BUTTON IMPORT */}

<button
onClick={handleImport}
disabled={importing}
className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
>

{
importing
?
"Sedang Import..."
:
"Import ke Database"
}

</button>

<button
onClick={resetImport}
disabled={importing}
className="ml-3 mt-6 rounded-xl border px-6 py-3 font-semibold disabled:opacity-50"
>
Reset
</button>


</div>

)
}

            </div>


          </div>

        )
      }


    </div>

  );

}