import { z } from 'zod';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  add,
  isValid,
  isAfter,
  startOfDay
} from 'date-fns';
import DateForm from '../components/DateForm';

const ageValidationSchema = z.object({
  day: z.coerce.number({ invalid_type_error: "Obrigatório" }).min(1, "Dia inválido").max(31, "Dia inválido"),
  month: z.coerce.number({ invalid_type_error: "Obrigatório" }).min(1, "Mês inválido").max(12, "Mês inválido"),
  year: z.coerce.number({ invalid_type_error: "Obrigatório" }).max(new Date().getFullYear(), "Deve ser no passado").min(0,"não pode ano negativa"),
}).superRefine((data, ctx) => {
  const date = startOfDay(new Date(data.year, data.month - 1, data.day));
  if (!isValid(date) || date.getDate() !== data.day) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Data inválida', path: ['day'] });
    return;
  }
  const todayStart = startOfDay(new Date());
  if (isAfter(date, todayStart)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Deve ser no passado', path: ['year'] });
  }
});

type AgeFormData = z.infer<typeof ageValidationSchema>;

export default function AgeCalculatorPage() {
  const calculateAge = (data: AgeFormData) => {
    const birthDate = startOfDay(new Date(data.year, data.month - 1, data.day));
    const today = startOfDay(new Date());

    // anos completos
    const years = differenceInYears(today, birthDate);

    // meses completos desde o último aniversário
    const months = differenceInMonths(today, add(birthDate, { years }));

    // dias restantes desde o ano+mes mais recentes
    const days = differenceInDays(today, add(birthDate, { years, months }));

    return { val1: years, val2: months, val3: days };
  };

  return (
    <DateForm
      validationSchema={ageValidationSchema}
      onSubmitCalculation={calculateAge}
      title="Calculadora de Idade"
      resultLabels={{ part1: 'anos', part2: 'meses', part3: 'dias' }}
    />
  );
}
