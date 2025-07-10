export const Button = ({ children, onClick, className }) => (
  <button className={`bg-blue-500 text-white px-4 py-2 rounded-xl ${className}`} onClick={onClick}>
    {children}
  </button>
);