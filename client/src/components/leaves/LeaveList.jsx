import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useAuth } from "../../context/AuthContext";

// Function to calculate the number of days between start and end date
const calculateLeaveDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start; // Time difference in milliseconds
  return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Convert milliseconds to days, add 1 to include both start and end day
};

const LeaveList = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { user, loading } = useAuth();

  // Function to fetch employee and leave data
  const fetchData = async () => {
    try {
      const [employeeRes, leaveRes] = await Promise.all([
        axios.get("http://localhost:5001/api/employee/getEmployees"),
        axios.get("http://localhost:5001/api/leave/getAllleaves"),
      ]);

      // Set the fetched data
      setEmployees(employeeRes.data.result);
      setLeaves(leaveRes.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an issue fetching the data. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch data if user is loaded and authentication is done
    if (user && !loading) {
      fetchData();
    }
  }, [user, loading]);

  // Function to get employee details by employeeId
  const getEmployeeDetails = (employeeId) => {
    const employee = employees?.find((emp) => emp._id === employeeId);
    return employee || {};
  };

  // Handling modal open
  const handleShowViewModal = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  // Handling modal close
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedEmployee(null);
  };

  // Columns for the DataTable
  const columns = [
    {
      name: "S No",
      selector: (row, ind) => ind + 1,
      sortable: true,
    },
    {
      name: "Emp ID",
      selector: (row) => row.employeeId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => {
        const employee = getEmployeeDetails(row.employeeId);
        return employee.name || "N/A";
      },
      sortable: true,
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.reason,
      sortable: true,
    },
    {
      name: "Days",
      selector: (row) => calculateLeaveDays(row.startDate, row.endDate), // Calculate days here
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleShowViewModal(row)}
          style={{ backgroundColor: "green", color: "#fff", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
        >
          View
        </button>
      ),
    },
  ];

  // Show loading indicator while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between my-4">
        <input
          type="text"
          className="px-4 py-1 border rounded ml-5"
          placeholder="Search By Name"
        />
        <Link
          to="/admin-dashboard/pending-leaves"
          className="px-6 py-1 mr-5 text-white rounded bg-green-600 hover:bg-green-800 font-semibold"
        >
          Pending Leave
        </Link>
        <Link
          to="/admin-dashboard/approve-leaves"
          className="px-6 py-1 mr-5 text-white rounded bg-green-600 hover:bg-green-800 font-semibold"
        >
          Approve Leave
        </Link>
        <Link
          to="/admin-dashboard/rejected-leaves"
          className="px-6 py-1 mr-5 text-white rounded bg-green-600 hover:bg-green-800 font-semibold"
        >
          Rejected Leave
        </Link>
      </div>

      {/* Render leaves table if data exists */}
      {leaves.length > 0 ? (
        <DataTable
          highlightOnHover
          selectableRows
          pagination
          columns={columns}
          data={leaves}
        />
      ) : (
        <div>No leaves found.</div>
      )}

      {/* Modal to show employee details */}
      {showViewModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white w-11/12 max-w-md rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Employee Details</h2>
              <button
                onClick={handleCloseViewModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {selectedEmployee ? (
                <div>
                  <img src="/mn.png" width={70} alt="" />
                  <p>
                    <strong>Name:</strong> {selectedEmployee.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedEmployee.email}
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    {selectedEmployee.department || "N/A"}
                  </p>
                  <p>
                    <strong>Joining Date:</strong>{" "}
                    {selectedEmployee.joiningDate || "N/A"}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedEmployee.role || "N/A"}
                  </p>
                </div>
              ) : (
                <p>No employee selected.</p>
              )}
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={handleCloseViewModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
