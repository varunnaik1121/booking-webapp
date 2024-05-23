import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AppContext';
const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      //ShowToast
      showToast({ message: 'Signed Out!', type: 'SUCCESS' });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
      //show toast
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
      onClick={handleClick}
    >
      SignOutButton
    </button>
  );
};

export default SignOutButton;
