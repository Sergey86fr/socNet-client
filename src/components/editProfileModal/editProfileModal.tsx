
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Controller, useForm } from "react-hook-form"
import Modal from "../ui/modal"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { User } from "@/app/types"
import { Field, FieldLabel, FieldError } from "../ui/field"
import {  useUpdateUserMutation } from "@/app/services/userApi"
import { useState } from "react"
import { toast } from "sonner"
import { formatDateForInput } from "@/utils/format-to-input-date"



type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user? : User;
    id: string| undefined;
}

const EditProfileModal = ({isOpen, onClose, user, id}: ModalProps) => {
       const [selectedFile, setSelectedFile] = useState<File | null>(null)
      const [updateUser] = useUpdateUserMutation()

    const form = useForm<User>({
        mode:'onChange',
        reValidateMode:'onBlur',
        defaultValues: {
          email: user?.email,
          name: user?.name,
          dateOfBirth: user?.dateOfBirth,
          bio: user?.bio,
          location: user?.location
        }
    })

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }

 

    const onSubmit =  async(data:User) => {
      if(!id) return
      try {
        const formData = new FormData()
             if (data.email) formData.append('email', data.email)
            if (data.name) formData.append('name', data.name)
            if (data.dateOfBirth) formData.append('dateOfBirth', new Date(data.dateOfBirth).toISOString())
            if (data.bio) formData.append('bio', data.bio)
            if (data.location) formData.append('location', data.location)
            if (selectedFile) formData.append('avatar', selectedFile)

            await updateUser({ userData: formData, id }).unwrap()
    
            toast.success("Профиль успешно обновлён!")
            onClose()
            form.reset()
      } catch (error) {
        console.log(error);
        
      }
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактировать профиль" >
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller name="email" control={form.control}
            render={({field, fieldState}) => (
                 <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
            )}
            />

            <Controller name="name" control={form.control}
            render={({field, fieldState}) => (
                 <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Имя</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
            )}
            />

            {/* <Controller name="avatarUrl" control={form.control}
            render={({field, fieldState}) => (
                 <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="avatarUrl">Выберите изображение</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
            )}
            /> */}

             <div>
                    <FieldLabel htmlFor="avatar">Аватар</FieldLabel>
                    <Input 
                        id="avatar"
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {user?.avatarUrl && (
                        <p className="text-sm text-gray-500 mt-1">
                            Текущий аватар: {user.avatarUrl.split('/').pop()}
                        </p>
                    )}
                </div>

            <Controller name="dateOfBirth" control={form.control}
            render={({field, fieldState}) => (
                 <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="dateOfBirth">Дата рождения</FieldLabel>
                      <Input  onChange={(e) => field.onChange(e.target.value)} value={formatDateForInput(field.value)}  type="date" id="dateOfBirth" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
            )}
            />
            <Controller name="bio" control={form.control}
            render={({field, fieldState}) => (
                 <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bio">О себе</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
            )}
            />
            <Controller name="location" control={form.control}
            render={({field, fieldState}) => (
                 <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="location">Местоположение</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
            )}
            />

            <Button className="mt-5" variant='outline' type="submit">Сохранить данные</Button>

        </form>
    </Modal>
  )
}

export default EditProfileModal