import { useEffect, useState } from 'react';
import { http } from '../utils/http';
import { Emptiness } from '../components/emptiness';
import AsyncSelect from 'react-select/async';

export interface ApplyLeaveProps {
  mode: 'EDIT' | 'CREATE';
  close: () => void;
  user?: any;
}

export function NewEmployee(props: ApplyLeaveProps) {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  useEffect(() => {
    const rolePromise = http.get('/roles/');
    const departmentPromise = http.get('/departments/');
    const countriesPromise = http.get('/countries/');
    Promise.all([rolePromise, departmentPromise, countriesPromise])
      .then(([{ data: roles }, { data: departments }, { data: countries }]) => {
        setRoles(roles);
        setDepartments(departments);
        setCountries(countries);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  async function fetchManagers(input: string) {
    const { data } = await http.get(`/users/search?q=${input}&role[]=Admin&role[]=Manager`)
    return data.map((item: any) => ({ value: item.id, label: item.name }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      countryId: formData.get('countryId') as string,
      departmentId: formData.get('departmentId') as string,
      roleId: formData.get('roleId') as string,
      managerId: formData.get('managerId') as string,
      designation: formData.get('designation') as string,
      password: formData.get('password') as string,
    };

    http.post('/users/', data)
      .then(() => {
        props.close?.();
      })
      .catch(console.error);
  }

  if (loading) {
    return <Emptiness data={loading} message="Loading..." subMessage="Please wait while we load the data" />;
  }
  const makeOptions = (data: any[]) => data.map((item, index) => <option key={index} value={item.id}>{item.name}</option>);

  return (
    <div className='flex flex-row items-center justify-between wvw-45 overflow-auto max-hvh-80 text-sm'>
      <form className="flex flex-col w-full " onSubmit={handleSubmit}>
        <label className="text-lg py-2">Name</label>
        <input type="text" className="border border-gray-300 rounded-md p-2" name="name" placeholder='Full Name' />

        <label className="text-lg py-2">Address</label>
        <input type="text" className="border border-gray-300 rounded-md p-2" name="address" placeholder='Address' />

        <div className="flex flex-row items-center justify-between pt-5">
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Email</label>
            <input type="email" className="border border-gray-300 rounded-md p-2" name="email" placeholder='Email Address' />
          </div>
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Phone Number</label>
            <input type="text" className="border border-gray-300 rounded-md p-2" name="phone" placeholder='Phone Number' />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between pt-5">
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Country</label>
            <select className="border border-gray-300 rounded-md p-2" name="countryId" >
              {makeOptions(countries)}
            </select>
          </div>
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Department</label>
            <select className="border border-gray-300 rounded-md p-2" name="departmentId" >
              {makeOptions(departments)}
            </select>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between pt-5">
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Role</label>
            <select className="border border-gray-300 rounded-md p-2" name="roleId" >
              {makeOptions(roles)}
            </select>
          </div>
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Manager</label>
            <AsyncSelect name="managerId" defaultOptions loadOptions={fetchManagers} />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between pt-5">
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Designation</label>
            <input type="text" className="border border-gray-300 rounded-md p-2" name="designation" placeholder='Designation' />
          </div>
          <div className="flex flex-col wp-49">
            <label className="text-lg py-2">Temporary Password</label>
            <input type="text" className="border border-gray-300 rounded-md p-2" name="password" placeholder='Temporary Password' />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-5">
          <button type="submit" className="bg-blue-500 text-white rounded-md p-2  wp-48">Create</button>
          <button onClick={(e) => close?.()} className="bg-red-500 text-white rounded-md p-2 wp-48">Cancel</button>
        </div>
      </form >
    </div >
  );
}
