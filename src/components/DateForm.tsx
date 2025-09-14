import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Tipos
type FormData = {
  day: number;
  month: number;
  year: number;
};

interface DateFormProps {
  validationSchema: any;
  onSubmitCalculation: (data: FormData) => { val1: number; val2: number; val3: number };
  title: string;
  resultLabels: { part1: string; part2: string; part3: string };
}

// Componente de Input interno
const DateInput: React.FC<{
  label: string;
  placeholder: string;
  name: keyof FormData;
  register: any;
  error?: string;
}> = ({ label, placeholder, name, register, error }) => {
  const labelColor = error ? 'text-red-500' : 'text-gray-500';
  const borderColor = error ? 'border-red-500' : 'border-gray-300 focus:border-purple-600';

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className={`text-xs font-bold tracking-[0.2em] uppercase ${labelColor}`}>
        {label}
      </label>
      <input
        id={name}
        type="number"
        placeholder={placeholder}
        {...register(name)}
        className={`p-3 border rounded-lg text-xl lg:text-2xl font-bold w-full focus:outline-none transition-colors ${borderColor}`}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default function DateForm({ validationSchema, onSubmitCalculation, title, resultLabels }: DateFormProps) {
  const [result, setResult] = useState<{ val1: number; val2: number; val3: number } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const handleFormSubmit = useCallback((data: FormData) => {
    const calculationResult = onSubmitCalculation(data);
    setResult(calculationResult);
  }, [onSubmitCalculation]);

  return (
    <div className="bg-white rounded-3xl rounded-br-[100px] lg:rounded-br-[150px] p-6 lg:p-10 shadow-lg max-w-lg w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="flex gap-4 lg:gap-6 w-full max-w-md">
          <DateInput label="Day" placeholder="DD" name="day" register={register} error={errors.day?.message as string} />
          <DateInput label="Month" placeholder="MM" name="month" register={register} error={errors.month?.message as string} />
          <DateInput label="Year" placeholder="YYYY" name="year" register={register} error={errors.year?.message as string} />
        </div>

        <div className="flex items-center justify-center lg:justify-end my-8 relative">
          <hr className="w-full border-t-2 border-gray-200" />
          <button type="submit" aria-label="Calcular" className="bg-purple-600 hover:bg-black transition-colors rounded-full p-4 lg:p-5 absolute">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" className="w-6 h-6 lg:w-10 lg:h-10">
              <g fill="none" stroke="#FFF" strokeWidth="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" /></g>
            </svg>
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <p className="text-5xl lg:text-7xl font-extrabold italic">
          <span className="text-purple-600">{result ? result.val1 : '--'}</span> {resultLabels.part1}
        </p>
        <p className="text-5xl lg:text-7xl font-extrabold italic">
          <span className="text-purple-600">{result ? result.val2 : '--'}</span> {resultLabels.part2}
        </p>
        <p className="text-5xl lg:text-7xl font-extrabold italic">
          <span className="text-purple-600">{result ? result.val3 : '--'}</span> {resultLabels.part3}
        </p>
      </div>
    </div>
  );
}
