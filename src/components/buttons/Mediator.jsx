import useStoreModalShare from '../../store/useStoreModalShare';
import SvgShare from '../../svg/SvgShare';

const Mediator = ({ data, idEvent }) => {
  const { toggleState, setTitle, setDescription, setUrl } = useStoreModalShare();
  return (
    <div
      onClick={() => {
        toggleState();
        setTitle(data?.event_title);
        setDescription(data?.artists_performing);
        setUrl(`https://seattle.samamusicarts.org/event/${idEvent}`);
      }}
      class='w-[50px]'
    >
      <SvgShare />
    </div>
  );
};

export default Mediator;
