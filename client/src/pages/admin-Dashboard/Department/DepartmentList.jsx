import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import useDepartments from "../../../hooks/FetchDepartment";
import { useAuth } from "../../../context/AuthContext";

const DepartmentList = () => {
  // const [departments, setDepartment] = useState([]);
  const { user, loading } = useAuth();
  const baseUrl = import.meta.env.VITE_EMS_Base_URL;
  const {
    data: departments,
    refetch,


  } = useDepartments(baseUrl);

  const handleDelete = async (rowId) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/department/deleteDep/${rowId}`
      );

      if (res.data.success === true || res.data.status === 200) {
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Department deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "3px 5px",
    marginRight: "5px",
    cursor: "pointer",
    borderRadius: "4px",
  };

  // Columns of table
  const columns = [
    {
      name: "S No",
      selector: (row, ind) => ind + 1,
      sortable: true,
    },

    {
      name: "Department",
      selector: (row) => row.dep_name,
      sortable: true,
    },
    {
      name: "Manager",
      selector: (row) => row.manager?.emp_name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`http://localhost:5001/uploads/${row.manager?.profileImage}`}
          width={30}
          className="rounded-full"
          alt=""
        />
      ),
      sortable: true,
      width: "180px",
    },
    {
      name: "Total Employees",
      selector: (row) => row.employeeCount,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            to={`/admin-dashboard/edit-department/${row._id}`}
            style={buttonStyle}
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
            style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
          >
            Delete
          </button>
        </>
      ),
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
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="px-4 ml-5 py-0.5"
          placeholder="Search By Name"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-6 py-1 mr-5 text-white rounded bg-primary hover:bg-secondary font-semibold"
        >
          Add New Department
        </Link>
      </div>

      <div>
        <DataTable
          progressPending={loading}
          highlightOnHover
          selectableRows
          pagination
          columns={columns}
          data={departments}
        />
      </div>
    </div>
  );
};

export default DepartmentList;
