import { generateApplicationPDF } from './utils/generatePDF.js'
import fs from 'fs'

const fakeData = {
  name: 'Priya Sharma',
  fatherName: 'Ramesh Sharma',
  motherName: 'Sunita Sharma',
  dob: '1998-05-15',
  mobile: '9876543210',
  email: 'priya@example.com',
  gender: 'Female',
  category: 'OBC',
  state: 'Uttar Pradesh',
  district: 'Prayagraj',
  address: 'Village Rampur, Post Naini, Prayagraj - 211008',
  qualification: 'Graduate',
  aadhar: '123456789012',
  postTitle: 'Assistant Health Worker',
  postLevel: 'Level 3',
  education: JSON.stringify([
    { class: '10th Class', rollEnroll: 'UP2014123', college: 'Govt Inter College', board: 'UP Board', year: '2014', totalMarks: '500', obtainMarks: '425', percentage: '85.00' },
    { class: '12th Class', rollEnroll: 'UP2016456', college: 'Govt Inter College', board: 'UP Board', year: '2016', totalMarks: '500', obtainMarks: '390', percentage: '78.00' },
    { class: 'Graduation', rollEnroll: 'AU2019789', college: 'Allahabad University', board: 'AU', year: '2019', totalMarks: '900', obtainMarks: '720', percentage: '80.00' },
  ]),
  registrationNo: '1234567890',
}

const pdfBytes = await generateApplicationPDF(fakeData, 'pay_TEST123456789', {
  photo: null,
  signature: null,
  aadharDoc: null,
  tenthDoc: null,
  twelfthDoc: null,
  graduationDoc: null,
})

fs.writeFileSync('test-output.pdf', pdfBytes)
console.log('PDF saved: test-output.pdf')