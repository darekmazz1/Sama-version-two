import React from 'react';
import useStoreModalShare from '../../store/useStoreModalShare';
import SvgShare from '../../svg/SvgShare';

const Mediator = () => {
  const { toggleState, setTitle, setDescription, setUrl } = useStoreModalShare();
  return (
    <div onClick={toggleState} class='w-[50px]'>
      <SvgShare />
    </div>
  );
};

export default Mediator;
