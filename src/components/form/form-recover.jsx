import { validatePassword } from "../../hooks/useValidators";
import Button from "../buttons/Button";
import CommonInput from "./common-input";
import { resetPassword } from "../../api/ApiGetInformation";
import { useState, useEffect } from "react";

export default function FormRecover() {
  const [password, setPassword] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState({ password: "", confirmPassword: "", general: "" });
  const [code, setCode] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCode(urlParams.get("code"));
  }, []);

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend(true);

    const checkPassword = validatePassword(password.password);
    const checkIsEqualPassword = password.password === password.confirmPassword;

    if (checkPassword || !checkIsEqualPassword) {
      setError({
        password: checkPassword,
        confirmPassword: !checkIsEqualPassword ? "The passwords do not match" : null,
      });
      setIsSend(false);
      return;
    }

    const response = await resetPassword({
      password: password.password,
      passwordConfirmation: password.confirmPassword,
      code: code,
    });

    if (response.error) {
      setError({ general: response.error.error?.message });

      setIsSend(false);
      setSuccess(false);
      return;
    } else {
      setIsSend(false);
      setSuccess(true);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <h1 className='text-[36px] font-[400] leading-[120%]'>Reset password</h1>
          <p className='text-[16px] pt-[21px] font-roboto'>Please type something you'll remember</p>
          <form className='py-[39px] flex gap-[10px] flex-col ' onSubmit={handleSubmit}>
            <CommonInput label={"Create a password"} type={"password"} placeholder='Must be 8 characteres' name='password' onChange={handleChange} error={error.password} />
            <CommonInput label={"Confirm password"} type={"password"} placeholder='Repeat password' name='confirmPassword' onChange={handleChange} error={error.confirmPassword} />
            <p className='text-pink_two text-[14px] font-inter font-[400] pt-[7px]'>{error.general}</p>
            <div className='pt-[39px]'>
              <Button client:visible text='Reset password' style={`text-white w-full ${isSend ? "opacity-50 cursor-not-allowed" : ""}`} type_button={2} onClick={null} />
            </div>
          </form>
        </>
      ) : (
        <>
          <p className='text-[36px] font-[400] leading-[120%] font-playfair text-white md:text-center'>Password changed</p>
          <p className='text-white font-roboto text-[16px] leading-[150%] font-[400] pt-[21px] pb-[40px] md:text-center'>Your password has been changed succesfully</p>

          <div className='max-w-[300px] m-auto'>
            <a href='/login'>
              <Button client:visible text='Login' style={`text-white w-full  `} type_button={2} onClick={null} />
            </a>
          </div>
        </>
      )}
    </>
  );
}
