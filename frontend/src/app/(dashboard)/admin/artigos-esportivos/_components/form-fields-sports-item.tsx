'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { articleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsArticleProps {
  article?: articleType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportsItem({
  article,
  readOnly,
  error,
}: FormFieldsArticleProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    article?.category ?? null,
  )

  useEffect(() => {
    async function getCategories() {
      const { response, error } = await api('GET', '/category')
      if (response) {
        setCategories(response as CategoryType[])
      } else {
        console.error(error?.message)
      }
    }

    getCategories()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {article && (
          <Input defaultValue={article.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="image" required={!article}>
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || article?.image}
          />
        </FormField>
        <FormField>
          <Label htmlFor="name" required={!article}>
            {' '}
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do artigo esportivo"
            defaultValue={article?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="brand" required={!article}>
            {' '}
            Marca
          </Label>
          <Input
            name="brand"
            id="brand"
            placeholder="Insira a marca do artigo esportivo"
            defaultValue={article?.brand}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.brand}
          />
        </FormField>
        <FormField>
          <Label htmlFor="year" required={!article}>
            {' '}
            Ano
          </Label>
          <Input
            name="year"
            id="year"
            maxLength={4}
            placeholder="Insira o ano do artigo esportivo"
            defaultValue={article?.year}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.year}
            type="number"
            step="1"
            min="1850"
            max="2026"
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!article}>
            {' '}
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira o preço do artigo esportivo"
            defaultValue={article?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
          />
        </FormField>
        <FormField>
          <Label htmlFor="category" required={!article}>
            {' '}
            Categoria
          </Label>
          <Input
            name="category_id"
            id="category_id"
            type="hidden"
            value={selectedCategory?.id}
          />
          <Select
            value={selectedCategory?.id}
            onValueChange={(value) =>
              setSelectedCategory(
                categories.find((category) => category.id === value) || null,
              )
            }
            disabled={pending || readOnly}
          >
            <SelectTrigger id="category_id_select" className="col-span-3">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.errors?.category_id && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="amount" required={!article}>
            {' '}
            Quantidade
          </Label>
          <Input
            name="amount"
            id="amount"
            placeholder="Insira a quantidade do artigo esportivo"
            defaultValue={article?.amount}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.amount}
            type="number"
            min="0"
            inputMode="numeric"
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
