export default function CommonInput({ label, type, placeholder, name, onChange, error }) {
  return (
    <label className='w-full'>
      <p className='text-white font-inter text-[14px] font-[400] pb-[7px]'>{label}</p>
      <input
        className={`block  text-[16px] bg-blue_two font-inter px-3 py-[10px] rounded-[8px] w-full text-white ${error ? "border_pink" : "border"}`}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {error && <p className='text-pink_two text-[14px] font-inter font-[400] pt-[7px]'>{error}</p>}
    </label>
  );
}
