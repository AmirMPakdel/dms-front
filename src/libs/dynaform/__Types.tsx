import { DFButtonProps } from "./controllers/DFButton";
import { DFDatePickerProps } from "./controllers/DFDatePicker";
import { DFSelectProps } from "./controllers/DFSelect";
import { DFSpaceProps } from "./controllers/DFSpace";
import { DFTextInputProps } from "./controllers/DFTextInput";
import { DFTextAreaProps } from "./controllers/DFTextArea";
import { DFUploadProps } from "./controllers/DFUpload";

export interface DynaElement {
    controller: "button" | "datepicker" | "select" | "space" | "textarea" | "textinput" | "upload",
    id: string,
}

export interface DynaButton extends DynaElement, DFButtonProps  {
    controller: "button",
}

export interface DynaDatepicker extends DynaElement, DFDatePickerProps {
    controller: "datepicker",
}

export interface DynaSelect extends DynaElement, DFSelectProps {
    controller: "select",
}

export interface DynaSpace extends DynaElement, DFSpaceProps {
    controller: "space",
}

export interface DynaTextArea extends DynaElement, DFTextAreaProps {
    controller: "textarea",
}

export interface DynaTextInput extends DynaElement, DFTextInputProps {
    controller: "textinput",
}

export interface DynaUpload extends DynaElement, DFUploadProps {
    controller: "upload",
}

export interface DynaRowData {
    columnSizes: Array<number>;
    elements: Array<DynaButton | DynaDatepicker | DynaSelect | DynaSpace | DynaTextArea | DynaTextInput | DynaUpload>;
}

export interface DynaFormData {
    rows: Array<DynaRowData>;
}
