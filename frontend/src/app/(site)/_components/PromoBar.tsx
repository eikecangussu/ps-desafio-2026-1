import styles from './promoBar.module.css'

export default function PromoBar() {
  return (
    <div className={styles.promoBar}>
      <p>
        Frete grátis em compras acima de <strong>R$ 299,00</strong>!
      </p>
    </div>
  )
}
