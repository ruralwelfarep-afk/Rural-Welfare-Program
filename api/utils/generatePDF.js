// api/utils/generatePDF.js
// Generates application PDF using pdf-lib
// PDF structure:
//   Page 1 — Application form (with embedded photo & signature)
//   Page 2+ — Attached documents (aadhar, qualification, etc.)

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const GREEN  = rgb(0.1,  0.36, 0.16)   // #1a5c2a
const YELLOW = rgb(0.94, 0.75, 0.13)   // #f0c020
const LGREEN = rgb(0.94, 0.98, 0.94)   // light green bg
const GRAY   = rgb(0.4,  0.4,  0.4)
const DGRAY  = rgb(0.15, 0.15, 0.15)
const WHITE  = rgb(1, 1, 1)
const BLACK  = rgb(0, 0, 0)

// ── Embed image helper ────────────────────────────────────────────────────────
async function embedImage(pdfDoc, buffer, mimeType) {
  if (mimeType === 'image/png') return pdfDoc.embedPng(buffer)
  return pdfDoc.embedJpg(buffer)  // jpeg / jpg
}

// ── Draw a labelled table row ──────────────────────────────────────────────────
function drawRow(page, fonts, y, label, value, opts = {}) {
  const { x = 36, width = 523, rowH = 18, shade = false } = opts
  if (shade) page.drawRectangle({ x, y: y - 4, width, height: rowH + 2, color: LGREEN })
  page.drawText(label, { x: x + 4, y, size: 8, font: fonts.bold, color: GRAY })
  page.drawText(String(value || '—'), { x: x + 160, y, size: 8, font: fonts.regular, color: DGRAY })
}

// ── Draw section header bar ────────────────────────────────────────────────────
function drawSectionHeader(page, fonts, y, title, pageWidth) {
  page.drawRectangle({ x: 36, y: y - 3, width: pageWidth - 72, height: 18, color: GREEN })
  page.drawText(title, { x: 42, y: y + 1, size: 8.5, font: fonts.bold, color: WHITE })
  return y - 22
}

