export const useCreateFile = () => {
  const createFile = (array, nameFile) => {
    let csvContent = `data:text/csv;charset=utf-8,`;

    array.forEach((rowArray) => {
      let row = rowArray.join(`;`);
      csvContent += row + `\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement(`a`);
    link.setAttribute(`href`, encodedUri);
    link.setAttribute(`download`, `${nameFile}.csv`);
    document.body.appendChild(link);
    link.click();

    link.remove();
  };

  return { createFile };
};
