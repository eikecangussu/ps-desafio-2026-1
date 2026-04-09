'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './articleCard.module.css'
import { articleType } from '@/types/article'
import { useState } from 'react'
import { purchaseArticle } from '@/actions/sportsItem'

export default function ArticleCard(article: articleType) {
  const [amount, setAmount] = useState(article.amount)
  const [buying, setBuying] = useState(false)

  const handlePurchase = async () => {
    if (amount <= 0) return
    setBuying(true)

    try {
      const response = await JSON.parse(await purchaseArticle(article.id))
      if (response) {
        setAmount((prevAmount) => prevAmount - 1)
        alert('Compra realizada com sucesso!')
      }
    } catch (error) {
      alert('Erro ao realizar a compra. Tente novamente.')
    } finally {
      setBuying(false)
    }
  }

  return (
    <div className={styles.articleCard}>
      <p className={styles.articleAmount}>{amount} em estoque</p>

      <div className={styles.imageContainer}>
        <Link href={`/article/${article.id}`}>
          <Image
            className={styles.articleImage}
            src={article.image || '/assets/images/produto-sem-foto.jpg'}
            alt="Article image"
            fill
            sizes="(max-width: 768px) 100vw"
          />
        </Link>
      </div>
      <div className={styles.infoWrapper}>
        <h1 className={styles.articleName}>{article.name}</h1>
        <p className={styles.articleCategory}>
          Categoria: {article.category.name}
        </p>
        <p className={styles.articleBrand}>Marca: {article.brand}</p>
        <p className={styles.articleYear}>Lançamento: {article.year}</p>
      </div>
      <div className={styles.below}>
        <p className={styles.articlePrice}>R${article.price.toFixed(2)}</p>
        {amount > 0 ? (
          <button
            className={styles.articleButton}
            onClick={handlePurchase}
            disabled={buying}
            style={{
              opacity: buying ? 0.7 : 1,
              cursor: buying ? 'wait' : 'pointer',
            }}
          >
            {buying ? 'Processando...' : 'Comprar'}
          </button>
        ) : (
          <button className={styles.articleButton2} disabled>
            Esgotado
          </button>
        )}
      </div>
    </div>
  )
}
