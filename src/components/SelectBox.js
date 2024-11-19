const Select = (props) => {
  return (
    <select
      name={props.name}
      onChange={props.onChange}
      key={props.defaultValue}
      defaultValue={props.defaultValue}
    >
      {props.optionList.map((data) => {
        return (
          <option key={data.value} value={data.value}>
            {data.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
