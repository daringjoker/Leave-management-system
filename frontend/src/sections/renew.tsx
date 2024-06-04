import motif from '../assets/img/motif.svg'
import { useState } from 'react';
import { SplitFrontPage } from '../sections/splitFrontPage';

export function Renew() {
  const [error, setError] = useState<string | null>("Invalid email or password");
  return (
    <div className="flex flex-col items-center justify-center h-full w-full flex-wrap">
      <div className="flex flex-col items-center justify-center w-6/12 h-6/12 text-2xl text-gray-700">
        <h1 className="text-4xl font-bold text-center">Reset Password</h1>
        {error && <div className="py-3 text-red-500 text-sm">{error}</div>}
        <form className="flex flex-col w-full" onSubmit={(e) => {
          e.preventDefault();
          setError(null);
        }}>
          <div className="flex flex-col my-3 w-full">
            <label className="pb-2" htmlFor="password">Password</label>
            <input className="border-gray-300 border rounded p-2 text-sm w-full" type="password" id="password" name="password" />
          </div>
          <div className="flex flex-col my-3 w-full">
            <label className="pb-2" htmlFor="password">Confirm Password</label>
            <input className="border-gray-300 border rounded p-2 text-sm w-full" type="password" id="password" name="password" />
          </div>
          <button className="w-full p-2 text-center bg-red-500 hover:bg-red-900 rounded-md  border-2 hover:text-white" type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
}
