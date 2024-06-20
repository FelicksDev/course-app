"use client";
import { Button, Input, Spacer } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function LoginForm({ children }) {
  const borderedType = "bordered";
  const [emailValue, setEmailValue] = useState("");
  const [isEmailValid, setEmailInvalid] = useState(false);
  const [isPasswordValid, setPasswordInvalid] = useState(false);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const redirectToSignup = () => {
    router.push("/signup");
  };

  const isInvalid = useMemo(() => {
    if (emailValue === "") return false;

    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { formValid, setFormValid } = useState(false);
  const supabase = createClientComponentClient();

  async function signInWithEmail() {
    if (emailValue || password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailValue,
        password: password,
        options: {
          emailRedirectTo: `http://localhost.com/`,
        },
      });
      router.refresh();
      router.push("/");
    } else {
      setPasswordInvalid(true);
      setEmailInvalid(true);
    }
    //console.log(data, error);
  }

  return (
    <div className="container mx-auto">
      <p as="h2" size="lg">
        {/* Iniciar sesión */}
      </p>

      <main className="max-w-sm mx-auto">
        <Input
          name="email"
          variant={borderedType}
          value={emailValue}
          type="email"
          label="Email"
          color={isInvalid ? "danger" : "success"}
          isInvalid={isEmailValid}
          errorMessage={isEmailValid && "El correo es invalido"}
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
          isRequired
          className="text-sm rounded-lg  block w-full p-2.5"
          placeholder="Correo"
        />
        <Input
          name="password"
          variant={borderedType}
          label="Contraseña"
          type="password"
          value={password}
          isInvalid={isPasswordValid}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
          isRequired
          errorMessage={isPasswordValid && "La contraseña es invalida"}
          className="text-sm rounded-lg  block w-full p-2.5"
          placeholder="Contraseña"
        />
        <Spacer y={3} />
        <Button
          className="mb-5 px-5 py-2.5  text-sm w-full text-center sm:w-auto"
          type="submit"
          onClick={signInWithEmail}
        >
          Iniciar sesión
        </Button>
        <Button
          className="mb-5 px-5 py-2.5  text-sm w-full text-center sm:w-auto"
          type="submit"
          onClick={redirectToSignup}
        >
          Registro
        </Button>

        {children}
      </main>
    </div>
  );
}

export default LoginForm;
