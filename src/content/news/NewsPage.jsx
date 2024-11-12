import { useState, useRef, useEffect } from 'react';
import NewsCard from '../../components/news/NewsCard';
import useWindowWidth from '../../hooks/useWindowWidth';
import SvgArrow from '../../svg/news/SvgArrow';

const NewsPage = ({ data }) => {
  const responsive = useWindowWidth();

  const map_data = data?.data;

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(map_data.length / itemsPerPage);
  const paginatedData = map_data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const buttonRefs = useRef([]);

  useEffect(() => {
    if (buttonRefs.current[page - 1]) {
      buttonRefs.current[page - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className='text-white container_all min-h-full'>
      <div className='  md:h-[1600px] xl:h-[1000px]'>
        <div className='grid gap-[16px] mt-[40px] md:mt-[20px] md:grid-cols-2 xl:grid-cols-3 md:gap-[40px] '>
          {paginatedData.map((data, index) => (
            <NewsCard key={index} data={data} />
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between mt-[56px]'>
        <ArrowPagination style='rotate-[180deg]' onClick={() => page > 1 && setPage(page - 1)} text={'Previous'} responsive={responsive} />

        {responsive >= 768 && (
          <div className='flex justify-center gap-[8px] overflow-auto  w-[80%]'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} ref={(el) => (buttonRefs.current[index] = el)} className={` text-[18px] rounded py-[6px] px-[12px] ${page === index + 1 ? ' border  rounded-none ' : ''}`} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
        <ArrowPagination style={'order-1'} onClick={() => page < totalPages && setPage(page + 1)} text={'Next'} responsive={responsive} />
      </div>
    </section>
  );
};

const ArrowPagination = ({ style, onClick, text, responsive }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='w-[44px] h-[44px]  md:w-[150px] md:h-auto md:py-[8px] md:px-[20px] md:gap-[12px] text-black hover:bg-purple transition-all duration-300  hover:text-white cursor-pointer md:bg-white flex justify-center items-center rounded-[8px] border'
    >
      <div className={`w-[24px] md:w-[30px] md:translate-y-[-1px] ${style}`}>
        <SvgArrow type={2} color={!isHovered ? (responsive < 768 ? 'white' : 'black') : 'white'} />
      </div>

      {responsive >= 768 && <p className='text-[16px] font-roboto'>{text}</p>}
    </div>
  );
};

export default NewsPage;
