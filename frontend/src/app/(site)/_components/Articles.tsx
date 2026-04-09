'use client'
import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'
import styles from './articles.module.css'
import { articleType } from '@/types/article'
import { api } from '@/services/api'

export default function Articles() {
  const [articles, setArticles] = useState<articleType[]>([])

  useEffect(() => {
    async function getArticles() {
      const { response, error } = await api('GET', '/articles')

      if (response) {
        setArticles(response as articleType[])
      } else {
        console.error(error?.message)
      }
    }

    getArticles()
  }, [])

  return (
    <section className={styles.articles} id="articles">
      <div className={styles.container}>
        <h1 className={styles.title} id="produtos">
          Nossos Produtos
        </h1>
        <div className={styles.articlesList}>
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  )
}
