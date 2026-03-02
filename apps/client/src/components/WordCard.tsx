import type { Word } from '@repo/schema';

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word }: WordCardProps) => {
  return (
    <div className='group bg-white shadow-sm hover:shadow-md p-6 border border-slate-100 rounded-2xl transition-shadow cursor-pointer'>
      <h2 className='mb-2 font-bold text-blue-600 group-hover:text-blue-700 text-2xl'>
        {word.term}
      </h2>
      <p>{word.definition}</p>
    </div>
  );
};
