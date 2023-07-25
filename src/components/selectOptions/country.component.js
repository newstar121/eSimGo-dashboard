import { useGlobalData } from "contexts/AppContext"
import ReactFlagsSelect from "react-flags-select";

export const CountrySelect = ({select, onSelect}) => {

    const [state] = useGlobalData()

    const countries = Object.keys(state?.countryFlags || {}) || []

    return (
        <ReactFlagsSelect
            selected={select}
            onSelect={onSelect}
            countries={countries}
            // showSelectedLabel={showSelectedLabel}
            // selectedSize={selectedSize}
            showOptionLabel={true}
            // optionsSize={optionsSize}
            // placeholder={placeholder}
            searchable={true}
            searchPlaceholder={"Select Country"}
            // alignOptionsToRight={alignOptionsToRight}
            // fullWidth={fullWidth}
            // disabled={disabled}
        />
    )

}