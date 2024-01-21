/* eslint-disable react/prop-types */
import { Tooltip } from 'antd';
import locales from '../../locales';

const BaseTooltip = ({
    placement = 'bottom',
    type,
    objectName = '',
    title,
    toLowerCase = true,
    children,
    ...props
}) => {
    if (toLowerCase) {
        objectName = objectName.toLowerCase();
    }
    const titleMapping = {
        edit: locales.edit + ' ' + objectName,
        delete: locales.delete + ' ' + objectName,
        view: locales.view + ' ' + objectName,
    };

    title = titleMapping[type] || title;
    return (
        <Tooltip placement={placement} title={title} {...props}>
            {children}
        </Tooltip>
    );
};

export default BaseTooltip;
