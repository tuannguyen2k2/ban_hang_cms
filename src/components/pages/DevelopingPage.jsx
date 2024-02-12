import developingImage from '../../assets/images/developing.png';
import locales from '../../locales';
export const DevelopingPage = () => {
    return (
        <div
            style={{
                fontSize: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '80px',
                marginBottom: '200px',
            }}
        >
            <img src={developingImage} alt='developing' />
            <span style={{ display: 'flex', alignItems: 'center', marginTop: '60px' }}>
                <p>{locales.noticeDeveloping}</p>
            </span>
        </div>
    );
};
