import "../styles.css";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";

export default function Search() {
  return (
    <div>
      <TextField
        className="Search"
        sx={{
          "& > :not(style)": { m: 1, borderRadius: "20px" }
        }}
        autoComplete="off"
        id="outlined-basic"
        placeholder="Buscar"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="large" />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}