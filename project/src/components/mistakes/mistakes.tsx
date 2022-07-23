type MistakesProps = {
  count: number;
}
// вернет компонент с кол-вом совершенных ошибок
function Mistakes({count}: MistakesProps): JSX.Element {
  // на основе полученного пропса генерирует массив с пустой строкой
  const mistakes = Array.from({length: count}, () => '');

  return (
    <div className="game__mistakes">
      {
        // на основе кол-ва ошибок рендерит блоки
        mistakes.map((item, i) => {
          const keyValue = `mistake-${i}`;
          return <div key={keyValue} className="wrong"></div>;
        })
      }
    </div>
  );
}

export default Mistakes;
