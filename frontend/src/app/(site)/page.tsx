import Footer from './_components/Footer'
import Articles from './_components/Articles'
import Banner from './_components/Banner'
import CategoryShowcase from './_components/categoryShowcase'
import Header from './_components/Header'
import PromoBar from './_components/PromoBar'

export default async function Home() {
  return (
    <div>
      <PromoBar />
      <Header />
      <Banner />
      <CategoryShowcase />
      <Articles />
      <Footer />
    </div>
  )
}
