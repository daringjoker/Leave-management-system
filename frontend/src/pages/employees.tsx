import { Emptiness } from '../components/emptiness';
import { EmployeeCard } from '../components/employeeCard';
import { useEffect, useState } from 'react';
import { useModal } from '../hooks/modal';
import { NewEmployee } from '../sections/newEmployee';
import { http } from '../utils/http';


export function Employees() {
  const [filters, setFilters] = useState<any>({});
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const { modal, triggerModal, closeModal } = useModal();
  useEffect(() => {
    http.get('/users/search?' + query)
      .then(({ data }) => {
        setEmployees(data);
      })
      .catch(console.error);
  }, [query])

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

  function setParam(param: string) {
    return function (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      const params = new URLSearchParams(query);
      const newFilters = { ...(filters ?? {}), [param]: e.target.value };
      setFilters(newFilters);
      if (e.target.value === '') params.delete(param);
      else
        params.set(param, e.target.value);
      setQuery(params.toString());
    }
  }

  function resetFilters() {
    console.log('resetting filters');
    setFilters({});
    setQuery('');
  }

  console.dir({ filters, query }, { depth: null });


  const makeOptions = (data: any[], param: string) => data.map((item, index) => <option key={item.id} selected={filters[param] === item.id} value={item.id}>{item.name}</option>);


  function newEmployeeModal() {
    triggerModal("Create Employee", <NewEmployee close={closeModal} mode="CREATE" />);
  }

  return (
    <div className="flex flex-col h-full w-full items-center pt-1">
      {modal}
      <div className='flex flex-row min-hpx-50 wp-80 bg-black rounded-full px-4 py-1 items-center justify-between text-white'>
        <button onClick={newEmployeeModal} className='bg-gray-300 rounded-full px-3 mr-3 py-1 text-sm text-black'>Add Employee</button>
        <input type="text" className='bg-gray-300 rounded-full px-3 py-1 text-sm text-black flex-1' placeholder='Search Employees' onChange={setParam('q')} />
        <div className='flex flex-row items-center justify-between wp-50 ml-3'>
          <div className='flex flex-row items-center justify-between'>
            <label className='text-sm text-gray-300 pr-2'>Department:</label>
            <select className='bg-gray-300 rounded-sm px-3 py-1 text-sm text-black' onChange={setParam('departmentId')} value={filters['departmentId']} >
              <option value='' selected={filters['departmentId'] === ''}>All Departments</option>
              {makeOptions(departments, 'departmentId')}
            </select>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <label className='text-sm text-gray-300 pr-2'>Role:</label>
            <select className='bg-gray-300 rounded-sm px-3 py-1 text-sm text-black' onChange={setParam('roleId')} value={filters['roleId']} >
              <option value='' selected={filters['roleId'] === ''}>All Roles</option>
              {makeOptions(roles, 'roleId')}
            </select>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <label className='text-sm text-gray-300 pr-2'>County:</label>
            <select className='bg-gray-300 rounded-sm px-3 py-1 text-sm text-black' onChange={setParam('countryId')} value={filters['countryId']} >
              <option value='' selected={filters['countryId'] === ''}>All Countries</option>
              {makeOptions(countries, 'countryId')}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-3 gap-10 w-full h-full p-3">
        <Emptiness data={employees} message="No Employees Found" subMessage="Once People Management adds employees, you will see them here" />
        {employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div >
    </div>
  );
}

