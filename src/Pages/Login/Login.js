import React from "react";
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../Firebase.init";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

 
  if (user || gUser) {
    console.log(user||gUser)
  }
  
  if (loading || gLoading) {
   return <Loading></Loading>
  };

  let signInError;
  if (error||gError) {
    signInError = <p className="text-red-500">{error?.message|| gError?.message}</p>
    
  }


  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password)
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          {/* login form start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Write Your Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full max-w-xs"
                {...register(
                  "email",
                  {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  },
                  {
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "Provide a valid email",
                  }
                )}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Write Your Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered w-full max-w-xs"
                {...register(
                  "password",
                  {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  },
                  {
                    minLength: {
                      value: 6,
                      message: "Provide atleast 6 digit",
                    },
                  }
                )}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            <input
              type="submit"
              className="btn  w-full max-w-xs"
              value="Login"
            />
          </form>

          {/* login form end    */}
          <div className="divider">OR</div>
          <button
            className="btn btn-outline"
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </button>
          <p>New to doctors-portal ? <Link className="text-primary" to="/registration"> Create an account</Link></p>
          {signInError} 
        </div>
      </div>
    </div>
  );
};

export default Login;
