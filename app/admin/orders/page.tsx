"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useOrders } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types/order";

import OrderStatusBadge from "@/components/admin/OrderStatusBadge";

import { deleteOrder } from "@/services/orderService";

import { toast } from "sonner";

import { formatCurrency } from "@/utils/formatCurrency";


export default function OrdersPage() {


  const {
    orders,
    loading,
  } = useOrders();



  const [search, setSearch] =
    useState("");



  const [statusFilter, setStatusFilter] =
    useState<OrderStatus | "All">(
      "All"
    );



  const [dateFilter, setDateFilter] =
    useState<
      "All" | "Today" | "7days" | "30days"
    >(
      "All"
    );



  async function handleDelete(
    id: string
  ) {


    const confirmDelete =
      window.confirm(
        "Yakin ingin menghapus PO ini?"
      );



    if (!confirmDelete) return;



    try {


      await deleteOrder(id);



      toast.success(
        "PO berhasil dihapus."
      );



      window.location.reload();



    } catch (error) {


      console.error(error);



      toast.error(
        "Gagal menghapus PO."
      );


    }


  }



  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {


      const matchSearch =

        order.orderNumber
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        order.customerName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );



      const matchStatus =

        statusFilter === "All"

          ? true

          : order.status === statusFilter;



      const today = new Date();


      const orderDate =
        new Date(order.createdAt);



      let matchDate = true;



      if (dateFilter === "Today") {

        matchDate =
          orderDate.toDateString() ===
          today.toDateString();

      }



      if (dateFilter === "7days") {

        const sevenDaysAgo =
          new Date();


        sevenDaysAgo.setDate(
          today.getDate() - 7
        );


        matchDate =
          orderDate >= sevenDaysAgo;

      }



      if (dateFilter === "30days") {

        const thirtyDaysAgo =
          new Date();


        thirtyDaysAgo.setDate(
          today.getDate() - 30
        );


        matchDate =
          orderDate >= thirtyDaysAgo;

      }



      return (
        matchSearch &&
        matchStatus &&
        matchDate
      );


    });


  }, [
    orders,
    search,
    statusFilter,
    dateFilter,
  ]);

    if (loading) {

    return (

      <main className="flex h-screen items-center justify-center">

        <p className="text-lg font-semibold">
          Memuat Data...
        </p>

      </main>

    );

  }


  return (

    <main className="mx-auto max-w-7xl p-8">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Manajemen Pesanan
        </h1>


        <p className="mt-2 text-gray-500">
          Kelola seluruh pesanan customer
        </p>

      </div>



      <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">


        <div className="grid gap-4 md:grid-cols-3">


          <input
            className="rounded-xl border px-4 py-3"
            placeholder="Cari Nomor PO / Customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />



          <select
            className="rounded-xl border px-4 py-3"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as
                  | OrderStatus
                  | "All"
              )
            }
          >

            <option value="All">
              Semua Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Ordered">
              Ordered
            </option>

            <option value="Arrived">
              Arrived
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>



          <select
            className="rounded-xl border px-4 py-3"
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(
                e.target.value as
                  | "All"
                  | "Today"
                  | "7days"
                  | "30days"
              )
            }
          >

            <option value="All">
              Semua Tanggal
            </option>

            <option value="Today">
              Hari Ini
            </option>

            <option value="7days">
              7 Hari Terakhir
            </option>

            <option value="30days">
              30 Hari Terakhir
            </option>

          </select>


        </div>



        <p className="mt-5 text-sm text-gray-500">

          Menampilkan {filteredOrders.length} pesanan

        </p>


      </div>



      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">


        <table className="w-full">


          <thead className="bg-slate-50">

            <tr>

              <th className="p-4 text-left">
                No PO
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-left">
                Total
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Tanggal
              </th>

              <th className="text-left">
                Aksi
              </th>

            </tr>

          </thead>



          <tbody>


            {filteredOrders.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="p-10 text-center text-gray-500"
                >
                  Tidak ada pesanan.
                </td>

              </tr>


            ) : (


              filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-slate-50"
                >


                  <td className="p-4">

                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {order.orderNumber}
                    </Link>

                  </td>



                  <td>
                    {order.customerName}
                  </td>



                  <td>
                    {formatCurrency(order.total)}
                  </td>



                  <td>

                    <OrderStatusBadge
                      status={order.status}
                    />

                  </td>



                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "id-ID"
                    )}

                  </td>



                  <td>

                    <div className="flex gap-2">


                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 ">
                        Detail
                      </Link>



                      <button
                        onClick={() =>
                          handleDelete(order.id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                        Hapus
                      </button>


                    </div>

                  </td>


                </tr>


              ))

            )}


          </tbody>


        </table>


      </div>


    </main>

  );

}