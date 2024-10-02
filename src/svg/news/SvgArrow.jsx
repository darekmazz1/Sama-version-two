const SvgArrow = ({ type = 1, color }) => {
  return (
    <>
      {type === 1 ? (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
          <path d='M11.293 17.293L12.707 18.707L19.414 12L12.707 5.29297L11.293 6.70697L15.586 11H6V13H15.586L11.293 17.293Z' fill='white'></path>
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 24' fill='none'>
          <path d='M10.207 16.9492L15.914 11.2422L10.207 5.53516L8.79297 6.94916L13.086 11.2422L8.79297 15.5352L10.207 16.9492Z' fill={color} />
        </svg>
      )}
    </>
  );
};

export default SvgArrow;
