'use client'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlus, LuTrash } from 'react-icons/lu'
import { DialogUpdateSportsItem } from './dialog-update-sports-item'
import { DialogSportsItemDelete } from './dialog-delete-sports-item'
import { DialogInformationSportsItem } from './dialog-information-sports-item'
import { DialogCreateSportsItem } from './dialog-create-sports-item'
import { articleType } from '@/types/article'
import { useEffect, useState } from 'react'

export default function ListSportsItems() {
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

  if (!articles) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os imóveis.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateSportsItem>
          <Button size="sm">
            <LuPlus />
            Novo artigo esportivo
          </Button>
        </DialogCreateSportsItem>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Ano</TableHead>

              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles?.map((article: articleType) => (
              <TableRow key={article.id}>
                <TableCell>
                  <TabbleCellImage src={article.image} />
                </TableCell>

                <TableCell>{article.name}</TableCell>
                <TableCell>{article.amount}</TableCell>
                <TableCell>{article.category.name}</TableCell>
                <TableCell>R${article.price}</TableCell>
                <TableCell>{article.brand}</TableCell>
                <TableCell>{article.year}</TableCell>

                <TableCell className="flex justify-end gap-2">
                  <DialogInformationSportsItem id={article.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationSportsItem>
                  <DialogUpdateSportsItem id={article.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateSportsItem>
                  <DialogSportsItemDelete id={article.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogSportsItemDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!articles.length && (
            <TableCaption>Nenhum artigo esportivo encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
