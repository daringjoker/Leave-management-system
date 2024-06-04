import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../services/authentication';

export function SignIn() {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
    const data = await login(email, password);

    if (data.error) {
      setError(data.error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full flex-wrap">
      <div className="flex flex-col items-center justify-center w-6/12 h-6/12 text-2xl text-gray-700">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        {error && <div className="py-3 text-red-500 text-sm">{error}</div>}
        <form className="flex flex-col w-full" onSubmit={onSubmit}>

          <div className="flex flex-col my-3 w-full">
            <label className="pb-2" htmlFor="email">Email</label>
            <input className="border-gray-300 border rounded p-2 text-sm w-full" type="email" id="email" name="email" />
          </div>

          <div className="flex flex-col my-3 w-full">
            <label className="pb-2" htmlFor="password">Password</label>
            <input className="border-gray-300 border rounded p-2 text-sm w-full" type="password" id="password" name="password" />
            <Link className="text-blue-500 hover:text-blue-900 text-sm self-end pt-2" to="/forgot-password">Forgot password?</Link>
          </div>
          <button className="w-full p-2 text-center bg-red-500 hover:bg-red-900 rounded-md  border-2 hover:text-white" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
