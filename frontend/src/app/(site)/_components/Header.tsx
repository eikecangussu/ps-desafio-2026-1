import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css'
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerLinks}>
          <Link href="#produtos" className={styles.headerLink}>
            Produtos
          </Link>
          <Link href="#categorias" className={styles.headerLink}>
            Categorias
          </Link>
        </div>
        <Link href="/" className={styles.headerLogo}>
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={150}
            height={150}
          />
        </Link>
        <div className={styles.headerLinks}>
          <Link href="#footer" className={styles.headerLink}>
            Sobre Nós
          </Link>
          <Link href="#footer" className={styles.headerLink}>
            Contato
          </Link>
        </div>
      </div>
    </header>
  )
}
