import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useSignupMutation,
} from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { EGender, IRegisterPayload } from "../../../interfaces/Login";
import { ICountry, IState } from "../../../interfaces/Location";
import { useGetCitiesByCountryQuery, useGetCountriesQuery } from "../../../api/location";

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email chưa đúng định dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất 6 kí tự"),
  repeatPassword: yup
    .string()
    .required("Vui lòng xác nhận lại mật khẩu")
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không khớp với mật khẩu"),
  name: yup.string(),
  country: yup.string(),
  sex: yup.string(),
  city: yup.string(),
});

const Register = () => {
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [cities, setCities] = useState<IState[]>([]);

  const {
    data: countriesData,
    error: countriesError,
    isLoading: countriesLoading,
  } = useGetCountriesQuery({});
  const {
    data: citiesData,
    error: citiesError,
    isLoading: citiesLoading,
  } = useGetCitiesByCountryQuery(selectedCountry || 0);

  useEffect(() => {
    console.log(countriesData, citiesData);
    
    if (countriesData) {
      setCountries(countriesData.data);
    }
    if (citiesData) {
      setCities(citiesData.data);
    }
  }, [countriesData, citiesData]);

  const [signup] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  type FormValues = {
    fullName?: string;
    country?: string;
    sex?: string;
    city?: string;
    email: string;
    password: string;
    repeatPassword: string;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { repeatPassword, ...signupData } = data;

    const response: any = await signup({
      ...signupData,
      repeatPassword,
    });

    if (!response?.error) {
      Swal.fire("Good job!", "Đăng kí thành công", "success");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: response?.error.data.message,
      });
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-box">
          <div className="input-box">
            <input
              {...register("name")}
              type="text"
              className="input-field"
              placeholder="Họ"
              id="First name"
            />
            <p className="error">{errors.name ? errors?.name.message : ""}</p>
          </div>

          <div className="input-box">
            <input
              {...register("email")}
              type="text"
              className="input-field"
              placeholder="Email"
              id="email"
            />
            <p className="error">{errors.email ? errors?.email.message : ""}</p>
          </div>
          <div className="input-box">
            <input
              {...register("password")}
              type="password"
              className="input-field"
              placeholder="Mật khẩu"
              id="password"
            />
            <p className="error">
              {errors.password ? errors?.password.message : ""}
            </p>
          </div>

          <div className="input-box">
            <input
              {...register("repeatPassword")}
              type="password"
              className="input-field"
              placeholder="Nhập lại mật khẩu"
            />
            <p className="error">
              {errors.repeatPassword ? errors?.repeatPassword.message : ""}
            </p>
          </div>
          <div className="input-box">
            <select
              {...register("country")}
              className="input-field"
              onChange={(e) => setSelectedCountry(parseInt(e.target.value))}
            >
              <option value="">Quốc gia</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <p className="error">
              {errors.country ? errors?.country.message : ""}
            </p>
          </div>

          <div className="input-box">
            <select {...register("sex")} className="input-field">
              <option value="">Chọn giới tính</option>
              <option>{EGender.Male}</option>
              <option>{EGender.Female}</option>
            </select>
            <p className="error">{errors.sex ? errors?.sex.message : ""}</p>
          </div>

          <div className="input-box">
            <select {...register("city")} className="input-field">
              <option value="">Chọn thành phố</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <p className="error">{errors.city ? errors?.city.message : ""}</p>
          </div>

          <div className="forgot">
            <section>
              <a href="/forgot" className="forgot-link">
                Quên mật khẩu?
              </a>
            </section>
          </div>
          <div className="input-box">
            <button type="submit" className="input-submit">
              Đăng ký
            </button>
          </div>
          <div className="sign-up">
            <p>
              Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
