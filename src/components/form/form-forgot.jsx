import { useState } from "react";
import CommonInput from "./common-input";
import Button from "../buttons/Button";
import { SendRecoveryPassword } from "../../api/ApiGetInformation";
import { validateEmail } from "../../hooks/useValidators";

export default function FormForgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend(true);
    setSuccess(false);
    const checkEmail = validateEmail(email);

    if (checkEmail) {
      setError(checkEmail);
      return;
    } else {
      setError(null);
    }

    const response = await SendRecoveryPassword({ email });

    if (response.ok) {
      setIsSend(false);
      setSuccess(true);
    } else {
      setError(response.error);
      setIsSend(false);
      setSuccess(false);
    }
  };

  return (
    <div className=''>
      {!success ? (
        <>
          <h1 class='text-[36px] font-[400] leading-[120%]'>Forgot password?</h1>
          <p class='text-[16px] pt-[21px] font-roboto'>Don’t worry! It happens. Please enter the email associated with your account</p>
          <form className='py-[39px]' onSubmit={handleSubmit}>
            <CommonInput label={"Email address"} type={"email"} placeholder='example@gmail.com' name='email' onChange={(e) => setEmail(e.target.value)} error={error} />
            <div className='pt-[39px]'>
              <Button client:visible text='Continue' style={`text-white w-full ${isSend ? "opacity-50 cursor-not-allowed" : ""}`} type_button={2} onClick={null} />
            </div>
          </form>
        </>
      ) : (
        <>
          <p className='text-[36px] font-[400] leading-[120%] font-playfair text-white'>Please check your email</p>
          <p className='text-white font-roboto text-[16px] leading-[150%] font-[400] pt-[21px]'>
            We’ve sent a link to <span className='text-light_pruple_hover'> {email}</span>
          </p>
        </>
      )}
    </div>
  );
}
