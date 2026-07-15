import { OverlayProps } from './types';

const Overlay = ({ isOpen, onClose }: OverlayProps) => {
    return (
        <div onClick={onClose} className={`${isOpen ? 'overlay overlay--open' : 'overlay'}`}></div>
    );
};
export default Overlay;
