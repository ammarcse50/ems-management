import axios from "axios";
import Swal from "sweetalert2";

const AddDepartment = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const dep_name = form.dep_name.value;

    const dep_desc = form.dep_desc.value;

    axios
      .post("http://localhost:5001/api/department/add", {
        dep_name,
        dep_desc,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          Swal.fire({
            position: "middle",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

    form.reset();
  };

  return (
    <div className="mt-10">
      <div className="card bg-base-100 w-full mx-auto max-w-md shrink-0 shadow-2xl">
        <h2 className="text-center mt-10 font-bold text-3xl lg:text-4xl">
          Add Department
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Department Name</span>
            </label>
            <input
              name="dep_name"
              placeholder="Enter Department Name"
              className="hover:border-green-600 border-2 pl-4"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Department Description</span>
            </label>
            <textarea
              rows={5}
              name="dep_desc"
              placeholder="Enter Department Description"
              className="hover:border-green-600 border-2 pl-4"
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-800 font-semibold text-white"
            >
              Add New Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
