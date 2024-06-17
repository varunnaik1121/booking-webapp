import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in successful', type: 'SUCCESS' });
      navigate('/');
      await queryClient.invalidateQueries('validateToken');
    },
    onError: (error: Error) => {
      //show the toast
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('email', { required: 'email is required' })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email?.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register('password', {
            required: 'password is required',
            minLength: {
              value: 6,
              message: 'password must be atleast 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password?.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm ">
          Not Registered?{' '}
          <Link to={'/register'} className="text-blue-600 underline">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 font-bold hover:bg-blue"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
