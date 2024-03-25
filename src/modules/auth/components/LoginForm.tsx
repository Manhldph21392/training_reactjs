import Swal from "sweetalert2";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "../../../api/auth";
import { setUser } from "../../../slices/userSlices";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email chưa đúng định dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất 6 kí tự"),
});

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [signin] = useSigninMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignin = async (data: { email: string; password: string }) => {
    try {
      const response = await signin(data);
      if ("error" in response) {
        Swal.fire({
          icon: "error",
          title: response.error,
        });
      } else {
        Swal.fire("Good job!", "Đăng nhập thành công", "success");
        localStorage.setItem("token", response.data.data.token);

        dispatch(setUser(response.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit(onSignin)}>
        <div className="login-box">
          <div className="login-header">
            <h4>ĐĂNG NHẬP</h4>
          </div>
          <div className="input-box">
            <input
              {...register("email")}
              type="text"
              className="input-field"
              placeholder="Email"
              id="email"
            />
            <p className="error">{errors.email ? errors.email.message : ""}</p>
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
              {errors.password ? errors.password.message : ""}
            </p>
          </div>

          <div className="input-box">
            <button type="submit" className="input-submit">
              Đăng nhập
            </button>
          </div>
          <div className="sign-up">
            <p>
              Bạn chưa có tài khoản? <a href="/signup">Đăng ký</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
