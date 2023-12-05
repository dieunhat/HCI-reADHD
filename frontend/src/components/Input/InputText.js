import { useState } from "react";

function InputText({
    labelTitle,
    labelStyle,
    disable,
    type,
    containerStyle,
    defaultValue,
    placeholder,
    updateFormValue,
    updateType,
}) {
    const [value, setValue] = useState(defaultValue);

    const updateInputValue = (val) => {
        setValue(val);
        updateFormValue({ updateType, value: val });
    };

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>
                    {labelTitle}
                </span>
            </label>
            {disable ? (
                <input
                    type={type || "text"}
                    value={value}
                    placeholder={placeholder || ""}
                    className="input  input-bordered w-full "
                    disabled
                />
            ) : (
                <input
                    type={type || "text"}
                    value={value}
                    placeholder={placeholder || ""}
                    onChange={(e) => updateInputValue(e.target.value)}
                    className="input  input-bordered w-full "
                />
            )}
        </div>
    );
}

export default InputText;
