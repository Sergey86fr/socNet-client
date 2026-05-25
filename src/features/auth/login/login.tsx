
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { useLazyCurrentQuery, useLoginMutation } from "@/app/services/userApi"
import { loginSchema, type LoginFormData } from "./login.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"

// type LoginProps = {
//   onSwitchToRegister: () => void
// }

type ApiError = {
  data?: {
    error?: string
    message?: string
  }
  status?: number
}

const Login = () => {
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  
  const [ triggerCurrentQuery] = useLazyCurrentQuery()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap()
      await triggerCurrentQuery().unwrap();
      toast.success("Добро пожаловать!", {
        description: "Вы успешно вошли в  систему!",
      })
      form.reset()
      void navigate("/", { replace: true })
    } catch (err) {
      console.error("Ошибка входа:", err)

      const apiError = err as ApiError

      const errorMessage = apiError.data?.error ?? "Registration failed"

      //

      toast.error("Ошибка входа!", {
        description: errorMessage,
      })
    }
  }

  return (
    <Card className="w-full min-h-130 h-full flex flex-col">
      <CardHeader>
        <CardTitle>Войдите в свой аккаунт</CardTitle>
        <CardDescription>
          Введите свой адрес электронный почты ниже, чтобы войти в свой аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent >
        <form id="form-login" 
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="flex flex-col gap-8">
          
              
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
              
            
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col h-full mt-auto">
       
          <Button form="form-login"  variant="outline" type="submit" className="w-full mt-5 mb-5 " disabled={isLoading}>
            {isLoading ? "Вход в систему..." : "Войти"}
          </Button>
      </CardFooter>
    </Card>
  )
}

export default Login
