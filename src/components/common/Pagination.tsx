import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";
import "./pagination.scss";

interface paginationProps {
  onPaginationClick: (
    item: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Pagination = ({ onPaginationClick }: paginationProps) => {
  const totalPages = useSelector(
    (state: RootState) => state.TotalPageReducer.totalpageState
  );

  return (
    <div className="pagination workcheck">
      <p className="pagination button-container">
        {[...Array(totalPages)].map((x, i) => (
          <button
            className="pagination buttons"
            onClick={onPaginationClick(i)}
            key={i}
          >
            {i + 1}
          </button>
        ))}
      </p>
    </div>
  );
};
export default Pagination;
