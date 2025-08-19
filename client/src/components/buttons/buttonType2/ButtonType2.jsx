import './buttonType2.css';

export const ButtonType2 = ({ children, onClick, variant = 'edit' }) => {
  const className = `custom-btn2 custom-btn2-${variant}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
