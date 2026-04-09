'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import ArticleCard from './ArticleCard'
import styles from './categoryShowcase.module.css'

import { articleType } from '@/types/article'
import { api } from '@/services/api'

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('Tênis')

  const [allArticles, setAllArticles] = useState<articleType[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api('GET', '/articles')
        console.log('Resposta da API:', response)
        if (response) {
          setAllArticles(response.response as articleType[])
        }
      } catch (error) {
        console.error('Erro ao buscar artigos:', error)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles =
    allArticles?.filter(
      (article) => article.category?.name === activeCategory,
    ) || []

  return (
    <section className={styles.showcaseSection} id="categorias">
      <h2 className={styles.title}>Explore por Categoria</h2>

      {/* Botão Triplo */}
      <div className={styles.toggleContainer}>
        <button
          onClick={() => setActiveCategory('Tênis')}
          className={`${styles.toggleBtn} ${activeCategory === 'Tênis' ? styles.active : ''}`}
        >
          Tênis
        </button>
        <button
          onClick={() => setActiveCategory('Camisetas')}
          className={`${styles.toggleBtn} ${activeCategory === 'Camisetas' ? styles.active : ''}`}
        >
          Camisetas
        </button>
        <button
          onClick={() => setActiveCategory('Bonés')}
          className={`${styles.toggleBtn} ${activeCategory === 'Bonés' ? styles.active : ''}`}
        >
          Bonés
        </button>
      </div>

      <div className={styles.carouselContainer}>
        {allArticles.length > 0 ? (
          <Swiper
            className={styles.swiperContainer}
            key={activeCategory}
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            loop={filteredArticles.length > 1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {filteredArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard {...article} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>
            <p>...</p>
          </div>
        )}
      </div>
    </section>
  )
}
