import "./loading.scss";

interface loadingProps {
  message?: string;
}
const Loading = ({ message }: loadingProps) => {
  return (
    <div className="loading-container">
      {message ? <p>message</p> : <p>...loading</p>}
    </div>
  );
};

export default Loading;
