const { PageSizes, PDFDocument } = require('pdf-lib')
const fetch = require('node-fetch');
var fs = require('fs');

(async () => {
  try {
    const url = 'https://brokerloopdev.s3.amazonaws.com/orders/dbcb3cf1-d537-4969-bce0-8d1a8f144ef8/export.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const pdfDocnew = await PDFDocument.create()
  const [existingPage] = await pdfDocnew.copyPages(pdfDoc, [1])
  pdfDocnew.addPage(existingPage)

  const pdfBytes = await pdfDocnew.save()
  fs.writeFileSync('./test1.pdf', pdfBytes);
  } catch (e) {
    console.log(e);
  }
  

})()