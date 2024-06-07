import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  // const [products, setProducts] = useState([]);
  // const reduced = [];

  //fetch data using jsonplaceholder
  // const fetchPost = () => {
  //   fetch("https://jsonplaceholder.typicode.com/photos")
  //     .then((response) => response.json())
  //     .then((data) =>
  //       data.forEach((element) => {
  //         if (reduced.length < 20) {
  //           reduced.push(element);
  //           setData(reduced);
  //           // console.log(reduced);
  //         }
  //       })
  //     );
  // };

  const getProducts = () => {
    fetch("https://dummyjson.com/products") //fetch data from dummyjson
      .then((res) => res.json())
      .then((response) => {
        setData(response.products);
        console.log(response.products);
      });
  };

  useEffect(() => {
    // fetchPost();
    getProducts();
  }, []);

  //implement search functionality
  const searchItems = (searchValue) => {
    setSearch(searchValue);
  };

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <h1></h1>

      <Typography variant="h2" sx={{ color: "#bababa" }}>
        Fetch DATA From dummyjson.com
      </Typography>
      <div className="head">
        {/* input the data You want to search */}
        <TextField
          id="outlined-basic"
          label="eg : lipstick, powder"
          variant="outlined"
          value={search}
          onChange={(e) => searchItems(e.target.value)}
          sx={{ margin: "20px" }}
        />
      </div>

      <div className="card-container">
        {filteredData.map((item) => (
          <Card sx={{ maxWidth: 345 }} className="card-item" key={item.id}>
            {/*card using material ui */}
            <CardActionArea className="child">
              <CardMedia
                component="img"
                // height="140"
                image={item.images}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="child"
                >
                  {item.title}{" "}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginLeft: "20px", height: "40px" }}
                  >
                    {item.category}
                  </Button>
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  className="child"
                  component="div"
                >
                  {item.brand} <div></div> ${item.price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {/* <div className="card-container">
        {filteredData.map((item) => (
          <Card sx={{ maxWidth: 345 }} className="card-item" key={item.id}>
            <CardActionArea className="child">
              <CardMedia
                component="img"
                // height="140"
                image={item.url}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
export default App;
