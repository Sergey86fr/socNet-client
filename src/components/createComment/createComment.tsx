/* eslint-disable @typescript-eslint/no-misused-promises */

import { useCreateCommentMutation } from "@/app/services/commentsApi"
import { useLazyGetPostByIdQuery } from "@/app/services/postsApi"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Button } from "../ui/button"
import { Pen } from "lucide-react"

// type ApiError = {
//   data?: {
//     error?: string
//     message?: string
//   }
//   status?: number
// }

type CreateCommentFormData = {
  comment: string
}

const CreateComment = () => {
 
  const{id} = useParams<{id:string}>()
  const [createComment] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()

  const form = useForm<CreateCommentFormData>({
     defaultValues: {
    comment: "",
  }
  })

  const onSubmit = async(data:CreateCommentFormData) => {
     try {
          if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        form.setValue('comment', '');
        await getPostById(id).unwrap()
          }
     } catch (error) {
        console.log(error)
        
      }
     }
  

  return (
    <div className="w-full mt-8">
     
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
         name="comment" 
         control={form.control} 
         defaultValue=""
         rules={{
          required: "Поле не может быть пустым"
        }}
         render={({field}) => (
             <textarea 
             className="w-full border rounded-sm "
             {...field}
             placeholder="Напишите свой комментарий..."
              />

         )}
         />
          <Button className="mt-2" type="submit" >
            Ответить
            <Pen />
          </Button>
      </form>
    </div>
  )
}


export default CreateComment