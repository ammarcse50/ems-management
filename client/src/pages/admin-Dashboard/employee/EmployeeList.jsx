import { Link } from "react-router-dom";
import { useState } from "react";
import DataTable from "react-data-table-component";
import useEmployees from "../../../hooks/FetchEmployee";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
const List = () => {
  const { user, loading } = useAuth();
  const baseUrl = import.meta.env.VITE_EMS_Base_URL;

  const [searchQuery, setSearchQuery] = useState(""); // for future search
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const {
    data: employees = [],
    refetch,
  } = useEmployees(baseUrl);
  console.log("Employees data:", employees);
  const date = new Date(selectedEmployee?.createdAt);
  const joiningDate = date.toLocaleString();

  // View modal handlers
  const handleShowViewModal = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedEmployee(null);
  };
  const handleDeleteEmployee = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = await localStorage.getItem("token") || await sessionStorage.getItem('token')

      try {
        const { data } = await axios.delete(
          `${baseUrl}/api/employee/deleteEmployee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include only if needed
            },
          }
        );

        if (data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch(); // Refresh the list
        } else {
          Swal.fire("Failed!", "Something went wrong.", "error");
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || error.message,
          "error"
        );
      }
    }
  };

  // Columns for the DataTable
  const columns = [
    {
      name: "S No",
      selector: (row, ind) => ind + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: "Emp_Id",
      selector: (row) => row.employeeId,
      sortable: true,
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => row.emp_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`http://localhost:5001/uploads/${row.profileImage}`}
          width={30}
          className="rounded-full"
          alt=""
        />
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Email",
      selector: (row) => row.role,
      sortable: true,
      width: "150px",
    },
    {
      name: "Department",
      selector: (row) => row.department?.dep_name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleShowViewModal(row)}
            className="bg-view text-white p-2 rounded-lg hover:bg-green-600"
          >
            View
          </button>
          <Link
            to={`/admin-dashboard/edit-employee/${row.userId}`}
            className="bg-edit text-white p-2 rounded-lg hover:bg-orange-600"
          >
            Edit
          </Link>
          <Link
            to={`/admin-dashboard/employee/salary/${row.userId}`}
            className="bg-accent text-white p-2 rounded-lg hover:bg-yellow-600"
          >
            Salary
          </Link>
          <button
            onClick={() => handleDeleteEmployee(row.userId)}
            className="bg-delete text-white p-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
      width: "280px",
      center: true,
    },
  ];

  if (loading && user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // You can implement search later
          className="px-4 py-1 border rounded ml-5"
          placeholder="Search By Name, ID, Role, or Department"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-6 py-1 mr-5 text-white rounded bg-primary hover:bg-secondary font-semibold"
        >
          Add New Employee
        </Link>
      </div>

      <div className="overflow-hidden">
        <DataTable
          highlightOnHover
          selectableRows
          pagination
          columns={columns}
          data={employees}
          fixedHeader
          fixedHeaderScrollHeight="500px"
          responsive
        />
      </div>

      {/* Modal */}
      {showViewModal && (
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
                  <img
                    src={`http://localhost:5001/uploads/${selectedEmployee?.profileImage}`}
                    width={70}
                    alt=""
                  />
                  <p>
                    <strong>Name:</strong> {selectedEmployee?.emp_name}
                  </p>
                  <p>
                    <strong>Employee_Id:</strong> {selectedEmployee?.employeeId}
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    {selectedEmployee?.department?.dep_name || "N/A"}
                  </p>
                  <p>
                    <strong>Joining Date:</strong> {joiningDate || "N/A"}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedEmployee?.role || "N/A"}
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

export default List;
