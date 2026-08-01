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

  return `Halo Admin,

Saya ingin melakukan PREORDER.

━━━━━━━━━━━━━━━━━━

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

Terima kasih.`;
}