import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import Product from "./products/Product";
import ProductNew from "./products/ProductNew";
import ProductEdit from "./products/ProductEdit";
import Contact from "./contacts/Contact";
import ContactNew from "./contacts/ContactNew";
import ContactEdit from "./contacts/ContactEdit";
import AboutUs from "./AboutUs";
import Login from "./user_management/Login";
import Register from "./user_management/Register";
import EmailNotVerified from "./user_management/EmailNotVerified";
import Profile from "./user_management/Profile";

import CurvePoint from "./curve_points/CurvePoint";
import CurvePointNew from "./curve_points/CurvePointNew";
import CurvePointEdit from "./curve_points/CurvePointEdit";
import UploadCurvePointsCSV from "./curve_points/UploadCurvePointsCSV";
import CurvesByDate from "./curve_points/CurvePointsByDate";
import CurveByDateSelector from "./curve_points/CurveByDateSelector";

import StressScenario from "./stress_scenarios/StressScenario";
import StressScenarioNew from "./stress_scenarios/StressScenarioNew";
import StressScenarioEdit from "./stress_scenarios/StressScenarioEdit";
import UploadStressScenarioCSV from "./stress_scenarios/UploadStressScenarioCSV";

import CurvePointShock from "./curve_point_shocks/CurvePointShock";
import CurvePointShockNew from "./curve_point_shocks/CurvePointShockNew";
import CurvePointShockEdit from "./curve_point_shocks/CurvePointShockEdit";

import StressScenarioDescription from "./stress_scenario_descriptions/StressScenarioDescription";
import StressScenarioDescriptionNew from "./stress_scenario_descriptions/StressScenarioDescriptionNew";
import StressScenarioDescriptionEdit from "./stress_scenario_descriptions/StressScenarioDescriptionEdit";

import CurveDescription from "./curve_descriptions/CurveDescription";
import CurveDescriptionNew from "./curve_descriptions/CurveDescriptionNew";
import CurveDescriptionEdit from "./curve_descriptions/CurveDescriptionEdit";

import VanillaBond from "./vanilla_bonds/VanillaBond";
import VanillaBondNew from "./vanilla_bonds/VanillaBondNew";
import VanillaBondEdit from "./vanilla_bonds/VanillaBondEdit";
import UploadVanillaBondsCSV from "./vanilla_bonds/UploadVanillaBondsCSV";
import RiskCore from "./risk_cores/RiskCore";
import RiskCoreNew from "./risk_cores/RiskCoreNew";
import RiskCoreEdit from "./risk_cores/RiskCoreEdit";
import UploadRiskCoreCSV from "./risk_cores/UploadRiskCoreCSV";

import Position from "./positions/Position";
import PositionNew from "./positions/PositionNew";
import PositionEdit from "./positions/PositionEdit";
import UploadPositionsCSV from "./positions/UploadPositionsCSV";

import ScenarioPosition from "./scenario_positions/ScenarioPosition";
import ScenarioPositionNew from "./scenario_positions/ScenarioPositionNew";
import ScenarioPositionEdit from "./scenario_positions/ScenarioPositionEdit";
import GenerateScenarioPositionsForm from "./scenario_positions/GenerateScenarioPositionsForm";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Dashboard />} />

        <Route path="/products" element={<Product />}>
          <Route path="new" element={<ProductNew />} />
          <Route path="edit/:productId" element={<ProductEdit />} />
        </Route>
        <Route path="/vanilla-bonds" element={<VanillaBond />}>
          <Route path="new" element={<VanillaBondNew />} />
          <Route path="edit/:bondId" element={<VanillaBondEdit />} />
        </Route>
        <Route path="/upload-vanilla-bonds" element={<UploadVanillaBondsCSV />} />
        <Route path="/positions" element={<Position />}>
          <Route path="new" element={<PositionNew />} />
          <Route path="edit/:positionId" element={<PositionEdit />} />
        </Route>
        <Route path="/upload-positions" element={<UploadPositionsCSV />} />
        <Route path="/scenario-positions" element={<ScenarioPosition />}>
          <Route path="new" element={<ScenarioPositionNew />} />
          <Route path="edit/:scenarioPositionId" element={<ScenarioPositionEdit />} />
        </Route>
        <Route path="/scenario-positions/generate" element={<GenerateScenarioPositionsForm />} />

        <Route path="/risk-cores" element={<RiskCore />}>
          <Route path="new" element={<RiskCoreNew />} />
          <Route path="edit/:riskCoreId" element={<RiskCoreEdit />} />
        </Route>
        <Route path="/upload-risk-cores" element={<UploadRiskCoreCSV />} />


        <Route path="/curve-descriptions" element={<CurveDescription />}>
          <Route path="new" element={<CurveDescriptionNew />} />
          <Route path="edit/:descriptionId" element={<CurveDescriptionEdit />} />
        </Route>

        <Route path="/curve-points" element={<CurvePoint />}>
          <Route path="new" element={<CurvePointNew />} />
          <Route path="edit/:curvePointId" element={<CurvePointEdit />} />
        </Route>
        <Route path="/curve-points/by-date/:curveName/:adate" element={<CurvesByDate />} />
        <Route path="/curve-points/bulk" element={<UploadCurvePointsCSV />} />
        <Route path="/curves-by-date" element={<CurveByDateSelector />} />

        <Route path="/stress-scenario-descriptions" element={<StressScenarioDescription />}>
          <Route path="new" element={<StressScenarioDescriptionNew />} />
          <Route path="edit/:descriptionId" element={<StressScenarioDescriptionEdit />} />
        </Route>
        <Route path="/curve-point-shocks" element={<CurvePointShock />}>
          <Route path="new" element={<CurvePointShockNew />} />
          <Route path="edit/:shockId" element={<CurvePointShockEdit />} />
        </Route>
        <Route path="/stress-scenarios" element={<StressScenario />}>
          <Route path="new" element={<StressScenarioNew />} />
          <Route path="edit/:scenarioId" element={<StressScenarioEdit />} />
        </Route>
        <Route path="/upload-stress-scenarios" element={<UploadStressScenarioCSV />} />

        <Route path="/contacts" element={<Contact />}>
          <Route path="new" element={<ContactNew />} />
          <Route path="edit/:contactId" element={<ContactEdit />} />
        </Route>
      </Route>

      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email_unverified" element={<EmailNotVerified />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;