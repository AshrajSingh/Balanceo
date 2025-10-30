import { useState } from 'react';
import '../styleSheets/signOutConfirm.css';

const SignOutConfirm = ({ message, onConfirm }) => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => setVisible(true);
    const handleCancel = () => setVisible(false);
    const handleConfirm = () => {
        setVisible(false);
        onConfirm(); // trigger parent action
    };
    return (
        <>
            <button className='signOut' onClick={handleClick}>
                Sign Out
            </button>

            {visible && (
                <div className="confirm-overlay">
                    <div className="confirm-box">
                        <h3>Confirm Action</h3>
                        <p>{message}</p>
                        <div className="confirm-buttons">
                            <button className="btn-cancel" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className="btn-confirm" onClick={handleConfirm}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignOutConfirm;
