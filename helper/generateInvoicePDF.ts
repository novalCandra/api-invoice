import puppeteer from "puppeteer"
import { Prisma } from "../generated/prisma/client.js";

type Invoice = Prisma.invoiceGetPayload<{
  include: {
    items: true;
    client: true;
    user: {
      select: {
        id: true;
        nama: true;
        email: true;
        role: true;
      };
    };
    customization: true;
  };
}>;
export const generateInvoicePDFHelper = async (invoice: Invoice): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage();

  const html = buildInvoiceHTML(invoice);
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
  })

  await browser.close();
  return Buffer.from(pdfBuffer)
}

const buildInvoiceHTML = (invoice: Invoice) => {
  const style = invoice.customization?.[0] ?? {
    text_color: "#000000",
    background_color: "#ffffff",
    accent_color: "#4f46e5",
  };
  const itemsHTML = invoice.items
    .map((item) => {
      const qty = Number(item.quantity);
      const unitPrice = Number(item.unit_price);
      const subtotal = qty * unitPrice;

      return `
        <tr>
          <td>${item.description}</td>
          <td style="text-align:center">${qty}</td>
          <td style="text-align:right">Rp ${unitPrice.toLocaleString("id-ID")}</td>
          <td style="text-align:right">Rp ${subtotal.toLocaleString("id-ID")}</td>
        </tr>
      `;
    })
    .join("");

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            background-color: ${style.background_color};
            color: ${style.text_color};
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 32px;
            padding-bottom: 16px;
            border-bottom: 3px solid black;
          }
          .invoice-title { font-size: 28px; font-weight: bold; color: black; }
          .invoice-id { font-size: 14px; color: black; margin-top: 4px; font-weight : bold; }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            background-color: ${invoice.status === "paid" ? "#dcfce7" : "#fef9c3"};
            color: ${invoice.status === "paid" ? "#166534" : "#854d0e"};
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
          }
          .info-box h3 {
            font-size: 11px;
            text-transform: uppercase;
            color: #999;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
          }
          .info-box p { font-size: 14px; line-height: 1.6; }
          .info-box .name { font-weight: bold; font-size: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          thead tr { background-color: ${style.accent_color}; }
          thead th {
            padding: 10px 12px;
            text-align: left;
            font-size: 13px;
            color: #000;
          }
          tbody tr:nth-child(even) { background-color: #f9f9f9; }
          tbody td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #eee; }
          .totals { margin-left: auto; width: 280px; }
          .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            font-size: 14px;
            border-bottom: 1px solid #eee;
          }
          .totals-row.grand {
            font-weight: bold;
            font-size: 16px;
            border-bottom: none;
            padding-top: 10px;
            color: ${style.accent_color};
          }
          .notes {
            margin-top: 32px;
            padding: 16px;
            background: #f9f9f9;
            border-left: 4px solid ${style.accent_color};
            font-size: 13px;
          }
          .notes h4 { margin-bottom: 6px; font-size: 12px; text-transform: uppercase; color: #999; }
        </style>
      </head>
      <body>

        <!-- Header -->
        <div class="header">
          <div>
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-id">INV-${String(invoice.id).padStart(4, "0")}</div>
            <div style="margin-top:8px">
              <span class="status-badge">${invoice.status}</span>
            </div>
          </div>
          <div style="text-align:right; font-size:13px; color:#666;">
            <p><strong>${invoice.user.nama}</strong></p>
            <p>${invoice.user.email}</p>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid">
          <div class="info-box">
            <h3>Bill To</h3>
            <p class="name">${invoice.client.nama}</p>
            <p>${invoice.client.email}</p>
            <p>${invoice.client.phone}</p>
            <p>${invoice.client.compay}</p>
          </div>
          <div class="info-box">
            <h3>Invoice Details</h3>
            <p><strong>Issue Date:</strong> ${invoice.date}</p>
            <p><strong>Due Date:</strong> ${invoice.dueData}</p>
            <p><strong>Description:</strong> ${invoice.description}</p>
          </div>
        </div>

        <!-- Items Table -->
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align:center">Qty</th>
              <th style="text-align:right">Unit Price</th>
              <th style="text-align:right">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <!-- Total -->
        <div class="totals">
          <div class="totals-row grand">
            <span>Grand Total</span>
            <span>Rp ${Number(invoice.amount).toLocaleString("id-ID")}</span>
          </div>
        </div>

        <!-- Notes -->
        ${invoice.notes ? `
          <div class="notes">
            <h4>Notes</h4>
            <p>${invoice.notes}</p>
          </div>
        ` : ""}

      </body>
    </html>
    `
}
// module.exports = generateInvoicePDFHelper