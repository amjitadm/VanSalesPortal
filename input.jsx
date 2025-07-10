export const Input = ({ name, value, onChange, placeholder }) => (
  <input
    className="border p-2 rounded-xl"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);