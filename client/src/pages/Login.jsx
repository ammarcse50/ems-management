import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className=" bg-gradient-to-r from-green-400 to-slate-500 w-full h-full">
        <h2 className="text-center relative top-10 font-bold font-roslindale lg:text-5xl md:text-4xl text-3xl ">Employee Management System</h2>
      <div className="card  bg-base-100 mx-auto top-[10vh] md:top-[20vh]  w-full max-w-md shrink-0 shadow-2xl">
        <form className="card-body  ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered focus:outline-none  border focus:border-green-500  rounded-none"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
                   className="input input-bordered focus:outline-none  border focus:border-green-500  rounded-none"
              required
            />
           
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-teal-500 hover:bg-[#4bdb81] text-white font-semibold text-xl">Login</button>
          </div>
          <div className="flex justify-between">
             <label htmlFor="check" className="flex gap-1 items-center">
           
                  <input type="checkbox" name="remember" id="remember
                  " />
                   <span>Remember me</span>
             </label>
            <Link className="text-teal-600">forget password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;