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
    await page.emulateMediaType('print');
    const html = buildInvoiceHTML(invoice);
    await page.setContent(html, { waitUntil: "load" });
    await page.setViewport({ width: 794, height: 1123 });
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    })

    await browser.close();
    return Buffer.from(pdfBuffer)
}

const formatDate = (dateStr: string | Date) => new Date(dateStr).toLocaleString('id-ID', {
    day: "2-digit", month: "long", year: "numeric"
})
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
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
</head>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
}

.a4 {
    width: 210mm;
    min-height: 297mm;
    margin: auto;
    background: white;
    padding: 20mm;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

@media print {
    @page {
        size: A4;
        margin: 0;
    }

    body {
        width: 210mm;
        height: 297mm;
        padding: 0;
        margin : 0;
    }

      .a4 {
        box-shadow: none;
        margin: 0;
        width: 100%;
        min-height: 100%;
    }
}

/* Header */
.header {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid black;
}

.header h3 {
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -1px;
}

.header .invoice-number {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.header nav {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.header nav .nav-col p {
    font-size: 0.8rem;
    font-weight: 600;
    color: #333;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
}

.header nav .nav-col h4 {
    font-size: 1.2rem;
    font-weight: 700;
}

/* Details row */
.details-row {
    display : flex;
    gap: 3rem;
    padding: 2rem 0;
    border-bottom: 3px solid black;
    text-align: center;
    justify-content : center;
    margin : auto;
}

.details-row .detail-col p.label {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #333;
    text-align: center;
    margin-bottom: 6px;
}

.details-row .detail-col p.value {
    font-size: 1.1rem;
    font-weight: 700;
    text-align: center;
}

.details-row .detail-col .status-badge {
    display: inline-block;
    background-color: ${style.background_color};
    color: black;
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
    padding: 4px 14px;
    border-radius: 4px;
    border: 2px solid black;
}

/* Amount box */
.layout-kotak {
    display: flex;
    padding-top: 2rem;
    padding-bottom: 5rem;
    border-bottom: 3px solid black;
}

.kotak-amount {
    border: 3px solid black;
    width: 100%;
    padding: 1.5rem 2rem;
}

.kotak-amount p {
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    color: #333;
    margin-bottom: 0.5rem;
}

.kotak-amount h3 {
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -1px;
}

/* Footer */
footer {
    padding-top: 2rem;
    text-align: center;
}

footer p {
    font-weight: 700;
    font-size: 1rem;
}
</style>
<body>
<div class="a4">

    <!-- Header -->
    <div class="header">
        <h3>INVOICE</h3>
        <span class="invoice-number">INV-${String(invoice.id).padStart(4, "0")}</span>
        <nav>
            <div class="nav-col">
                <p>FROM</p>
                <h4>${invoice.client.compay}</h4>
            </div>
            <div class="nav-col" style="text-align: right;">
                <p>BILL TO</p>
                <h4>${invoice.client_name}</h4>
            </div>
        </nav>
    </div>
    <!-- end header -->

    <!-- Details Row -->
    <div class="details-row">
        <div class="detail-col">
            <p class="label">INVOICE DATE</p>
            <p class="value">${formatDate(invoice.date)}</p>
        </div>
        <div class="detail-col">
            <p class="label">DUE DATE</p>
            <p class="value">${formatDate(invoice.dueData)}</p>
        </div>
        <div class="detail-col">
            <p class="label">STATUS</p>
            <span class="status-badge">${invoice.status}</span>
        </div>
    </div>
    <!-- end details row -->

    <!-- Amount Box -->
    <div class="layout-kotak">
        <div class="kotak-amount">
            <p>TOTAL AMOUNT</p>
            <h3>Rp.${invoice.amount}</h3>
        </div>
    </div>
    <!-- end amount box -->

    <!-- Footer -->
    <footer>
        <p>Thank you for your business</p>
    </footer>

</div>
</body>
</html>
   `
}
// module.exports = generateInvoicePDFHelper