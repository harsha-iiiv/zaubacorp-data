import React from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import './List.css'

function CompaniesList() {
  let location = useLocation();
  return (
    <div>
      <div class="container">
        <div class="vertical-center">
        <button>
          <Link to="/" style={{ color: '#FFF' }}>Add company ➕</Link>
          </button>
        </div>
      </div>
    
    <table id="companies">
        <tbody>
        <tr>
            <th>Company name</th>
            <th>CIN</th>
        </tr>
        {location.state.data.map((item, i) => (
           item.cin && <tr key={i}>
                <td>{item.name}</td>
                <td>{item.cin}</td>
            </tr>
        ))}
      </tbody>
      </table>
      </div>
  );
}

export default CompaniesList