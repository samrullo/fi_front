import React from "react";

const AboutUs = () => {
  return (
    <div className="container mt-4">
      <h1>About Us</h1>
      <p className="mt-3">
        <strong>FI Analytics</strong> is a specialized platform for managing and analyzing fixed income portfolios with precision and speed. Our mission is to empower analysts, risk managers, and developers to simulate stress scenarios, track yield curve shifts, and evaluate bond exposures with confidence.
      </p>

      <p>
        Built with modern web technologies and a modular architecture, FI Analytics offers a robust suite of tools including:
      </p>

      <ul>
        <li>Stress Scenario Modeling and Curve Shock Simulations</li>
        <li>Curve Point Management and Scenario-linked Position Analysis</li>
        <li>Custom Uploads for Bonds, Risk Cores, Transactions, and More</li>
        <li>Detailed React-based UI for fast editing and inspection</li>
        <li>Django + DRF backend powering clean APIs</li>
      </ul>

      <p>
        This project has been carefully developed with both usability and flexibility in mind, allowing professionals to adapt it to a wide range of fixed income research workflows. Whether you're managing risk, designing stress tests, or preparing data pipelines for reporting, FI Analytics is here to streamline and strengthen your process.
      </p>

      <p className="text-muted">
        Developed with ❤️ and attention to detail by a passionate engineer who believes that transparency and control are the keys to modern financial intelligence.
      </p>
    </div>
  );
};

export default AboutUs;