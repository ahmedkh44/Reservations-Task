import React from "react";
import { useState } from "react";
import { useGetReservationsQuery } from "../slices/reservations/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setFilter } from "../slices/reservations/reservationsSlice";
import { Box, Typography, Button, Grid, Input, Stack } from "@mui/joy";
import "./ReservationList.scss";
import FilterSelect from "../shared/FilterSelect";

const ReservationList = () => {
  const {
    data: reservations = [],
    error,
    isLoading,
  } = useGetReservationsQuery();
  const filters = useSelector((state: RootState) => state.reservations);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching reservations:", error);
    return <div>Error loading reservations</div>;
  }

  const today = new Date();
  const filteredReservations = reservations
    .filter((res) => (filters.status ? res.status === filters.status : true))
    .filter((res) => (filters.shift ? res.shift === filters.shift : true))
    .filter((res) => (filters.area ? res.area === filters.area : true))
    .filter((res) => {
      if (!filters.date) return true;

      const reservationDate = new Date(
        res.businessDate.split(".").reverse().join("-")
      );
      return filters.date === "PAST"
        ? reservationDate < today
        : reservationDate >= today;
    })
    .filter((res) => {
      const fullName =
        `${res.customer.firstName} ${res.customer.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return a.customer.firstName.localeCompare(b.customer.firstName);
      } else if (filters.sortBy === "quantity") {
        return a.quantity - b.quantity;
      }
      return 0;
    });

  const handleChange = (filterName: any) => (_event: any, newValue: any) => {
    dispatch(setFilter({ [filterName]: newValue }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CHECKED OUT":
        return "#00B154";
      case "SEATED":
        return "#e76161";
      case "CONFIRMED":
        return "#e76161";
      case "NOT CONFIRMED":
        return "#f4be1b";
      default:
        return "black";
    }
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <Typography level="h2" sx={{ mb: 2 }}>
        Reservations
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <FilterSelect
            placeholder="Filter by status"
            options={[
              { value: "", label: "All Status" },
              { value: "CONFIRMED", label: "Confirmed" },
              { value: "SEATED", label: "Seated" },
              { value: "CHECKED OUT", label: "Checked Out" },
              { value: "NOT CONFIRMED", label: "Not Confirmed" },
            ]}
            filterName="status"
            handleChange={handleChange}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <FilterSelect
            placeholder="Filter by shift"
            options={[
              { value: "", label: "All Shifts" },
              { value: "BREAKFAST", label: "Breakfast" },
              { value: "LUNCH", label: "Lunch" },
              { value: "DINNER", label: "Dinner" },
            ]}
            filterName="shift"
            handleChange={handleChange}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <FilterSelect
            placeholder="Filter by Date"
            options={[
              { value: "", label: "All Dates" },
              { value: "PAST", label: "Past Dates" },
              { value: "UPCOMING", label: "Future Dates" },
            ]}
            filterName="date"
            handleChange={handleChange}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <FilterSelect
            placeholder="Filter by Area"
            options={[
              { value: "", label: "All Areas" },
              { value: "BAR", label: "BAR" },
              { value: "MAIN ROOM", label: "MAIN ROOM" },
            ]}
            filterName="area"
            handleChange={handleChange}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} lg={3}>
          <Input
            placeholder="Search by Name or Surname"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3} lg={3}>
          <Button
            onClick={() => dispatch(setFilter({ sortBy: "name" }))}
            variant="outlined"
            fullWidth
          >
            Sort by Name
          </Button>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <Button
            onClick={() => dispatch(setFilter({ sortBy: "quantity" }))}
            variant="outlined"
            fullWidth
          >
            Sort by Quantity
          </Button>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <Button
            onClick={() => dispatch(setFilter({ sortBy: "all" }))}
            variant="outlined"
            fullWidth
          >
            All
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              key={reservation.id}
              className="reservation__container"
            >
              <Box className="reservation__container--list__container">
                <Typography level="h2" fontWeight="bold">
                  {`${reservation.customer.firstName} ${reservation.customer.lastName}`}
                </Typography>
                <Box
                  sx={{ marginTop: 2, alignItems: "flex-start" }}
                  className="reservation__container--list__container--list"
                >
                  <Typography level="body-sm" sx={{ fontWeight: "bold" }}>
                    Date: {reservation.businessDate}
                  </Typography>
                  <Typography level="body-sm">
                    Shift: {reservation.shift}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography level="body-sm">Status: </Typography>
                    <Typography
                      level="body-sm"
                      sx={{
                        color: getStatusColor(reservation.status),
                        fontWeight: "bold",
                      }}
                    >
                      {reservation.status}
                    </Typography>
                  </Stack>
                  <Typography level="body-sm">
                    Start Time:{" "}
                    {new Date(reservation.start).toLocaleTimeString()}
                  </Typography>
                  <Typography level="body-sm">
                    End Time: {new Date(reservation.end).toLocaleTimeString()}
                  </Typography>
                  <Typography level="body-sm">
                    Area: {reservation.area}
                  </Typography>
                  <Typography level="body-sm">
                    Notes: {reservation.guestNotes || "--"}
                  </Typography>
                  <Typography level="body-sm">
                    Number of Guests: {reservation.quantity}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <Typography level="h4">No results found</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ReservationList;
