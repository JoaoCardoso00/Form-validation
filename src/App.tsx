import { useState } from "react";
import InputMask from "react-input-mask";
import z from "zod";

type sex = "Masculino" | "Feminino" | "Outro" | "";

const validationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome não informado, por favor insira seu nome" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "Email não informado, por favor insira seu Email" }),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .min(1, { message: "CPF não informado, por favor insira seu CPF" }),
  cellphone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/)
    .min(1, {
      message: "Telefone não informado, por favor insira o seu telefone",
    }),
  sex: z
    .string()
    .min(1, { message: "Sexo não informado, por favor insira o seu sexo" }),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
});

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [sex, setSex] = useState<sex>("");
  const [birthDate, setBirthDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name,
      email,
      cpf,
      cellphone,
      sex,
      birthDate,
    };

    const isValid = validationSchema.safeParse(data);

    if (!isValid.success) {
      isValid.error.errors.map((error) => {
        console.debug(error.message);
      });

      return;
    }

    console.debug(data);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="max-w-6xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        onSubmit={handleSubmit}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="cellphone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CPF
              </label>
              <div className="mt-2">
                <InputMask
                  mask="999.999.999-99"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="cellphone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone
              </label>
              <div className="mt-2">
                <InputMask
                  mask="(99) 99999-9999"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={cellphone}
                  onChange={(e) => setCellphone(e.target.value)}
                />
              </div>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nascimento
              </label>
              <div className="mt-2">
                <InputMask
                  mask="99/99/9999"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="sex"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sexo
              </label>
              <div className="mt-2">
                <select
                  id="sex"
                  name="sex"
                  autoComplete="sex"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={sex as string}
                  onChange={(e) => setSex(e.target.value as sex)}
                >
                  <option value="" disabled hidden></option>

                  <option>Masculino</option>
                  <option>Feminino</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
