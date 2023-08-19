import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const LimitDropdown = ({ limit, setLimit }) => {
  return (
    <DropdownButton
      id="limit-dropdown"
      variant="secondary"
      title={`Limit: ${limit}`}
      style={{ position: "fixed", bottom: "40px", right: "10px" }}
    >
      <Dropdown.Item onClick={() => setLimit(10)}>10</Dropdown.Item>
      <Dropdown.Item onClick={() => setLimit(20)}>20</Dropdown.Item>
      <Dropdown.Item onClick={() => setLimit(50)}>50</Dropdown.Item>
    </DropdownButton>
  );
};

export default LimitDropdown;
