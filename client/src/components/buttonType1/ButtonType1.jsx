import './buttonType1.css';

export const ButtonType1 = ({ children, onClick, variant = 'primary' }) => {
  const className = `custom-btn1 custom-btn1-${variant}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
