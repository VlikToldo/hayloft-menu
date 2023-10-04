import { useState } from "react";
import FormAddKitchen from "../../components/Form/FormAddKitchen/FormAddKitchen";
import FormAddBar from "../../components/Form/FormAddBar/FormAddBar";
import { Button } from "react-bootstrap";
const AddProduct = () => {

  const [show, setShow] = useState({showFormBar: false, showFormKitchen: true});
const openFormBar = () => {
  setShow({showFormBar: true, showFormKitchen: false})
}

const openFormKitchen = () => {
  setShow({showFormBar: false, showFormKitchen: true})
}
  return (
    <div>
    <Button onClick={openFormBar}>Додати бар</Button>
    <Button onClick={openFormKitchen}>Додати кухню</Button>
    {show.showFormBar && <FormAddBar/>}
    {show.showFormKitchen && <FormAddKitchen/>}
    </div>
  );
};

export default AddProduct;
