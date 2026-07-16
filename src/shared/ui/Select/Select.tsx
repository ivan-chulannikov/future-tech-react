const Select = () => {
    return (
        <div className="select" data-js-select>
            <label
                htmlFor="phoneNumberPrefix"
                id="select-number-prefix-select-label"
                className="select__label visibility-hidden"
            >
                Phone number prefix
            </label>
            <select
                id="phoneNumberPrefix"
                className="select__original-control field__control"
                tabIndex= {-1}
                name="phoneNumberPrefix"
                data-js-select-original-control
            >
                <option value="+7">+7</option>
                <option selected value="+1">
                    +1
                </option>
                <option value="+3">+3</option>
                <option value="+5">+5</option>
            </select>
            <div className="select__body">
                <div
                    className="select__button field__control"
                    aria-labelledby="select-number-prefix-select-label"
                    tabIndex= {0}
                    role="combobox"
                    aria-expanded="false"
                    aria-haspopup="listbox"
                    aria-controls="phone-number-prefix-select-dropdown"
                    data-js-select-button
                >
                    +7
                </div>
                <div
                    className="select__dropdown"
                    aria-labelledby="select-number-prefix-select-label"
                    id="phone-number-prefix-select-dropdown"
                    role="listbox"
                    aria-selected="true"
                    data-js-select-dropdown
                >
                    <div
                        id="select-number-prefix-select-option-1"
                        aria-selected="false"
                        className="select__option is-selected"
                        role="option"
                        data-js-select-option
                    >
                        +7
                    </div>
                    <div
                        id="select-number-prefix-select-option-2"
                        aria-selected="false"
                        className="select__option"
                        role="option"
                        data-js-select-option
                    >
                        +1
                    </div>
                    <div
                        id="select-number-prefix-select-option-3"
                        aria-selected="false"
                        className="select__option"
                        role="option"
                        data-js-select-option
                    >
                        +3
                    </div>
                    <div
                        id="select-number-prefix-select-option-4"
                        aria-selected="false"
                        className="select__option"
                        role="option"
                        data-js-select-option
                    >
                        +5
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Select;
