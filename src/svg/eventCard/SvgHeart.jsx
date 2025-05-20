export default function SvgHeart({ isLiked }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill={isLiked ? "white" : "none"} viewBox='0 0 32 32'>
      <g id='Heart - Multiple'>
        <g id='Mask group'>
          <mask id='mask0_54789_1091' width='25' height='2' x='3' y='26' maskUnits='userSpaceOnUse' style={{ maskType: "alpha" }}>
            <path id='Rectangle 1' fill='#D9D9D9' d='M3 26h25v2H3z'></path>
          </mask>
          <g mask='url(#mask0_54789_1091)'>
            <path
              id='Vector'
              fill='#fff'
              d='m16.713 26.488 10.124-10.125c2.488-2.5 2.85-6.588.5-9.2A6.5 6.5 0 0 0 17.9 6.9L16 8.813l-1.637-1.65c-2.5-2.488-6.588-2.85-9.2-.5A6.5 6.5 0 0 0 4.9 16.1l10.388 10.388a1.01 1.01 0 0 0 1.425 0'
              opacity='0.2'
            ></path>
          </g>
        </g>
        <path
          id='Vector_2'
          stroke='#fff'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m16.713 26.488 10.124-10.125c2.488-2.5 2.85-6.588.5-9.2A6.5 6.5 0 0 0 17.9 6.9L16 8.813l-1.637-1.65c-2.5-2.488-6.588-2.85-9.2-.5A6.5 6.5 0 0 0 4.9 16.1l10.388 10.388a1.01 1.01 0 0 0 1.425 0'
        ></path>
      </g>
    </svg>
  );
}
