import { createWord, deleteWord, fetchWords } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
      toast.success('Added successfully.');
    },
    onError: () => {
      toast.error('Adding failed. Please try again.');
    },
  });

  const { mutate: removeWord, isPending: isRemovingWord } = useMutation({
    mutationFn: deleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
      toast.success('Removed successfully.');
    },
    onError: () => {
      toast.error('Removing failed. Please try again.');
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
