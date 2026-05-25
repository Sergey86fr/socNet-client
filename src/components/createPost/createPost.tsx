/* eslint-disable @typescript-eslint/no-misused-promises */

import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { ImageIcon, Pen, X } from "lucide-react"
import { useRef, useState } from "react"
import { useCreatePostMutation, useLazyGetAllPostsQuery } from "@/app/services/postsApi"
import { EmojiPicker } from "../emojiPicker/emojiPicker"

type ApiError = {
  data?: {
    error?: string
    message?: string
  }
  status?: number
}

type CreatePostFormData = {
  post: string
}

const CreatePost = () => {
  const [createPost, {isLoading}] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
    const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
   const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CreatePostFormData>({
     defaultValues: {
    post: "",
  }
  })


   const postValue = form.watch("post")


  

     const handleEmojiSelect = (emoji: string) => {
    const newContent = postValue + emoji
    form.setValue("post", newContent)
  }

   const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    
    if (files.length + selectedImages.length > 4) {
      toast.error("Можно загрузить не более 4 изображений")
      return
    }

    // Проверка размера файлов (макс 5MB)
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`Файл ${file.name} превышает 5MB`)
        return false
      }
      return true
    })

    setSelectedImages(prev => [...prev, ...validFiles])

      // Создаем превью
    const newPreviews = validFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    URL.revokeObjectURL(imagePreviews[index])
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }


  const onSubmit = async(data:CreatePostFormData) => {

    if (!data.post.trim() && selectedImages.length === 0) {
      toast.error("Напишите текст или добавьте изображение")
      return
    }

     try {

        const formData = new FormData()
      formData.append('content', data.post)
      
      selectedImages.forEach((image) => {
        formData.append('images', image)
      })


        await createPost(formData).unwrap()
        form.setValue('post', '')
      setSelectedImages([])

       // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
       imagePreviews.forEach(preview => URL.revokeObjectURL(preview))
      setImagePreviews([])
      
      
        await triggerAllPosts()
        toast.success("Пост успешно опубликован!")
     } catch (error) {
        console.log(error)
        const apiError = error as ApiError
         const errorMessage = apiError.data?.error ?? "Не удалось создать пост"

      //

      toast.error("Ошибка при создании поста!", {
        description: errorMessage,
      })
     }
  }


  return (
    <div className="w-full">
     
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
         <div className="relative">
        <Controller
         name="post" 
         control={form.control} 
         rules={{
              required: selectedImages.length === 0 ? "Напишите текст или добавьте изображение" : false
            }}
         render={({field}) => (
             <input 
             className="w-full border rounded-sm p-3"
             {...field}
             placeholder="Напишите свой пост..."
             onChange={(e) => {
                    field.onChange(e)
                  }}
              />

         )}
         />

            <div className="absolute right-2 bottom-2">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </div>
</div>



              {/* Превью изображений */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${String(index + 1)}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    removeImage(index)}}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}


          {/* Кнопки действий */}
        <div className="flex items-center justify-between mt-3">
          {/* Кнопка добавления изображения */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={selectedImages.length >= 4}
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            className="hidden"
            onChange={handleImageSelect}
          />


          <Button className="cursor-pointer" variant='outline' type="submit" disabled={isLoading || (!postValue.trim() && selectedImages.length === 0)} >
            Создать пост
            <Pen />
          </Button>
          </div>
          
      </form>
    </div>
  )
}

export default CreatePost

