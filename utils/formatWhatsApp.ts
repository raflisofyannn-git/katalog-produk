import { CartItem } from "@/types/cart";
import { formatCurrency } from "./formatCurrency";

export function createWhatsappMessage(
  cart: CartItem[],
  customerName: string,
  customerPhone: string,
  total: number,
  orderNumber: string
) {

  const items = cart
    .map(
      (item, i) => `${i + 1}. ${item.name}

Qty : ${item.qty}

Harga : ${formatCurrency(item.price)}

Subtotal : ${formatCurrency(item.price * item.qty)}`
    )
    .join("\n\n");

  return `Halo Kak,

Aku mau ikut Pre Order dong.
Berikut Rincian pesanan aku ya.

Nomor PO
${orderNumber}

━━━━━━━━━━━━━━━━━━

Nama
${customerName}

No HP
${customerPhone}

━━━━━━━━━━━━━━━━━━

${items}

━━━━━━━━━━━━━━━━━━

TOTAL

${formatCurrency(total)}

DP 50% : ${formatCurrency(total / 2)}
Transfer hanya ke rekening berikut:
SEABANK — 901895222583 a.n. Azhari Oktavina
⚠️ Jika sudah melakukan payment harap untuk mengirim bukti Screenshootnya 
`;
}