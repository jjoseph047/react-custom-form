export default ({ field, fieldChanged }) => {
  const validator = new RegExp(field.regex);
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <textarea
        name={field.name}
        value={field.value}
        required={field.required}
        onChange={(e) => fieldChanged(field.name, e.target.value)}
      />
      <br />
    </>
  );
};
