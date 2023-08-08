import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import HistoryIcon from "@mui/icons-material/History";
import DevotionalIcon from "@mui/icons-material/TempleHindu";
import NatureIcon from "@mui/icons-material/Nature";
import GardenIcon from "@mui/icons-material/Nature";
import BeachIcon from "@mui/icons-material/BeachAccess";
import HillIcon from "@mui/icons-material/Bolt";

import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import DestinationService from "../../services/DestinationService";
import Destination from "../../shared/models/DestinationsModel";
import { endpoints } from "../../api";
import DestinationItems from "./DestinationItems";
import DestinationDetails from "./DestinationDetails";
import IconList from "../../ui/toast/lists/IconList";
const categories = [
  {
    label: "Historical",
    icon: <HistoryIcon />,
  },
  {
    label: "Devotional",
    icon: <DevotionalIcon />,
  },
  {
    label: "Beach",
    icon: <BeachIcon />,
  },
  {
    label: "Nature",
    icon: <NatureIcon />,
  },
  {
    label: "Garden",
    icon: <GardenIcon />,
  },
  {
    label: "Hills",
    icon: <HillIcon />,
  },
];

interface IDestinationsProps {}

const Destinations: React.FunctionComponent<IDestinationsProps> = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams, setSearchParms] = useSearchParams();

  const [data, setData] = React.useState<Destination[]>([]);
  const [seachValue, setsetSearchValue] = React.useState<string>("");

  const handleCategoryChange = (cat: string) => {
    if (pathname != "/destinations") {
      navigate(`/destinations?category=${cat}`);
    } else {
      searchParams.set("category", cat);
      setSearchParms(searchParams);
    }
  };

  // new one
  // const handleCategoryChange = (cat: string) => {
  //   if (pathname !== "/destinations") {
  //     navigate(`/destinations?category=${cat}`);
  //   } else {
  //     const newSearchParams = new URLSearchParams(searchParams);
  //     newSearchParams.set("category", cat);
  //     setSearchParms(newSearchParams);
  //   }
  // };

  //

  const loadDestinations = async (query = "") => {
    if (!query) {
      query = `?perPage=${15}&pageNo=${1}`;
    }
    const response = await DestinationService?.getAllDestinations(query);
    setData(response?.data?.data);
  };

  const loadQuery = () => {
    let query = "?";
    const perPage = searchParams.get("perPage");
    const pageNo = searchParams.get("pageNo");
    const category = searchParams.get("category");
    const q = searchParams.get("q");

    if (perPage) query += "perPage=" + perPage;
    if (pageNo) query += "&pageNo=" + pageNo;
    if (category) query += "&category=" + category;
    if (q) query += "&q=" + q;
    return query;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setSearchParms(val);

    if (!val || val?.length == 0) {
      searchParams.delete("q");
      setSearchParms(searchParams);
    } else if (val?.length > 2) {
      searchParams.set("q", val);
      setSearchParms(searchParams);
    }
  };

  React.useEffect(() => {
    loadDestinations();
  }, []);
  React.useEffect(() => {
    loadDestinations(loadQuery());
  }, [searchParams]);
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          {/* filter categories */}
          <Card>
            <h4> Filter by Categories</h4>
            <IconList items={categories} onChange={handleCategoryChange} />
          </Card>
        </Grid>
        <Grid item container xs={12} md={9}>
          <Grid item xs={12} sx={{ padding: 1 }}>
            <TextField
              size="small"
              type="search"
              fullWidth
              variant="outlined"
              placeholder="Search destinations..."
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: 1 }}>
            {/* listing */}
            <Routes>
              <Route path="" element={<DestinationItems data={data} />} />
              <Route path="details/:id" element={<DestinationDetails />} />

              {/*here you don't provided the id */}
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Destinations;
{
  // upper Destinations is nothing but   DestinationsPage
  /* 
// totlDes = 100
// perPage = 15
// totalPages = 7
// pageNo = 2

// pageNo = 2
// resourceLimits.skip(15 * 1).limit(15)

// resourceLimits.skip(perPage * (pageNo - 1)).limit(perPage) */
}
