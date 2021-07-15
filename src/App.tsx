import "./styles.css";
import CustomForm from "./components/CustomForm";
import customFormData from "./data/form";
import bigForm from "./data/bigForm";

export default function App() {
  console.log("Number of fields: ", bigForm.fields.length);
  return (
    <div className="App">
      <CustomForm customFormData={customFormData} />
    </div>
  );
}
