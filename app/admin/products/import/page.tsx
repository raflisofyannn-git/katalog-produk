"use client";


import ImportProduct from "@/components/admin/ImportProduct";
import { downloadProductTemplate } from "@/utils/excel";


export default function ImportProductPage(){


return (

<main className="mx-auto max-w-5xl p-8">


<h1 className="mb-2 text-4xl font-bold">
Import Produk Excel
</h1>


<p className="mb-8 text-gray-500">
Upload data produk melalui Excel.
</p>



<div className="rounded-2xl border bg-white p-8 shadow space-y-8">


<button
onClick={downloadProductTemplate}
className="
rounded-xl
bg-blue-600
px-6
py-3
font-semibold
text-white
"
>
Download Template Excel
</button>



<ImportProduct />


</div>


</main>

);


}