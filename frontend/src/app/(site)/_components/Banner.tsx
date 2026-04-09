'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import styles from './banner.module.css'

export default function Banner() {
  return (
    <section className={styles.bannerContainer}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className={styles.slideContent}>
            <Image
              src="/assets/images/banner1.jpg"
              alt="Banner Principal 1"
              fill
              sizes="100vw"
              priority
              className={styles.bannerImage}
              style={{ objectPosition: 'center 75%' }}
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slideContent}>
            <Image
              src="/assets/images/banner2.jpg"
              alt="Banner Principal 2"
              fill
              sizes="100vw"
              className={styles.bannerImage}
              style={{ objectPosition: 'center 10%' }}
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slideContent}>
            <Image
              src="/assets/images/banner3.jpg"
              alt="Banner Principal 3"
              fill
              sizes="100vw"
              className={styles.bannerImage}
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
