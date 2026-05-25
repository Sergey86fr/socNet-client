import { Input } from "@/components/ui/input"
import { useRegisterMutation } from "@/app/services/userApi"
import { registerSchema, type RegisterFormData } from "./register.types"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"


type RegisterProps = {
  onSwitchToLogin: () => void
}

type ApiError = {
  data?: {
    error?: string
    message?: string
  }
  status?: number
}

const Register = ({ onSwitchToLogin }: RegisterProps) => {
  const [register, { isLoading }] = useRegisterMutation()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register({
        email: data.email,
        name: data.name,
        password: data.password,
      }).unwrap()

      toast.success("Учетная заптсь успешно создана!")
      form.reset()
      onSwitchToLogin()
    } catch (err) {
      console.error("Ошибка регистрации!:", err)

      const apiError = err as ApiError

      const errorMessage = apiError.data?.error ?? "Registration failed"


      toast.error("Ошибка!", {
        description: errorMessage,
      })
    }
  }

  return (
    <Card className="w-full min-h-130 h-full flex flex-col">
      <CardHeader>
       
        <CardTitle>Зарегистрируйтесь в своей учетной записи</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-register"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={
            form.handleSubmit(onSubmit)
          }
        >
          <FieldGroup>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Имя</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">Пароль</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="confirmPassword">
                        Подтвердите пароль
                      </FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
             
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-auto">

          <Button form="form-register"  variant="outline" type="submit" className="w-full mt-5 mb-5" disabled={isLoading}>
            {isLoading ? "Создание аккаунта..." : "Зарегистрироваться"}
          </Button>
      </CardFooter>
    </Card>
  )
}

export default Register
