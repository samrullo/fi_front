import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import DataTable from "../GenericDataComponents/DataTable";
import AppContext from "../../AppContext";
import { fetchResource } from "../ApiUtils/fetch_data";
import { USIG_DATA_ENDPOINT } from "../ApiUtils/ApiEndpoints";

const Position = () => {
  const navigate = useNavigate();
  const {adate} = useParams();
  let { state = {} } = useLocation();
  let { timestamp } = state ?? {};
  const [positions, setPositions] = useState([]);


  useEffect(() => {
    const getPositions = async (adate) => {
      try {
        const data = await axios.get(`${USIG_DATA_ENDPOINT}${adate}`);

        setPositions(data.data);
        console.log(`data is ${JSON.stringify(data)}`);
      } catch (error) {
        console.log(`Error while fetching positions ${error}`);
      }
    };
    getPositions(adate);
  }, [timestamp]);


  return (
    <>
      <h1>US IG Positions as of {adate}</h1>
      
      <Outlet />
  
      {positions == null || positions.length === 0 ? (
        <p>No positions defined yet</p>
      ) : (
        <DataTable
          data={positions}          
          width_pct={100}          
        />
      )}
    </>
  );
};

export default Position;
