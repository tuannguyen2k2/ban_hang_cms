/* eslint-disable react/prop-types */
import { Breadcrumb, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './PageWrapper.module.scss';
import locales from '../locales';

const PageWrapper = ({ loading, children, breadcrumbs = [], tabs, onChangeTab, activeTab }) => {
    const hasTab = !!tabs?.length;
    if (breadcrumbs.length > 0) {
        breadcrumbs = [{ breadcrumbName: locales.home, path: '/' }, ...breadcrumbs];
    }

    return (
        <Spin spinning={!!loading} wrapperClassName={styles.pageWrapper}>
            <div className={classNames(styles.pageHeader, hasTab && styles.hasTab)}>
                {!!breadcrumbs?.length && (
                    <Breadcrumb
                        items={breadcrumbs}
                        itemRender={(breadCrumb) => {
                            const last = breadcrumbs.indexOf(breadCrumb) === breadcrumbs.length - 1;
                            if (last) {
                                return (
                                    <span className={styles.breadcrumbLast}>
                                        {breadCrumb.breadcrumbName || breadCrumb.title}
                                    </span>
                                );
                            } else if (breadCrumb.path) {
                                return (
                                    <Link to={breadCrumb.path} style={{ color: '#1890ff' }}>
                                        {breadCrumb.breadcrumbName || breadCrumb.title}
                                    </Link>
                                );
                            } else {
                                return <span>{breadCrumb.breadcrumbName || breadCrumb.title}</span>;
                            }
                        }}
                    />
                )}
                {!!tabs?.length && (
                    <Tabs activeKey={activeTab} onChange={onChangeTab} items={tabs} className={styles.tab} />
                )}
            </div>
            <div className={styles.pageContent}>{children}</div>
        </Spin>
    );
};
export default PageWrapper;
