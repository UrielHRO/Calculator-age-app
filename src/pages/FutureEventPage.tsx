import { z } from 'zod';
import { intervalToDuration, isValid, isAfter, startOfDay } from 'date-fns';
import DateForm from '../components/DateForm';

const futureEventValidationSchema = z.object({
  day: z.coerce.number().refine(val => !isNaN(val), { message: "Obrigatório" })
          .min(1, "Dia inválido")
          .max(31, "Dia inválido"),
  month: z.coerce.number().refine(val => !isNaN(val), { message: "Obrigatório" })
          .min(1, "Mês inválido")
          .max(12, "Mês inválido"),
  year: z.coerce.number().refine(val => !isNaN(val), { message: "Obrigatório" })
          .min(new Date().getFullYear(), "Deve ser no futuro"),
}).superRefine((data, ctx) => {
  const date = startOfDay(new Date(data.year, data.month - 1, data.day));
  const todayStart = startOfDay(new Date());

  if (!isValid(date) || date.getDate() !== data.day) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Data inválida', path: ['day'] });
  } else if (!isAfter(date, todayStart)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Deve ser no futuro', path: ['year'] });
  }
});

type FutureEventFormData = z.infer<typeof futureEventValidationSchema>;

export default function FutureEventPage() {
  const calculateTimeToEvent = (data: FutureEventFormData) => {
    const eventDate = startOfDay(new Date(data.year, data.month - 1, data.day));
    const today = startOfDay(new Date());

    const duration = intervalToDuration({ start: today, end: eventDate });

    return {
      val1: duration.years || 0,
      val2: duration.months || 0,
      val3: duration.days || 0
    };
  };

  return (
    <DateForm
      validationSchema={futureEventValidationSchema}
      onSubmitCalculation={calculateTimeToEvent}
      title="Contagem Regressiva para Evento"
      resultLabels={{ part1: 'anos', part2: 'meses', part3: 'dias' }}
    />
  );
}