// ── Main PDF generator ─────────────────────────────────────────────────────────
export async function generateApplicationPDF(formData, paymentId, uploadedFiles) {
  const pdfDoc = await PDFDocument.create()
  const boldFont    = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fonts = { bold: boldFont, regular: regularFont }

  // ── Page 1: Application Form ────────────────────────────────────────────────
  const page = pdfDoc.addPage([595, 842]) // A4
  const { width, height } = page.getSize()

  // ── Header ──
  page.drawRectangle({ x: 0, y: height - 70, width, height: 70, color: GREEN })
  page.drawText('RURAL WELFARE PROGRAM', {
    x: 36, y: height - 30, size: 16, font: boldFont, color: WHITE,
  })
  page.drawText('Application Form', {
    x: 36, y: height - 48, size: 10, font: regularFont, color: YELLOW,
  })
  page.drawRectangle({ x: 0, y: height - 76, width, height: 6, color: YELLOW })

  // ── Post + Registration row ──
  let y = height - 94
  page.drawRectangle({ x: 36, y: y - 3, width: width - 72, height: 18, color: LGREEN })
  page.drawText('Post', { x: 40, y, size: 8, font: boldFont, color: GRAY })
  page.drawText(formData.postTitle.toUpperCase(), { x: 130, y, size: 8, font: boldFont, color: GREEN })
  page.drawText('Registration No.', { x: 330, y, size: 8, font: boldFont, color: GRAY })
  page.drawText(String(formData.registrationNo || paymentId.slice(-10).toUpperCase()), {
    x: 430, y, size: 8, font: boldFont, color: GREEN,
  })

  // ── Photo & Signature (top-right of form) ──
  const photoX = width - 100
  const photoY = height - 185

  // Photo box
  page.drawRectangle({ x: photoX, y: photoY, width: 65, height: 80, color: LGREEN,
    borderColor: GREEN, borderWidth: 1 })

  if (uploadedFiles.photo) {
    try {
      const photoImg = await embedImage(pdfDoc, uploadedFiles.photo.buffer, uploadedFiles.photo.mimetype)
      page.drawImage(photoImg, { x: photoX, y: photoY, width: 65, height: 80 })
    } catch (_) {
      page.drawText('Photo', { x: photoX + 12, y: photoY + 35, size: 8, font: regularFont, color: GRAY })
    }
  } else {
    page.drawText('Photo', { x: photoX + 12, y: photoY + 35, size: 8, font: regularFont, color: GRAY })
  }

  // Signature box
  const sigY = photoY - 50
  page.drawRectangle({ x: photoX, y: sigY, width: 65, height: 38, color: WHITE,
    borderColor: GREEN, borderWidth: 1 })

  if (uploadedFiles.signature) {
    try {
      const sigImg = await embedImage(pdfDoc, uploadedFiles.signature.buffer, uploadedFiles.signature.mimetype)
      page.drawImage(sigImg, { x: photoX + 2, y: sigY + 2, width: 61, height: 34 })
    } catch (_) {
      page.drawText('Signature', { x: photoX + 6, y: sigY + 14, size: 7, font: regularFont, color: GRAY })
    }
  } else {
    page.drawText('Signature', { x: photoX + 6, y: sigY + 14, size: 7, font: regularFont, color: GRAY })
  }

  page.drawText('Photo', { x: photoX + 18, y: photoY - 10, size: 7, font: regularFont, color: GRAY })
  page.drawText('Signature', { x: photoX + 10, y: sigY - 10, size: 7, font: regularFont, color: GRAY })

  // ── Personal details section ──
  y = height - 116
  const contentWidth = width - 72 - 80  // leave room for photo

  const personalRows = [
    ["Student's Name", formData.name, "Father's Name", formData.fatherName],
    ["Mother's Name", formData.motherName, 'DOB', formData.dob],
    ['Gender', formData.gender, 'Category', formData.category],
    ['Aadhaar Number', formData.aadhar, 'Nationality', 'INDIAN'],
    ['Email Id', formData.email, 'Mobile', formData.mobile],
    ['Registration Date', new Date().toLocaleDateString('en-IN'), 'Status', 'SUCCESS'],
  ]

  for (let i = 0; i < personalRows.length; i++) {
    const [l1, v1, l2, v2] = personalRows[i]
    const shade = i % 2 === 0
    if (shade) page.drawRectangle({ x: 36, y: y - 3, width: contentWidth, height: 16, color: LGREEN })

    page.drawText(l1, { x: 40, y, size: 7.5, font: boldFont, color: GRAY })
    page.drawText(String(v1 || '—').toUpperCase(), { x: 130, y, size: 7.5, font: regularFont, color: DGRAY })
    page.drawText(l2, { x: 270, y, size: 7.5, font: boldFont, color: GRAY })
    page.drawText(String(v2 || '—').toUpperCase(), { x: 360, y, size: 7.5, font: regularFont, color: DGRAY })
    y -= 16
  }

  // Address
  page.drawRectangle({ x: 36, y: y - 3, width: contentWidth, height: 16, color: LGREEN })
  page.drawText('Address', { x: 40, y, size: 7.5, font: boldFont, color: GRAY })
  page.drawText(String(formData.address || '—').substring(0, 60), { x: 130, y, size: 7.5, font: regularFont, color: DGRAY })
  y -= 20

  // ── Education Eligibility ──
  y = drawSectionHeader(page, fonts, y, 'Education Eligibility', width)

  // Table header
  const eduCols = [
    { label: 'Sr', x: 38, w: 16 },
    { label: 'Class', x: 54, w: 52 },
    { label: 'Roll/Enroll', x: 106, w: 58 },
    { label: 'College', x: 164, w: 130 },
    { label: 'Board/Uni', x: 294, w: 54 },
    { label: 'Year', x: 348, w: 28 },
    { label: 'Total Mark', x: 376, w: 46 },
    { label: 'Obtain Mark', x: 422, w: 46 },
    { label: 'Per', x: 468, w: 36 },
  ]

  page.drawRectangle({ x: 36, y: y - 3, width: width - 72, height: 14, color: rgb(0.2, 0.45, 0.25) })
  eduCols.forEach(({ label, x }) => {
    page.drawText(label, { x, y: y + 1, size: 6.5, font: boldFont, color: WHITE })
  })
  y -= 16

  const education = JSON.parse(formData.education || '[]')
  education.forEach((row, i) => {
    if (row.class === 'Graduation' && !row.college && !row.year) {
      // empty graduation row — still render
    }
    const shade = i % 2 === 0
    if (shade) page.drawRectangle({ x: 36, y: y - 3, width: width - 72, height: 14, color: LGREEN })

    const rowData = [
      String(i + 1),
      row.class,
      row.rollEnroll || '',
      (row.college || '').substring(0, 22),
      row.board || '',
      row.year || '',
      row.totalMarks || '',
      row.obtainMarks || '',
      row.percentage ? `${row.percentage}%` : '',
    ]
    eduCols.forEach(({ x }, ci) => {
      page.drawText(rowData[ci], { x, y, size: 6.5, font: regularFont, color: DGRAY })
    })
    y -= 14
  })
  y -= 8

  // ── Payment Status ──
  y = drawSectionHeader(page, fonts, y, 'Payment Status', width)

  const payRows = [
    ['Payment Id', paymentId],
    ['Amount', formData.category === 'General' ? '1100 Rs.' : '1000 Rs.'],
    ['Payment Date Time', new Date().toLocaleString('en-IN')],
    ['Payment Status', 'Success'],
  ]
  payRows.forEach(([label, value], i) => {
    const shade = i % 2 === 0
    if (shade) page.drawRectangle({ x: 36, y: y - 3, width: width - 72, height: 16, color: LGREEN })
    page.drawText(label, { x: 100, y, size: 8, font: boldFont, color: GRAY })
    page.drawText(String(value), { x: 310, y, size: 8, font: regularFont, color: DGRAY })
    y -= 16
  })
  y -= 8

  // ── Student Address ──
  y = drawSectionHeader(page, fonts, y, 'Student Address / Permanent Address', width)
  const halfW = (width - 72) / 2
  page.drawText(formData.address || '—', {
    x: 40, y, size: 7.5, font: regularFont, color: DGRAY, maxWidth: halfW - 10,
  })
  page.drawText(formData.address || '—', {
    x: 40 + halfW, y, size: 7.5, font: regularFont, color: DGRAY, maxWidth: halfW - 10,
  })
  y -= 36

  // ── Barcode + Photo + Signature row ──
  y = Math.min(y, 160)
  page.drawRectangle({ x: 36, y: y - 3, width: width - 72, height: 14, color: GREEN })
  page.drawText('Barcode', { x: 100, y: y + 1, size: 8, font: boldFont, color: WHITE })
  page.drawText('Photo', { x: 300, y: y + 1, size: 8, font: boldFont, color: WHITE })
  page.drawText('Signature', { x: 460, y: y + 1, size: 8, font: boldFont, color: WHITE })

  // Barcode placeholder (registration number as text QR-style box)
  page.drawRectangle({ x: 48, y: y - 55, width: 55, height: 45, borderColor: GRAY, borderWidth: 0.5, color: WHITE })
  page.drawText(String(formData.registrationNo || '').substring(0, 10), {
    x: 50, y: y - 38, size: 6, font: regularFont, color: BLACK,
  })

  // Footer
  page.drawRectangle({ x: 0, y: 0, width, height: 38, color: GREEN })
  page.drawText(
    'I declare that I have registered after knowing and reading this thoroughly. If I wish to work on this in future I file a case, it will not be accepted if I take any kind of legal action.',
    { x: 36, y: 22, size: 6.5, font: regularFont, color: rgb(0.8, 0.95, 0.8), maxWidth: width - 72 }
  )
  page.drawText(`Generated: ${new Date().toLocaleString('en-IN')}`, {
    x: 36, y: 8, size: 6, font: regularFont, color: rgb(0.6, 0.8, 0.6),
  })

  // ── Page 2+: Attached Documents ─────────────────────────────────────────────
  const docFiles = [
    { key: 'aadharDoc', label: 'Aadhar Card' },
    { key: 'qualificationDoc', label: 'Qualification Certificate' },
    { key: 'additionalDoc', label: 'Additional Document' },
  ]

  for (const { key, label } of docFiles) {
    const file = uploadedFiles[key]
    if (!file) continue

    const docPage = pdfDoc.addPage([595, 842])

    // Page header
    docPage.drawRectangle({ x: 0, y: 842 - 45, width: 595, height: 45, color: GREEN })
    docPage.drawText('RURAL WELFARE PROGRAM', { x: 36, y: 842 - 20, size: 12, font: boldFont, color: WHITE })
    docPage.drawText(`Attached Document: ${label}`, { x: 36, y: 842 - 36, size: 9, font: regularFont, color: YELLOW })
    docPage.drawRectangle({ x: 0, y: 842 - 51, width: 595, height: 6, color: YELLOW })

    const docY = 842 - 60

    if (file.mimetype === 'application/pdf') {
      // Embed PDF pages
      try {
        const embeddedPdf = await PDFDocument.load(file.buffer)
        const copiedPages = await pdfDoc.copyPages(embeddedPdf, embeddedPdf.getPageIndices())
        // Remove the header page we just made and replace with actual PDF pages
        pdfDoc.removePage(pdfDoc.getPageCount() - 1)
        copiedPages.forEach((p) => pdfDoc.addPage(p))
      } catch (e) {
        docPage.drawText('Unable to embed PDF document.', { x: 36, y: docY - 20, size: 10, font: regularFont, color: GRAY })
      }
    } else {
      // Embed image
      try {
        const img = await embedImage(pdfDoc, file.buffer, file.mimetype)
        const imgDims = img.scaleToFit(523, 700)
        docPage.drawImage(img, {
          x: (595 - imgDims.width) / 2,
          y: docY - imgDims.height,
          width: imgDims.width,
          height: imgDims.height,
        })
      } catch (e) {
        docPage.drawText('Unable to embed image.', { x: 36, y: docY - 20, size: 10, font: regularFont, color: GRAY })
      }
    }
  }

  return await pdfDoc.save()
}