type BaseField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  default?: string;
  regex?: string;
  conditional?: { field: string; value: any };
};

type CheckboxField = BaseField & {
  type: "checkbox";
  options?: Array<{ label: string; checked: boolean }>;
};

type RadioField = BaseField & {
  type: "radio";
  options?: Array<{ label: string; value: string }>;
};

type SelectField = BaseField & {
  type: "select";
  options?: Array<{ label: string; value: string }>;
};

export type Field = BaseField | CheckboxField | RadioField | SelectField;

export type Endpoint = {
  method: string;
  url: string;
};

export type Form = {
  title: string;
  subtitle: string;
  name: string;
  fields: Array<Field>;
  endpoint: Endpoint;
};
