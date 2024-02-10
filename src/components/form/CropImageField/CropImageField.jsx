/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import useFormField from '../../../hooks/useFormField';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import useNotification from '../../../hooks/useNotification';
import { Form, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import styles from './CropImageField.module.scss';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
function CropImageField({
    label,
    fileList,
    setFileList,
    disabled,
    name,
    valuePropName,
    accept,
    onChange,
    beforeUpload,
    showUploadList,
    aspect = 1,
    maxFile,
    imageUrl,
    loading,
    style,
    required,
    formItemProps,
    imgUploadedSizeAuto,
    ...props
}) {
    const { rules } = useFormField(props);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const onUploadFile = async ({ file, onSuccess, onError }) => {
        const { uploadFile } = props;
        uploadFile(file, onSuccess, onError);
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleCancel = () => setPreviewOpen(false);

    const getContent = () => {
        if (imageUrl && !loading) {
            return (
                <div style={{ margin: 4 }}>
                    <img
                        style={{ maxWidth: '100%', objectFit: 'contain' }}
                        className='img-uploaded'
                        src={imageUrl}
                        alt='field-upload'
                    />
                </div>
            );
        } else if (showUploadList && fileList && fileList.length === maxFile) {
            return null;
        } else {
            return renderUploadButton();
        }
    };

    const renderUploadButton = () => {
        return (
            <div className='upload-wrapper'>
                {!showUploadList && loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className='ant-upload-text'>{loading ? 'Đang tải lên' : 'Tải lên'}</div>
            </div>
        );
    };

    const uploadClass = useMemo(() => {
        return ['avatar-uploader', imgUploadedSizeAuto && 'img-uploaded-size-auto'].filter(Boolean).join(' ');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemove = (file) => {
        const updatedFileList = fileList.filter((obj) => obj.name !== file.name);
        setFileList(updatedFileList);
    };

    return (
        <Form.Item
            {...formItemProps}
            required={required}
            label={label}
            name={name}
            rules={rules}
            valuePropName={valuePropName}
            className={styles.formImage}
        >
            {showUploadList ? (
                <ImgCrop aspect={aspect}>
                    <Upload
                        fileList={fileList}
                        disabled={disabled}
                        accept={accept}
                        name='field-upload'
                        listType='picture-card'
                        style={{ width: '100%', ...style }}
                        customRequest={onUploadFile}
                        beforeUpload={beforeUpload}
                        onChange={onChange}
                        className={uploadClass}
                        onPreview={handlePreview}
                        onRemove={handleRemove}
                    >
                        {getContent()}
                    </Upload>
                </ImgCrop>
            ) : (
                <ImgCrop aspect={aspect}>
                    <Upload
                        disabled={disabled}
                        accept={accept}
                        valuePropName={valuePropName}
                        listType='picture-card'
                        style={{ width: '100%' }}
                        showUploadList={false}
                        customRequest={onUploadFile}
                        beforeUpload={beforeUpload}
                        onChange={onChange}
                        className={uploadClass}
                    >
                        {getContent()}
                    </Upload>
                </ImgCrop>
            )}
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
}

export default CropImageField;
