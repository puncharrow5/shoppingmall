import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const userEmail = {
    required: "이메일을 입력해주세요.",
  };

  const userName = {
    required: "이름을 입력해주세요.",
  };

  const userPassword = {
    required: "패스워드를 입력해주세요.",
    minLength: {
      value: 8,
      message: "패스워드는 최소 8자 이상입니다.",
    },
  };

  const dispatch = useDispatch();

  const onSubmit = ({ email, name, password }) => {
    const body = {
      email,
      name,
      password,
      image:
        "https://cdn-icons-png.flaticon.com/512/634/634012.png?w=740&t=st=1690868536~exp=1690869136~hmac=780beac6192f9cd56d6f8eb768c6a77f777a86426abec71ee770d98aba18a6d1",
    };

    dispatch(registerUser(body));

    reset();
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center ">회원가입</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-800 "
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div>
                <span className="text-red-500">{errors.email.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-800 "
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("name", userName)}
            />
            {errors?.name && (
              <div>
                <span className="text-red-500">{errors.name.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-800 "
            >
              패스워드
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span className="text-red-500">{errors.password.message}</span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-md hoverLbg-gray-700 duration-200"
            >
              회원가입
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            아이디가 있다면?{" "}
            <a href="/login" className="font-bold text-black hover:underline">
              로그인
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
