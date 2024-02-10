import locales from '../locales';

const useFormField = ({ requiredMsg, placeholder, required, rules }) => {
    // const { dataDetail } = useListBase();

    const getRequiredMsg = () => {
        // Use intl instead
        return requiredMsg || locales.requiredField;
    };

    const getPlaceHolder = () => {
        if (placeholder) {
            return placeholder;
        } else if (required) {
            return '';
        }

        return '';
    };

    const getRules = () => {
        const rules = [];

        if (required) {
            rules.push({
                required,
                message: getRequiredMsg(),
            });
        }

        return rules;
    };

    const mergeRules = (rulesA, rulesB) => {
        return [...rulesA, ...rulesB];
    };

    return {
        placeholder: getPlaceHolder(),
        rules: mergeRules(getRules(), rules || []),
    };
};

export default useFormField;
