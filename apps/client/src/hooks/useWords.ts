import { createWord, deleteWord, fetchWords } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useWords = () => {
  const queryClient = useQueryClient();

  const {
    data: words,
    isLoading: isWordsLoading,
    isError: isWordsError,
    error: wordsError,
  } = useQuery({
    queryFn: fetchWords,
    queryKey: ['words'],
  });

  const { mutate: addWord, isPending: isAddingWord } = useMutation({
    mutationFn: createWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
    },
  });

  const { mutate: removeWord, isPending: isRemovingWord } = useMutation({
    mutationFn: deleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
    },
  });

  return {
    words,
    isWordsLoading,
    isWordsError,
    wordsError,

    addWord,
    isAddingWord,

    removeWord,
    isRemovingWord,
  };
};
