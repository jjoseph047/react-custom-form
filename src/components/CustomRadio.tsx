export default ({ field, fieldChanged, value }) => {
  const validator = new RegExp(field.regex);
  validateInput(validator.test(field.value));
  return (
    <>
      <p>{field.label}</p>
      {field.options.map((option) => (
        <span key={option.value}>
          <label htmlFor={option.value}>
            <input
              type="radio"
              name={field.name}
              value={option.value}
              required={field.required}
              checked={value === option.value}
              onChange={(e) => {
                fieldChanged(field.name, e.target.value);
              }}
            />
            {option.label}
          </label>
        </span>
      ))}
    </>
  );
};
