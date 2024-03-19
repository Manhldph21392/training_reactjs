// import React, { useState } from "react";
// import { Action } from "redux";
// import { useDispatch } from "react-redux";
// import { ThunkDispatch } from "redux-thunk";
// import { ILoginParams } from "../../../interfaces/Login";
// import LoginForm from "../components/LoginForm";

// type Props = {};

// const LoginPage = (props: Props) => {
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // Hàm xử lý đăng nhập
//   const handleLogin = (loginParam: ILoginParams) => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       const isSuccess = true;
//       if (isSuccess) {
//         console.log("Đăng nhập thành công!");
//       } else {
//         setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại!");
//       }
//     }, 1000);
//   };

//   return (
//     <div>
//       {/* Render LoginForm và truyền hàm handleLogin vào prop onLogin */}
//       <LoginForm
//         onLogin={handleLogin}
//         loading={loading}
//         errorMessage={errorMessage}
//       />
//     </div>
//   );
// };

// export default LoginPage;
