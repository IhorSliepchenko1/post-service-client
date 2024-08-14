const SelectLanguage = ({ toggleLanguage, language }) => {
  return (
    <select className="language" onInput={toggleLanguage} value={language}>
      <option value="eng">english</option>
      <option value="ukr">українська</option>
      <option value="ru">русский</option>
    </select>
  );
};

export default SelectLanguage;
