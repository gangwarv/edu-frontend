import input from "./input";
import select from "./select";
import checkbox from "./checkbox";
import CDatepicker from "./datepicker";
import CTimepicker from "./timepicker";
import CMultiselect from "./multiselect";

import { withValidation } from "vee-validate";

// console.log(VCDatepicker)
let controls = [
  input,
  select,
  checkbox,
  CDatepicker,
  CTimepicker,
  CMultiselect,
];

let vControls = controls.map((control) => {
  const ctrl = withValidation(control);
  ctrl.name = "V" + control.name.substr(1);
  // console.log(control.name)
  return ctrl;
});

export default controls.concat(vControls)
// .concat([
//     withValidation(input, ({ disabled }) => ({ disabled }))
// ]);
