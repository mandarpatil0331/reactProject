// import React from 'react';
// import Toggle from 'react-toggle';
// import 'react-toggle/style.css';
// // import './ColumnVisibilityToggles.css'; // Custom styles for the side panel

import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './ColumnVisibilityToggles.css'; // Updated CSS for the left side drawer
import DatePicker from 'react-datepicker';
import Slider from 'rc-slider';
import { Box, Typography, Switch } from '@mui/material';
import { Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';

const ColumnVisibilityToggles = ({ columns, toggleColumnVisibility, isOpen, data, onClose, setFilteredData }) => {
  // Handle the date filter
  const handleDateFilter = (startDate, endDate) => {
    if (!startDate || !endDate) return; // Prevent filtering with invalid date range
    const filtered = data.filter(
      (item) => new Date(item.createdAt) >= startDate && new Date(item.createdAt) <= endDate
    );
    setFilteredData(filtered);
  };

  // Handle the price filter
  const handlePriceFilter = (values) => {
    if (!values || values.length !== 2) return; // Prevent filtering with invalid price range
    const filtered = data.filter(item => item.price >= values[0] && item.price <= values[1]);
    setFilteredData(filtered);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoryFilter = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedCategories(selectedValues);
    const filtered = data.filter(item => selectedValues.includes(item.category));
    setFilteredData(filtered);
  };

  // Column visibility state
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => !col.omit)
  );
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="custom-datepicker-input" onClick={onClick} ref={ref} aria-label="Select date range">
      {value || 'Select Date Range'}
    </button>
  ));
  // Handle column visibility changes
  const handleToggle = (index) => {
    toggleColumnVisibility(index); // Toggle the column visibility in the parent component
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <div className="side-panel-header">
        <h4>Filters</h4>
        <button onClick={onClose} className="close-button">X</button>
      </div>

      <h4>Price Range</h4>
      <Slider range min={0} max={100} defaultValue={[0, 100]} onAfterChange={handlePriceFilter} />

      
      
      <h4>Date Range</h4>
      <DatePicker
        selectsRange
        startDate={new Date('2020-01-01')}
        endDate={new Date('2025-12-31')}
        onChange={(dates) => handleDateFilter(dates[0], dates[1])}
        isClearable={true}
        // customInput={CustomInput}
      />

      <h4>Column Visibility</h4>
      <div className="column-visibility">
        {columns.map((col, index) => (
          <div key={index} className="column-toggle">
            <label>{col.name}</label>
            <Toggle
              defaultChecked={!col.omit}
              onChange={() => handleToggle(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnVisibilityToggles;




