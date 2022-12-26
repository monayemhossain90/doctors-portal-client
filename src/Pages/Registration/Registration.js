import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../Firebase.init";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (user || gUser) {
    console.log(user || gUser);
  }

  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }

  let signInError;
  if (error || gError || UpdateError) {
    signInError = (
      <p className="text-red-500">{error?.message || gError?.message}</p>
    );
  }

  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    
    navigate("/appointment")
  };

  return (
    <div className="flex justify-center items-center h-screen my-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Register Now</h2>
          {/* registration form start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

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
              value="Register"
            />
          </form>

          {/* registration  form end    */}
          <div className="divider">OR</div>
          <button
            className="btn btn-outline"
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </button>
          <p>
            Already have an account ?{" "}
            <Link className="text-primary" to="/login">
              {" "}
              Login
            </Link>
          </p>
          {signInError}
        </div>
      </div>
    </div>
  );
};

export default Registration;
