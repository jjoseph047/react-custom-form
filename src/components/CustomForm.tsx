import { useEffect, useState } from "react";
import CustomField from "./CustomField";
import CustomRadio from "./CustomRadio";
import CustomCheckbox from "./CustomCheckbox";
import CustomTextArea from "./CustomTextArea";
import CustomSelect from "./CustomSelect";
import { Form } from "../data/formModel";

export default ({ customFormData }: { customFormData: Form }) => {
  const [formData, setFormData] = useState(customFormData);
  const [values, setValues] = useState({});
  const [valid, setValid] = useState({});
  useEffect(() => {
    setValues((currentValues) => {
      const newValues = formData.fields.reduce((obj, field) => {
        if (field.type === "checkbox") {
          // @ts-ignore
          obj[field.name] = field.options;
        } else {
          // @ts-ignore
          obj[field.name] = field.default;
        }
        return obj;
      }, {});
      return Object.assign({}, newValues, currentValues);
    });
    setValid((currentValues) => {
      const newValues = formData.fields.reduce((obj, field) => {
        // @ts-ignore
        obj[field.name] = true;
        return obj;
      }, {});
      return Object.assign({}, newValues, currentValues);
    });
  }, [formData]);
  const validateInput = () => {
    let invalidFields: string[] = [];
    formData.fields.forEach((field) => {
      if (field.regex) {
        const validator = new RegExp(field.regex);
        // @ts-ignore
        if (!validator.test(values[field.name])) {
          invalidFields.push(field.name);
        }
      }
    });
    return invalidFields;
  };
  const handleSubmit = (event) => {
    const invalidFields = validateInput();
    if (invalidFields.length > 0) {
      alert(`Some fields have invalid input:  ${invalidFields}`);
    } else {
      alert(`A name was submitted
      ${JSON.stringify(values)}
      ${formData.endpoint.method}
      ${formData.endpoint.url}`);
      console.log(JSON.stringify(values));
    }
    event.preventDefault();
  };
  const fieldChanged = (fieldName, value) => {
    setValues((currentValues) => {
      // @ts-ignore
      currentValues[fieldName] = value;
      return currentValues;
    });
    setFormData((formData) => {
      return Object.assign({}, formData);
    });
  };
  const fieldMeetsCondition = (field) => {
    if (field.conditional && field.conditional.field) {
      // @ts-ignore
      return values[field.conditional.field] === field.conditional.value;
    }
    return true;
  };
  return (
    <form onSubmit={handleSubmit}>
      {formData.fields.map((field) => {
        if (!fieldMeetsCondition(field)) {
          return <></>;
        }
        if (field.type === "radio") {
          return (
            <CustomRadio
              key={field.name}
              field={field}
              fieldChanged={fieldChanged}
              // @ts-ignore
              value={values[field.name]}
            />
          );
        } else if (field.type === "checkbox") {
          return (
            <CustomCheckbox
              key={field.name}
              field={field}
              fieldChanged={fieldChanged}
            />
          );
        } else if (field.type === "textarea") {
          return (
            <CustomTextArea
              key={field.name}
              field={field}
              fieldChanged={fieldChanged}
            />
          );
        } else if (field.type === "select") {
          return (
            <CustomSelect
              key={field.name}
              field={field}
              fieldChanged={fieldChanged}
              // @ts-ignore
              value={values[field.name]}
            />
          );
        }
        return (
          <CustomField
            key={field.name}
            field={field}
            fieldChanged={fieldChanged}
            // @ts-ignore
            valid={true}
          />
        );
      })}
      <input type="submit" value="Submit" />
    </form>
  );
};
