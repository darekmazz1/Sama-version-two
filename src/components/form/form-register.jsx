import Button from "../buttons/Button";
import CommonInput from "./common-input";
import SvgGoogle from "../../svg/socialmedia/SvgGoogle";
import { useState } from "react";
import { RegisterUser } from "../../api/ApiGetInformation";
import { validateEmail, validateName, validatePassword } from "../../hooks/useValidators";

export default function FormRegister() {
  const [isSend, setIsSend] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    general: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend(true);

    let recaptchaToken = null;
    try {
      recaptchaToken = await window.grecaptcha.execute("6LerrJYsAAAAACrAOsqqnDmS2TngLxvnfs59cXDP", { action: "register" });
    } catch {
      setError({ general: "Error de verificación, intenta de nuevo" });
      setIsSend(false);
      return;
    }
    const checkFirstName = validateName(formData.firstName);
    const checkLastName = validateName(formData.lastName);
    const checkEmail = validateEmail(formData.email);
    const checkUsername = validateName(formData.username);
    const checkPassword = validatePassword(formData.password);
    const samePassword = formData.password === formData.confirmPassword;

    if (checkFirstName || checkLastName || checkEmail || checkUsername || checkPassword || !samePassword) {
      setError({
        firstName: checkFirstName,
        lastName: checkLastName,
        email: checkEmail,
        username: checkUsername,
        password: checkPassword,
        confirmPassword: !samePassword ? "Las contraseñas no coinciden" : null,
      });
      setIsSend(false);
      return;
    }

    try {
      const response = await RegisterUser({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        recaptchaToken,
      });

      if (response.error) {
        const msg =
          response.error.error?.message || response.error.message || "Error al registrarse, intenta de nuevo";
        setError({ general: msg });
        setIsSend(false);
        setSuccess(false);
      } else {
        setIsSend(false);
        setSuccess(true);
      }
    } catch (err) {
      setError({ general: "Error al registrarse, intenta de nuevo" });
      setIsSend(false);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <form className='grid gap-[24px]' onSubmit={handleSubmit}>
            <CommonInput
              label='First Name'
              type='text'
              placeholder='John'
              name='firstName'
              onChange={handleChange}
              error={error.firstName}
            />
            <CommonInput
              label='Last Name'
              type='text'
              placeholder='Doe'
              name='lastName'
              onChange={handleChange}
              error={error.lastName}
            />
            <CommonInput
              label='Email address'
              type='email'
              placeholder='example@gmail.com'
              name='email'
              onChange={handleChange}
              error={error.email}
            />
            <CommonInput
              label='Username'
              type='text'
              placeholder='username'
              name='username'
              onChange={handleChange}
              error={error.username}
            />
            <CommonInput
              label='Create password'
              type='password'
              placeholder='must be 8 characters'
              name='password'
              onChange={handleChange}
              error={error.password}
            />
            <CommonInput
              label='Confirm password'
              type='password'
              placeholder='repeat password'
              name='confirmPassword'
              onChange={handleChange}
              error={error.confirmPassword}
            />

            <p className='text-pink_two text-[14px] font-inter font-[400] pt-[7px]'>{error.general}</p>
            <div className='pt-[38px]'>
              <Button
                client:visible
                text='Register'
                style={`text-white w-full ${isSend ? "opacity-50 cursor-not-allowed" : ""}`}
                type_button={2}
                onClick={null}
              />
            </div>
          </form>

          <div className='flex items-center justify-center w-full  pt-[38px] '>
            <div className='w-full border bg-white'></div>
            <p className='px-4 w-full text-white text-[14px] font-inter font-[400] whitespace-nowrap'>
              Or Register with
            </p>
            <div className='w-full border bg-white'></div>
          </div>

          <div className='w-[50px] m-auto pt-[23px]'>
            <a href='https://kind-courtesy-production.up.railway.app/api/connect/google'>
              <SvgGoogle />
            </a>
          </div>

          <p className='text-center text-[14px] font-inter font-[400] text-white pt-[53px]'>
            Already have an account?
            <a href='/login' className='text-white underline pl-[3px] font-[700]'>
              Login
            </a>
          </p>
        </>
      ) : (
        <>
          <p className='text-[36px] font-[400] leading-[120%] font-playfair text-white md:text-center'>
            Please check your email
          </p>
          <p className='text-white font-roboto text-[16px] leading-[150%] font-[400] pt-[21px] md:text-center'>
            We’ve sent a link to <span className='text-light_pruple_hover'> {formData.email}</span>
          </p>
        </>
      )}
    </>
  );
}
