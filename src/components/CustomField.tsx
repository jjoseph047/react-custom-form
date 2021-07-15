export default ({ field, fieldChanged, valid }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input
        type={field.type}
        name={field.name}
        value={field.value}
        required={field.required}
        style={{ borderColor: valid ? "none" : "red" }}
        onChange={(e) => fieldChanged(field.name, e.target.value)}
      />
      <br />
    </>
  );
};
