/* eslint-disable react/prop-types */
import { Button, Col, Row } from "antd";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import locales from "../../locales";
import styles from "./ActionBar.module.scss";


function ActionBar({
  createLink,
  location,
  style,
  buttons,
}) {
  const renderButtons = useCallback(() => {
    const CreateButton = () => (
      <Col>
        <Link
          to={createLink}
          state={{ action: "create", prevPath: location.pathname }}
        >
          <Button type="primary" style={style}>
            <PlusOutlined />{" "}
            {locales.addNew}
          </Button>
        </Link>
      </Col>
    );
    if (!buttons) {
      return <CreateButton />;
    }

    return buttons.map((button) => (
      <Col key={button.linkTo}>
        <Link to={button.linkTo} state={{ prevPath: location.pathname }}>
          {button.component}
        </Link>
      </Col>
    ));
  }, [buttons, createLink]);

  return (
    <Row wrap justify="end" gutter={12} className={styles.actionBar}>
      {renderButtons()}
    </Row>
  );
}

export default ActionBar;
