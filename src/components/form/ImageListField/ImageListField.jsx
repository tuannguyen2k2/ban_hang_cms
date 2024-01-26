/* eslint-disable react/prop-types */
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Upload } from 'antd';
import locales from '../../../locales';
import styles from './ImageListField.module.scss';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ImageListField = ({ name, label, action, listFileName, setListFileName, data }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([data]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        const uploadedFile = newFileList[newFileList.length - 1];
        const newFileNameRes = uploadedFile?.response?.data?.fileName;
        if (uploadedFile?.status === 'done' && !listFileName.includes(newFileNameRes)) {
            setListFileName([...listFileName, newFileNameRes]);
        }
        setFileList(newFileList);
    };

    const handleRemove = (file) => {
        const fileNameRemove = file?.response?.data?.fileName;
        setListFileName(listFileName.filter((element) => element !== fileNameRemove));
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type='button'
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                {locales.upload}
            </div>
        </button>
    );
    return (
        <Form.Item name={name} label={label} className={styles.formImage}>
            <Upload
                action={action}
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {fileList.length >= 6 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt='example'
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </Form.Item>
    );
};
export default ImageListField;
