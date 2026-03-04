import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type ActionType = 'DELETE' | 'POST' | 'PUT';

export const useMutationFeedback = (actionType: ActionType, queryKey: string[]) => {
  const queryClient = useQueryClient();

  const getMessages = () => {
    switch (actionType) {
      case 'DELETE':
        return {
          success: `Removed successfully.`,
          error: `Removing failed. Please try again.`,
        };
      case 'POST':
        return {
          success: `Added successfully.`,
          error: `Adding failed. Please try again.`,
        };
      case 'PUT':
        return {
          success: `Edited successfully.`,
          error: `Editing failed. Please try again.`,
        };
    }
  };

  const message = getMessages();

  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(message.success);
    },
    onError: () => {
      toast.error(message.error);
    },
  };
};
