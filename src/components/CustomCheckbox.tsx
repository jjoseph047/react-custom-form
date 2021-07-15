export default ({ field, fieldChanged }) => {
  const handleCheckboxChange = (index: number) => {
    const options = field.options;
    options[index].checked = !options[index].checked;
    fieldChanged(field.name, options);
  };
  return (
    <>
      <label>{field.label}</label>
      <br />
      {field.options.map((option, index) => (
        <label key={option.value} htmlFor={option.value}>
          <input
            type="checkbox"
            name={option.value}
            value={option.value}
            checked={option.checked}
            onChange={(e) => {
              handleCheckboxChange(index);
            }}
          />
          {option.label}
        </label>
      ))}
      <br />
    </>
  );
};
