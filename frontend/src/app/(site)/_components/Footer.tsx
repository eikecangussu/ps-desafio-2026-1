import styles from './footer.module.css'

export default function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.title}>Retro Sports Club</h3>
          <p className={styles.text}>
            Sua loja definitiva para artigos esportivos clássicos. Reviva os
            grandes momentos.
          </p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>Atendimento</h3>
          <p className={styles.text}>Email: contato@retrosports.com</p>
          <p className={styles.text}>WhatsApp: (27) 99999-1992</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {anoAtual} Retro Sports Club. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
