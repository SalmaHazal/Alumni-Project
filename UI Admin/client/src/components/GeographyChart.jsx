import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box } from "@mui/material";
import { useFormik } from "formik";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import hadi from "../data/locat.json";
import "../index.css";
import Avatar from "../scenes/global/Avatar";

const UserLocations = () => {
  const [locations, setLocations] = useState([]);
  const [list, setList] = useState([]);

  const addItem = (item) => {
    setList((prevList) => [...prevList, item]);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:3002/locations");
        console.log("Fetched locations:", response.data);
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, []);

  const formik = useFormik({
    initialValues: {
      location: "",
    },
    onSubmit: async (values) => {
      for (const user of locations) {
        console.log("Processing user:", user);
        const match = hadi.find((tesla) => tesla.city === user.location);
        if (match) {
          console.log("Match found:", match);
          addItem({
            city: match.city,
            position: [match.lat, match.lng],
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            promotion: user.promotion,
            email: user.email,
            picturePath: user.picturePath || "default.png", // Use default image if picturePath is empty
          });
        } else {
          console.error(`No match found for ${user.location}`);
        }
      }
    },
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  const truncateEmail = (email, length = 6) => {
    if (email.length <= length) return email;
    return email.substring(0, length) + "...";
  };

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    useEffect(() => {
      map.locate();
    }, [map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <>
      <MapContainer
        center={[48.856614, 2.3522219]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "300px", width: "100%", borderRadius: "7px" }} // Adjusted map height
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
        {list.map((item, index) => (
          <Marker key={index} position={item.position}>
            <Popup
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="container">
                <Avatar
                  width={40}
                  height={40}
                  name={`${item?.firstName} ${item?.lastName}`}
                  imageUrl={item?.picturePath}
                />
                <div className="text-content" style={{ textAlign: "center" }}>
                  <div>
                    <strong>
                      {item.firstName} {item.lastName}
                    </strong>
                  </div>
                  <ul
                    style={{
                      margin: "10px 0",
                      cursor: "pointer",
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    <li title={item.city}>City: {item.city}</li>
                    <li title={item.promotion}>Promo: {item.promotion}</li>
                    <li title={item.email}>
                      e-mail: {truncateEmail(item.email)}
                    </li>
                  </ul>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px", // Adjust this for vertical spacing
          width: "100%", // Ensures the form takes up the full width for centering
        }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={handleClick}
          style={{
            display: isVisible ? "inline-block" : "none",
            background: "#4CC9FE",
            fontWeight: "bold",
          }}
        >
          Laureate Location
        </Button>
      </form>
    </>
  );
};

const GeographyChart = () => {
  return (
    <Box>
      <div className="App">
        <UserLocations />
      </div>
    </Box>
  );
};

export default GeographyChart;
