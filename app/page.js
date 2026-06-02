import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import PortalGrid from '@/components/PortalGrid/PortalGrid'
import ServicosQuick from '@/components/ServicosQuick/ServicosQuick'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <PortalGrid />
      <ServicosQuick />
      <Footer />
    </main>
  )
}
