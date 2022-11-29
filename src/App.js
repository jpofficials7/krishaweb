import './App.css';
import {useState,useEffect} from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filterParam, setFilterParam] = useState(["All"]);
    //     set search query to empty string
    const [q, setQ] = useState("");
     // just add it to this array
     const [searchParam] = useState(["title"]);


  useEffect(() => {
      fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then(
              (result) => {
                  setIsLoaded(true);
                  setItems(result);
              },
             
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          );
  }, []);
  const data = Object.values(items);

  function search(items) {
    return items.filter((item) => {

    if (item.title === filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1
                     );
                 });
             } else if (filterParam == "All") {
                 return searchParam.some((newItem) => {
                     return (
                         item[newItem]
                             .toString()
                             .toLowerCase()
                             .indexOf(q.toLowerCase()) > -1
                     );
                 });
             }
         });
     }

  if (error) {
    
      return <>{error.message}</>;
  } else if (!isLoaded) {
      return <>loading...</>;
  } else {
      return (
          /* here we map over the element and display each item as a card  */
          <div className="container">
              <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <span className="sr-only">Search Product here</span>
                        </label>
                        <div className="select">
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Products By Category"
                        >
                            <option value="All">All</option>
                            <option value="men's clothing">men's clothing</option>
                            <option value="jewelery">jewelery</option>
                            <option value="electronics">electronics</option>
                            <option value="women's clothing">women's clothing</option>
                        </select>
                        <span className="focus"></span>
                    </div>
                    </div>
                    
                  {search(data).map((item) => (
                      <div className='card'>
                        <div><img src={item.image} alt="product image"/></div>
                        <br />
                        <div>
                          <p1>Title : {item.title}</p1>
                          <br />
                          <p1>Price : {item.price}</p1>
                          <br />
                          <p1>Description : {item.description}</p1>
                          <br />
                          <p1>Category : {item.category}</p1>
                        </div>
                      </div>
                  ))}
              
          </div>
      );
  }
}

export default App;
