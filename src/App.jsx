import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import Registration from './pages/Registration'
import ApplyFormPage from './pages/ApplyFormPage'
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-[#1a5c2a] mb-4">{title}</h1>
      <p className="text-gray-500">This page will be available soon.</p>
    </div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/apply" element={<ApplyFormPage />} />
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}