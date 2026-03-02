import { useState } from 'react';

import { createWord } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const WordForm = () => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
      setTerm('');
      setDefinition('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!term.trim() || !definition.trim()) {
      return;
    }

    mutation.mutate({ term, definition });
  };

  return (
    <form
      className='bg-white shadow-sm mb-8 p-6 border border-slate-100 rounded-2xl w-full max-w-2xl'
      onSubmit={handleSubmit}
    >
      <div className='flex sm:flex-row flex-col gap-4'>
        <input
          className='flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          onChange={(e) => setTerm(e.target.value)}
          placeholder='예: Apple'
          type='text'
          value={term}
        />

        <input
          className='flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
          onChange={(e) => setDefinition(e.target.value)}
          placeholder='예: 사과'
          type='text'
          value={definition}
        />
        <button
          className='bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 px-6 py-3 rounded-xl font-bold text-white transition-colors'
          disabled={mutation.isPending}
          type='submit'
        >
          {mutation.isPending ? '추가 중...' : '추가하기'}
        </button>
      </div>
    </form>
  );
};
