const FormRange = ({
  className,
  defaultValue,
  minValue,
  maxValue,
  name,
  value,
  onChange,
  ...otherProps
}) => {
  const allRanges = document.querySelectorAll('.range-wrap');
  allRanges.forEach((wrap) => {
    const range = wrap.querySelector('.range');
    const bubble = wrap.querySelector('.bubble');
    range.addEventListener('input', () => {
      setBubble(range, bubble);
    });
    setBubble(range, bubble);
  });

  function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = `€${val}`;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  }

  return (
    <div className='range-wrap relative mx-auto mt-0 mb-12'>
      <input
        name={name}
        type='range'
        className='range w-full h-[2px] relative bg-light appearance-none'
        min={minValue}
        max={maxValue}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
      <output className='bubble bg-red-500 text-white text-xl py-[4px] px-[12px] absolute top-[34px] rounded-[4px] left-1/2 -translate-x-1/2 after:absolute after:w-0 after:h-0 after:left-1/2 after:-top-[9px] after:-ml-[5px] after:border-l-[5px] after:border-l-transparent after:border-b-[10px] after:border-b-red-500 after:border-r-[5px] after:border-r-transparent'></output>
    </div>
  );
};

export default FormRange;
