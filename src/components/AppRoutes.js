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
import Login from "./user_management/Login"
import Register from "./user_management/Register";
import EmailNotVerified from "./user_management/EmailNotVerified";
import Profile from "./user_management/Profile";
import Position from "./positions/Position";
import UploadPositions from "./positions/UploadPositions";
import Curve from "./curves/Curve";
import CurveNew from "./curves/CurveNew";
import CurveEdit from "./curves/CurveEdit";
import UploadCurveCSV from "./curves/UploadCurveCSV";
import CurvesByDate from "./curves/CurvesByDate";
import StressScenario from "./stress_scenarios/StressScenario";
import StressScenarioNew from "./stress_scenarios/StressScenarioNew";
import StressScenarioEdit from "./stress_scenarios/StressScenarioEdit";
import UploadStressScenarioCSV from "./stress_scenarios/UploadStressScenarioCSV";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Product />}>
          <Route path="new" element={<ProductNew />} />
          <Route path="edit/:productId" element={<ProductEdit />} />
        </Route>
        <Route path="/curves" element={<Curve />}>
          <Route path="new" element={<CurveNew />} />
          <Route path="edit/:curveId" element={<CurveEdit />} />
        </Route>
        <Route path="/curves/by-date/:curveName/:adate" element={<CurvesByDate />} />
        <Route path="/curves/bulk" element={<UploadCurveCSV />} />
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
      <Route path="/positions/:adate" element={<Position />} />
      <Route path="/upload_positions" element={<UploadPositions />} />
    </Routes>
  );
};

export default AppRoutes;
