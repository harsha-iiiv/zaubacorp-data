import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {

  const navigate = useNavigate()
  const [value, setValue] = useState("");
  const [cin, setCin] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      fetch(
        `http://localhost:5000/search?query=${value}`
      )
        .then((res) => res.json())
        .then((searchRes) => {
          setData(searchRes)
        });
    }
  }, [value]);

  const onChange = async (event) => {
    event.preventDefault()
    setValue(event.target.value);
  };

  const onSearch = (company) => {
    setCin(company.cin)
    setValue(company.companyName)
    console.log("search ", company);
  };

  const onsubmitHandle = async () => {
    console.log(cin, value)

    var options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cin: cin, name: value })
  };

    const json = await fetch("http://localhost:5000/save", options).then(response => response.json())
    console.log(json)
    navigate('/list', {state: json})

  } 
  return (
    <div className="Home"> 
      <h1>Search Company</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onsubmitHandle()} > Submit</button>
        </div>
        <div className="dropdown">
          {data.length ? data
            .map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row"
                key={item.cin}
              >
                {item.companyName}
              </div>

            )) : "No results found"}
        </div>
      </div>
    </div>
  );
}

