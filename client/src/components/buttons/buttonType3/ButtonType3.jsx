import './buttonType3.css';

export const ButtonType3 = ({ children, onClick, variant = 'primary' }) => {
  const className = `custom-btn3 custom-btn3-${variant}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}