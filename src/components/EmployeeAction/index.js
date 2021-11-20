import './style.css';

import {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import { Employee } from '../';

const DATA_URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json';
function EmployeeAction() {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(true);
    const [employee, setEmployee] = useState(null);
    
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
                const empDetails = (empList.filter(e => e.id === id) || [])[0];
                
                setEmployee(empDetails);
                setLoading(false)
            }
            catch (e) {
                console.log(e.message)
            }
        })()
        // empty dependency list to call this useEffect only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (<>{(!isLoading && employee?.name) ? <div style={{width:"280px"}}><Employee id={id} name={employee.name} image={employee.Image} />
        <button className="success btn" >Shortlist</button>
        <button className="reject btn">Reject</button>
    </div> : ''}</>);
}

export default EmployeeAction;