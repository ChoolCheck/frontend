const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }
  return <div className="days row">{days}</div>;
};

export default RenderDays;
