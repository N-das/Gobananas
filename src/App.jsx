import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    fetch("https://dummyjson.com/products")//fetch data from dummyjson api
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');//handling error
        }
        return res.json();
      })
      .then((response) => {
        setData(response.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);//handling error
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  //implemented search functionalities
  const searchItems = (searchValue) => {
    setSearch(searchValue);
  };

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Typography variant="h2" sx={{ color: "#bababa" }}>
        Fetch DATA From dummyjson.com
      </Typography>
      <div className="head">
        <TextField
          id="outlined-basic"
          label="eg : lipstick, powder"
          variant="outlined"
          value={search}
          onChange={(e) => searchItems(e.target.value)}
          sx={{ margin: "20px" }}
        />
      </div>

      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredData.map((item) => (
            <Card sx={{ maxWidth: 345, margin: 2 }} key={item.id}>{/* card using material ui */}
              <CardActionArea className="child">
                <CardMedia
                  component="img"
                  image={item.images}
                  alt={item.title}
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
        </Box>
      )}
    </div>
  );
}

export default App;
