import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/features/auth/login/login"
import Register from "@/features/auth/register/register"
import { useState } from "react"

const Auth = () => {
  const [selected, setSelected] = useState<"login" | "register">("login")
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardContent className="pt-6">
            <Tabs
              value={selected}
              onValueChange={value => {
                setSelected(value as "login" | "register")
              }}
              defaultValue="login"
            >
              <div className="flex justify-center mb-5">
                <TabsList className="w-full">
                  <TabsTrigger value="login">Войти</TabsTrigger>
                  <TabsTrigger value="register">Зарегистрироваться</TabsTrigger>
                </TabsList>
              </div>

              <div className="min-h-137.5">
                <TabsContent className="m-0" value="login">
                  <Login
                  />
                </TabsContent>

                <TabsContent className="m-0" value="register">
                  <Register
                    onSwitchToLogin={() => {
                      setSelected("login")
                    }}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth
