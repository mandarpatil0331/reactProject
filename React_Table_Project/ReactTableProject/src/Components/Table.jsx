import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Fuse from 'fuse.js';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import ColumnVisibilityToggles from './ColumnVisibilityToggles';
import { FaFilter } from 'react-icons/fa';

function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([
    { name: 'ID', selector: (row) => row.id, sortable: true, omit: false },
    { name: 'Name', selector: (row) => row.name, sortable: true, omit: false },
    { name: 'Category', selector: (row) => row.category, sortable: true, omit: false },
    { name: 'Subcategory', selector: (row) => row.subcategory, sortable: true, omit: false },
    {
      name: 'Created At',
      selector: (row) => new Date(row.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      sortable: true,
      omit: false,
    },
    {
      name: 'Updated At',
      selector: (row) => new Date(row.updatedAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      sortable: true,
      omit: false,
    },
    { name: 'Price', selector: (row) => row.price, sortable: true, omit: false },
    { name: 'Sale Price', selector: (row) => row.sale_price, sortable: true, omit: false },
  ]);

  // Fetch data from the public JSON link
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?table=block&id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1727431200000&signature=nWGBNhQXZk9mVkiH26S8wB1Mor8fKb9L4RVR7TRTyW0&downloadName=sample-data.json'
        );
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fuse.js fuzzy search
  const fuse = new Fuse(data, { keys: ['name'] });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const handleFuzzySearch = (query) => {
    if (query === '') {
      setFilteredData(data);
    } else {
      const results = fuse.search(query);
      setFilteredData(results.map(result => result.item));
    }
  };

  // Category and subcategory multi-select filters
  const handleCategoryFilter = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedCategories(selectedValues);
    const filtered = data.filter(item => selectedValues.includes(item.category));
    setFilteredData(filtered);
  };

  // Price range slider
  const handlePriceFilter = (values) => {
    const filtered = data.filter(item => item.price >= values[0] && item.price <= values[1]);
    setFilteredData(filtered);
  };

  // Date range filter
  const handleDateFilter = (startDate, endDate) => {
    const filtered = data.filter(
      (item) => new Date(item.createdAt) >= startDate && new Date(item.createdAt) <= endDate
    );
    setFilteredData(filtered);
  };

  // Column visibility toggle
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleColumnVisibility = (index) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[index].omit = !newColumns[index].omit;
      return newColumns;
    });
  };

  return (
    <div>
      <div className="sidebar">
        {/* Fuzzy Search */}
        <p>Name search</p>
        <input
          type="text"
          placeholder="Search "
          onChange={(e) => handleFuzzySearch(e.target.value)}
        />

        {/* Category Filter */}
        <p>Category Filter</p>
        <Select
          isMulti
          options={[...new Set(data.map(item => item.category))].map(cat => ({
            value: cat, label: cat
          }))}
          onChange={handleCategoryFilter}
        />

        {/* Price Range Slider */}
        {/* <Slider
          range
          min={0}
          max={100}
          value={priceRange} // Connect to the state
          onChange={setPriceRange} // Update the state when dragging the slider
          onAfterChange={handlePriceFilter} // Filter the data when the slider stops moving
        /> */}

        {/* Date Range Filter */}
        {/* <DatePicker
            selectsRange
            startDate={new Date('2015-01-01')}
            endDate={new Date('2025-12-31')}
            onChange={(dates) => handleDateFilter(dates[0], dates[1])}
          />  */}

        {/* Column Visibility */}
        
        { isPanelOpen? (
    
            <ColumnVisibilityToggles
            columns={columns}
            toggleColumnVisibility={toggleColumnVisibility}
            isOpen={isPanelOpen}
            data={data}
            onClose={() => setIsPanelOpen(false)}
            setFilteredData={setFilteredData} // Pass this from the parent component
          />

        ):(<button onClick={() => setIsPanelOpen(!isPanelOpen)} className="filter-icon-button">
        <FaFilter size={24} />
    </button>)}
          
      </div>

      {/* Data Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          title="Product Data"
          columns={columns.filter(col => !col.omit)}
          data={filteredData}
          pagination
          paginationPerPage={10}
          sortable
        />
      )}
    </div>
  );
}

export default Table;