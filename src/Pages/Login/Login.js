import React from "react";
import { useForm } from "react-hook-form";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../Firebase.init";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  console.log(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
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
                  {minLength:{
                    value: 6,
                    message: "Provide atleast 6 digit",
                  }}
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

            <input type="submit" className="btn  w-full max-w-xs" value="Login"/>
          </form>

          <div className="divider">OR</div>
          <button
            className="btn btn-outline"
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;