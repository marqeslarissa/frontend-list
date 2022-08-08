import * as React from "react";
import "../styles.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Typography,
  FormControl,
  Box,
  Checkbox,
  Tooltip,
  IconButton,
  TableBody,
  Toolbar,
  Grid,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";


const rows = [
    {
      id: 101885,
      reference: "7987UDHPAPWKS",
      type: "pickup",
      date: 1659398400000,
      statusCode: "created",
      street: "Carrer de Pau Claris 112",
      postalCode: "08009",
      city: "Barcelona",
      country: "españa",
      createdAt: "2022-07-27T14:52:14Z",
      updatedAt: "2022-08-02T12:33:47Z",
      client: {
        username: "martipol",
        profile: {
          emails: ["testemail@gmail.com", "clienttest@vonzu.es"],
          phones: [],
          name: "Marti pol"
        }
      }
    },
    {
      id: 101881,
      reference: "753152OMEF0PS",
      type: "pickup",
      date: 1659398400000,
      statusCode: "created",
      street: "Carrer de Pau Claris 112",
      postalCode: "08009",
      city: "Barcelona",
      country: "españa",
      createdAt: "2022-07-27T14:52:14Z",
      updatedAt: "2022-07-27T14:52:22Z",
      description: "",
      client: {
        username: "martipol",
        profile: {
          emails: ["testemail@gmail.com"],
          phones: [],
          name: "marti pol"
        }
      }
    },
    {
      id: 101878,
      reference: "0675IVKYM8HNS",
      type: "delivery",
      date: 1659398400000,
      statusCode: "incidence",
      street: "Gran Via de les Corts Catalanes 645",
      postalCode: "Spain",
      city: "08010",
      country: "españa",
      createdAt: "2022-07-27T14:52:14Z",
      updatedAt: "2022-07-27T14:52:22Z",
      description: "Veg It",
      barcodes: ["1018831029UHVH3GWAS001"],
      client: {
        username: "clienttest",
        profile: {
          emails: ["clienttest@vonzu.es"],
          phones: ["637492532"],
          name: "client test"
        }
      }
    }
  ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <Grid container spacing={2}>
      
    </Grid>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton></IconButton>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <EnhancedTableToolbar numSelected={selected.length} />

      <EnhancedTableHead
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        rowCount={rows.length}
      />
      <TableBody>
        
      </TableBody>
    </Box>
  );
}