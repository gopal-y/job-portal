import './App.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  Employee,
  Loader,
} from './components';

const DATA_URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json'
function App() {
  
  let history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmpList, setFilteredEmpList] = useState([]);
  let searchTimer = null;
  /**
   *  To fetch List of employees
   */
  useEffect(() => {
    // using IIFE to make use of try/catch with async/await as useEffect callbacks are considered to be synchronous
    setLoading(true);
    (async () => {
      try {
        const employeeApiRes = await fetch(DATA_URL);
        const empList = await employeeApiRes.json();

        setEmployeeList(empList);
        setFilteredEmpList(empList);
        setLoading(false)
      }
      catch (e) {
        console.log(e.message)
      }
    })()
    // empty dependency list to call this useEffect only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearchInputChange(e) {
    setSearchInput((e.target.value || "").trim())
  }

  function filterEmployeeList() {
    if (searchInput.length === 0) {
      setSearching(false);
      return setFilteredEmpList(employeeList)
    }

    const searchInputText = searchInput.toLowerCase();
    const filteredList = employeeList.filter(emp => {
      return emp.name.toLowerCase().includes(searchInputText)
    })

    setFilteredEmpList(filteredList)
    setSearching(false);
  }

  function search(e) {
    const codes = [8, 9, 13, 32, 46];
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (codes.includes(e.keyCode))))
      return

    if (searchTimer) {
      clearTimeout(searchTimer)
    }

    setSearching(true)
    searchTimer = setTimeout(filterEmployeeList, 2000);
  }

  function routeToEmp(e) {
    console.log(e.id)
    history.push('/employee/' + e.id)
  }

  return (<>
    {isLoading ? <Loader /> :
      <div className="main-div">
        <div className="search-bar">
          <input type="text" id="search-input" autoComplete='off' className="search-input" value={searchInput} onChange={handleSearchInputChange} onKeyUp={search} placeholder='Search an Employee' />
        </div>
        <div className="employee-list-div">
          {isSearching ? <Loader /> : <>{
            employeeList.length && (<>
              <center>
                <p>Total Employees: {filteredEmpList.length}</p>
              </center>
              <div className="employee-list">
                {filteredEmpList.map(e => {
                  return <div className="wrapper" onClick={_ => { routeToEmp(e) }}>
                    <Employee key={e.id} id={e.id} image={e.Image} name={e.name} />
                  </div>
                })}
              </div>
            </>
            )}
          </>
          }
        </div>
      </div>
    }
  </>
  );
}

export default App;
