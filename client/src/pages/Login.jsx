import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, WandSparkles  } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { axios, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      state === "login"
        ? "/api/user/login"
        : "/api/user/register";

    try {
      const { data } = await axios.post(url, {
        name,
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8 relative overflow-hidden">
      
    <div
className="
w-full
max-w-4xl
rounded-[32px]
overflow-hidden
border border-cyan-500/20
bg-[#06101f]


grid grid-cols-1 md:grid-cols-2
"
>   
       {/* LEFT SIDE */}
<div
  className="
  relative
  bg-[linear-gradient(135deg,#5B2DBD_0%,#47259A_20%,#2F1D73_45%,#1D1F57_70%,#0BBFBF_100%)]
  flex flex-col justify-center items-center text-center p-10
"
>  {/* Logo Card */}
   <div className="w-40 h-40 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
    <img
      src="/favicon.png"
      alt="QueryBot"
      className="w-24 h-24 object-contain"
    />
  </div> 
  {/* <div className="w-40 h-40 rounded-[30px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
    <WandSparkles size={80} className="text-white" />
  </div> */}
  {/* Heading */}
  <h1 className="text-[56px] font-extrabold text-white tracking-tight">
  QueryBot
</h1>

  {/* Subtitle */}
  <p className="mt-4 text-white/80 text-lg leading-relaxed">
    Your AI-Powered Assistant
    <br />
    for Smarter Solutions
  </p>

  {/* Features */}
  <div className="mt-12 space-y-6">
    <div className="flex items-center gap-3 text-white/90">
      <span className="text-purple-200 text-lg">⚡</span>
      <span>Fast & Smart</span>
    </div>

    <div className="flex items-center gap-3 text-white/90">
      <span className="text-purple-200 text-lg">🛡️</span>
      <span>Secure & Private</span>
    </div>

    <div className="flex items-center gap-3 text-white/90">
      <span className="text-purple-200 text-lg">💬</span>
      <span>24/7 Support</span>
    </div>
  </div>
</div>

        {/* ── RIGHT SIDE ── */}
        <div className="bg-[#07111f]/95 flex flex-col justify-center px-5 sm:px-8 lg:px-10 py-8 sm:py-10 text-white">

          <h2 className="text-3xl sm:text-4xl font-bold">
            {state === "login" ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          <p className="text-gray-400 text-sm mb-8">
            {state === "login"
              ? "Login to your account to continue"
              : "Create your QueryBot account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Field (Register only) */}
            {state === "register" && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-cyan-400 transition-all text-sm"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-cyan-400 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl py-3.5 pl-11 pr-12 text-white placeholder-gray-500 outline-none focus:border-cyan-400 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password (Login only) */}
            {state === "login" && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                  />
                  <span className="text-gray-400 text-sm">Remember me</span>
                </label>
                <span className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300 transition-colors">
                  Forgot password?
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-semibold text-base bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-cyan-500/20 mt-2"
            >
              {state === "login" ? "→ Login to Account" : "Create Account"}
            </button>

            {/* Switch Mode */}
            <p className="text-center text-gray-400 text-sm pt-1">
              {state === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <span
                onClick={() =>
                  setState(state === "login" ? "register" : "login")
                }
                className="text-cyan-400 ml-2 cursor-pointer hover:text-cyan-300 transition-colors"
              >
                {state === "login" ? "Create Account" : "Login"}
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useAppContext } from "../context/AppContext";

// const Login = () => {
//   const [state, setState] = useState("login");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const {axios,setToken}=useAppContext()
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url=state==="login"? '/api/user/login':'/api/user/register'
//     try {
//        const {data}=await axios.post(url,{name,email,password})
//        if(data.success){
//          setToken(data.token)
//          localStorage.setItem('token',data.token)
//        }else{
//         toast.error(data.message)
//        }
//     } catch (error) {
//         toast.error(error.message)
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//     >
//       <p className="text-2xl font-medium m-auto">
//         <span className="text-purple-700">User</span>{" "}
//         {state === "login" ? "Login" : "Sign Up"}
//       </p>
//       {state === "register" && (
//         <div className="w-full">
//           <p>Name</p>
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             placeholder="type here"
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
//             type="text"
//             required
//           />
//         </div>
//       )}
//       <div className="w-full ">
//         <p>Email</p>
//         <input
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           placeholder="type here"
//           className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
//           type="email"
//           required
//       />
//       </div>
//       <div className="w-full ">
//         <p>Password</p>
//         <input
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           placeholder="type here"
//           className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700"
//           type="password"
//           required
//         />
//       </div>
//       {state === "register" ? (
//         <p>
//           Already have account?{" "}
//           <span
//             onClick={() => setState("login")}
//             className="text-purple-700 cursor-pointer"
//           >
//             click here
//           </span>
//         </p>
//       ) : (
//         <p>
//           Create an account?{" "}
//           <span
//             onClick={() => setState("register")}
//             className="text-purple-700 cursor-pointer"
//           >
//             click here
//           </span>
//         </p>
//       )}
//       <button type="submit" className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
//         {state === "register" ? "Create Account" : "Login"}
//       </button>
//     </form>
//   );
// };

// export default Login;
