import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/rootReducer";
import "./pagination.scss";

interface paginationProps {
  onPaginationClick: (
    item: number
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  page: number;
}
const Pagination = ({ onPaginationClick, page }: paginationProps) => {
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
            style={
              page == i
                ? {
                    fontWeight: 700,
                    color: "#d2d2d2",
                  }
                : { color: "black" }
            }
          >
            {i + 1}
          </button>
        ))}
      </p>
    </div>
  );
};
export default Pagination;
