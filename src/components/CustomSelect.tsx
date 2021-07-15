export default ({ field, fieldChanged, value }) => {
  const validator = new RegExp(field.regex);
  return (
    <>
      <label>{field.label}</label>
      <select
        name={field.name}
        value={value}
        required={field.required}
        onChange={(e) => {
          fieldChanged(field.name, e.target.value);
        }}
      >
        <option value="" disabled>
          Select your answer
        </option>
        {field.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
      <br />
    </>
  );
};
