import { LoginUser } from "../../api/ApiGetInformation";
import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../hooks/useValidators";

import Button from "../buttons/Button";
import CommonInput from "./common-input";
import SvgGoogle from "../../svg/socialmedia/SvgGoogle";

export default function Form() {
  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: null,
    password: null,
    general: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend(true);

    const checkEmail = validateEmail(formData.email);
    const checkPassword = validatePassword(formData.password);

    if (checkEmail || checkPassword) {
      setError({ email: checkEmail, password: checkPassword });
      return;
    }

    try {
      const response = await LoginUser({ identifier: formData.email, password: formData.password });

      if (response.error) {
        setError({ general: response.error.error?.message });
        setIsSend(false);
      } else {
        setIsSend(false);
        localStorage.setItem("token", response.jwt);
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.href = "/";
      }
    } catch (error) {
      setError({ general: "error login user try again" });
    }
  };

  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      setError({ general: error });
    }
  }, []);

  return (
    <div>
      <form className='grid gap-[24px]' onSubmit={handleSubmit}>
        <CommonInput label='Email address' type='email' placeholder='example@gmail.com' name='email' onChange={handleChange} error={error.email} />
        <CommonInput label='Password' type='password' placeholder='must be 8 characters' name='password' onChange={handleChange} error={error.password} />
        {error.general && <p className='text-pink_two text-[14px] font-inter font-[400] pt-[7px]'>{error.general}</p>}
        <a className='text-[14px] font-inter font-[400] ml-auto text-white py-[14px]' href='/forgot'>
          Forgot password?
        </a>
        <Button client:visible text='Sign in' style={`text-white w-full ${isSend ? "opacity-50 cursor-not-allowed" : ""}`} type_button={2} onClick={null} />
      </form>

      <div className='flex items-center justify-center w-full  pt-[38px] '>
        <div className='w-full border bg-white'></div>
        <p className='px-4 w-full text-white text-[14px] font-inter font-[400] whitespace-nowrap'>Other sign in options</p>
        <div className='w-full border bg-white'></div>
      </div>

      <div className='w-[50px] m-auto pt-[23px]'>
        <a href='https://kind-courtesy-production.up.railway.app/api/connect/google'>
          <SvgGoogle />
        </a>
      </div>
    </div>
  );
}
